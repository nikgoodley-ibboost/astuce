/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is [ASTUce: ActionScript Test Unit compact edition CLI]. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2006-2009
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
  
*/

package buRRRn.ASTUce
{
    
    import utils.SWF;
    
    import buRRRn.ASTUce.tests.AllTests;
    import buRRRn.ASTUce.metadata;
    import buRRRn.ASTUce.config;
    import buRRRn.ASTUce.framework.TestResult;
    import buRRRn.ASTUce.runner.strings;
    import buRRRn.ASTUce.runner.NullSuiteError;
    import buRRRn.ASTUce.Runner;
    import buRRRn.ASTUce.info;
    
    import system.metadata;
    import system.eden;
    import system.console;
    import system.Strings;
    
    
    import flash.system.Capabilities;
    import flash.utils.ByteArray;
    
    import C.stdlib.*;
    import C.unistd.getcwd;
    
    import avmplus.Domain;
    import avmplus.File;
    import avmplus.System;
    import avmplus.redtamarin;
    
    public class Application
    {
        private var _appDomain:Domain;
        private var _options:Options;
        private var _tests:Array;
        private var _runner:Runner;
        private var _result:TestResult;
        
        public var verbose:Boolean = false;
        
        public static var CONFIG_FILE:String = "config.eden";
        
        public static var CONFIG_TEMPLATE:String = "";
        
        CONFIG_TEMPLATE += "{CRLF}";
        CONFIG_TEMPLATE += "verbose = false;{CRLF}";
        CONFIG_TEMPLATE += "{CRLF}";
        CONFIG_TEMPLATE += "showConstructorList = false;{CRLF}";
        CONFIG_TEMPLATE += "showAllAsSimpleTrace = false;{CRLF}";
        CONFIG_TEMPLATE += "showSimpleTraceDepth = 1;{CRLF}";
        CONFIG_TEMPLATE += "{CRLF}";
        CONFIG_TEMPLATE += "showPrinterShortTests = false;{CRLF}";
        CONFIG_TEMPLATE += "showPrinterDetails    = true;{CRLF}";
        CONFIG_TEMPLATE += "{CRLF}";
        CONFIG_TEMPLATE += "showPrintHeader   = true;{CRLF}";
        CONFIG_TEMPLATE += "showPrintErrors   = true;{CRLF}";
        CONFIG_TEMPLATE += "showPrintFailures = true;{CRLF}";
        CONFIG_TEMPLATE += "showPrintFooter   = true;{CRLF}";
        CONFIG_TEMPLATE += "{CRLF}";
        CONFIG_TEMPLATE += "showEmptyTests       = true;{CRLF}";
        CONFIG_TEMPLATE += "showObjectSource     = true;{CRLF}";
        CONFIG_TEMPLATE += "invertExpectedActual = false;{CRLF}";
        CONFIG_TEMPLATE += "testInheritedTests   = true;{CRLF}";
        CONFIG_TEMPLATE += "maxColumn            = 38;{CRLF}";
        CONFIG_TEMPLATE += "{CRLF}";
        CONFIG_TEMPLATE += "defectHeaderAsError = false;{CRLF}";
        CONFIG_TEMPLATE += "allowErrorTrace     = true;{CRLF}";
        CONFIG_TEMPLATE += "allowStackTrace     = false;{CRLF}";
        CONFIG_TEMPLATE += "filterErrorStack    = true;{CRLF}";
        CONFIG_TEMPLATE += "cleanupErrorStack   = true;{CRLF}";
        CONFIG_TEMPLATE += "{CRLF}";
        CONFIG_TEMPLATE += "//default{CRLF}";
        CONFIG_TEMPLATE += "cleanupPattern     = new RegExp( \"\" );{CRLF}";
        CONFIG_TEMPLATE += "cleanupReplacement = \"\";{CRLF}";
        CONFIG_TEMPLATE += "{CRLF}";
        CONFIG_TEMPLATE += "filteredPatterns = [{CRLF}";
        CONFIG_TEMPLATE += "  \"buRRRn.ASTUce.framework::TestResult\",{CRLF}";
        CONFIG_TEMPLATE += "  \"buRRRn.ASTUce.framework::TestCase\",{CRLF}";
        CONFIG_TEMPLATE += "  \"buRRRn.ASTUce.framework::TestSuite\",{CRLF}";
        CONFIG_TEMPLATE += "  \"buRRRn.ASTUce.ui\",{CRLF}";
        CONFIG_TEMPLATE += "  \"buRRRn.ASTUce::Runner\",{CRLF}";
        CONFIG_TEMPLATE += "  \"buRRRn.ASTUce::Application\",{CRLF}";
        CONFIG_TEMPLATE += "  \"at MethodInfo\",{CRLF}";
        CONFIG_TEMPLATE += "  \"at ()\",{CRLF}";
        CONFIG_TEMPLATE += "  \"at <anonymous>()\",{CRLF}";
        CONFIG_TEMPLATE += "  \"global$init()\",{CRLF}";
        CONFIG_TEMPLATE += "  \"at Function/http://adobe.com/AS3/2006/builtin::call()\",{CRLF}";
        CONFIG_TEMPLATE += "  \"at Function/http://adobe.com/AS3/2006/builtin::apply()\"{CRLF}";
        CONFIG_TEMPLATE += "];{CRLF}";
        CONFIG_TEMPLATE += "{CRLF}";
        
        public function Application()
        {
            _appDomain = Domain.currentDomain;
            _options = new Options( this );
            _tests   = [];
        }
        
        public function showUsages():void
        {
            var usage:String = "";
            
            usage += "{name}: [-?] [-s] [-v] [-i] [-l:<filepath>] <classname> [, <classnameN>]{CRLF}";
            usage += "             -?{sep,4}show this help{CRLF}";
            usage += "             -s{sep,4}run ASTUce self tests{CRLF}";
            usage += "             -v{sep,4}verbose{CRLF}";
            //usage += "             -d{sep,4}dump the config file 'config.eden'{CRLF}";
            usage += "             -i{sep,4}show different infos (license etc.){CRLF}";
            usage += "  -l:<filepath>{sep,4}load a precompiled library{CRLF}";
            usage += "               {sep,4}either an *.abc or a *.swf file{CRLF}";
            usage += "               {sep,4}[repeatable]{CRLF}";
            usage += "    <classname>{sep,4}the unit test(s) class(es) to execute{CRLF}";
//            usage += "{CRLF}";
            
            usage = Strings.format( usage, {
                                            CRLF: "\n",
                                            sep: " ",
                                            name: AppMetadata.name
                                           } );
            
            console.writeLine( usage );
        }
        
        private function _dumpConfiguration():void
        {
            var configpath:String = _getFullFilePath( CONFIG_FILE );
            var data:String;
            
            if( !File.exists( configpath ) )
            {
                var os:String = Capabilities.os;
                var _crlf:String;
                switch( os )
                {
                    case "Macintosh":
                    _crlf = "\n";
                    break;
                    
                    case "Linux":
                    _crlf = "\r";
                    break;
                    
                    case "Windows":
                    default:
                    _crlf = "\r\n";
                }
                
                
                data = Strings.format( CONFIG_TEMPLATE, {CRLF:_crlf} );
                File.write( configpath, data );
                
                if( verbose )
                {
                    console.writeLine( "config dumped to \"" + configpath + "\"" );
                }
                
            }
            else
            {
                console.writeLine( "warning: can not dump config file as it already exists" );
            }
        }
        
        private function _hasConfigFile():Boolean
        {
            var configpath:String = _getFullFilePath( CONFIG_FILE );
            
            if( File.exists( configpath ) )
            {
                return true;
            } 
            
            return false;
        }
        
        private function _loadConfiguration():void
        {
            var configpath:String = _getFullFilePath( CONFIG_FILE );
            var data:String;
            var externalconfig:Object;
            
            if( File.exists( configpath ) )
            {
                data = File.read( configpath );
                externalconfig = eden.deserialize( data );
                buRRRn.ASTUce.config.load( externalconfig );
                
                if( verbose )
                {
                    console.writeLine( "external config loaded" );
                }
            }
            
        }
        
        private function _getCurrentPath():String
        {
            var path:String = "";
            var execpath:String = System.executablePath;
            var os:String = Capabilities.os;
            
            var pos:int;
            switch( os )
            {
                case "Macintosh":
                case "Linux":
                pos = execpath.lastIndexOf( "/" );
                
                if( pos > -1 )
                {
                    path = execpath.substring( 0, pos );
                }
                else
                {
                    path = execpath;
                }
                
                break;
                
                case "Windows":
                pos = execpath.lastIndexOf( "\\" );
                
                if( pos > -1 )
                {
                    path = execpath.substring( 0, pos );
                }
                else
                {
                    path = execpath;
                }
                
                break;
            }
            
            return path;
        }
        
        private function _getFullFilePath( filepath:String ):String
        {
            var current:String = _getCurrentPath();
            var os:String = Capabilities.os;
            
            switch( os )
            {
                case "Macintosh":
                case "Linux":
                filepath = current + "/" + filepath;
                break;
                
                case "Windows":
                filepath = current + "\\" + filepath;
                break;
            }
            
            return filepath;
        }
        
        private function _getABCfromSWF( swf:ByteArray, compressed:Boolean = false ):ByteArray
        {
            ﻿var uswf:ByteArray;
            
            if( compressed )
            {
                uswf = ﻿new ByteArray();
                uswf﻿.endian = "littleEndian";
                swf.position = 8;
                swf.readBytes(uswf,0,swf.length-swf.position);
                ﻿var usize:int = uswf.length;
                ﻿uswf.uncompress();
                
                if( verbose )
                {
                ﻿   console.writeLine( "decompressed swf "+usize+" -> "+uswf.length);
                }
                
                ﻿uswf.position = 0;
            }
            else
            {
                swf.position = 8
                uswf = swf;
                uswf﻿.endian = "littleEndian";
            }
            
            var swffile:SWF = new SWF( uswf );
            
            //trace( "SWF abc: " + swffile.abc );
            
            if( verbose )
            {
                console.writeLine( "SWF " + swffile.size.toString() );
                console.writeLine( swffile.frameRate + "fps, frame(s): " + swffile.frames );
                console.writeLine( "abc name: " + swffile.abcName );
            }
            
            return swffile.abc;
        }
        
        private function _isValidABC( data:ByteArray ):Boolean
        {
            data.position = 0;
            var ﻿magic:int = data.readInt();
            
            if( verbose )
            {
                console.writeLine( "abc magic = " + magic.toString(16) );
            }
            
 ﻿           if( (magic != (46<<16|14)) &&
                (magic != (46<<16|15)) &&
                (magic != (46<<16|16)) )
            {
                console.writeLine( "Error: not an abc file.  magic=" + magic.toString(16) );
                return false;
            }
            
            return true;
        }
        
        private function _loadFileInMemory( filepath:String ):void
        {
            var file:String = _getFullFilePath( filepath );
            
            var data:ByteArray;
            var abcdata:ByteArray;
            
            if( File.exists( file ) )
            {
                data = ByteArray.readFile( file );
                ﻿data.endian = "littleEndian";
                
                ﻿var version:uint = data.readUnsignedInt();
                
                ﻿switch( version )
                {
                    case 46<<16|14:
                    case 46<<16|15:
                    case 46<<16|16:
                    if( verbose )
                    {
                        console.writeLine( "found *.abc" );
                    }
                    
                    abcdata = data;
                    break;
                    
﻿                    case 67|87<<8|83<<16|9<<24: // SWC9
                    case 67|87<<8|83<<16|8<<24: // SWC8
                    case 67|87<<8|83<<16|7<<24: // SWC7
                    case 67|87<<8|83<<16|6<<24: // SWC6
                    if( verbose )
                    {
                        console.writeLine( "found zipped *.swf" );
                    }
                    
                    abcdata = _getABCfromSWF( data, true );
                    break;
                    
             ﻿       case 70|87<<8|83<<16|9<<24: // SWC9
                    case 70|87<<8|83<<16|8<<24: // SWC8
                    case 70|87<<8|83<<16|7<<24: // SWC7
                    case 70|87<<8|83<<16|6<<24: // SWC6
                    case 70|87<<8|83<<16|5<<24: // SWC5
                    case 70|87<<8|83<<16|4<<24: // SWC4
                    if( verbose )
                    {
                        console.writeLine( "found unzipped *.swf" );
                    }
                    
                    abcdata = _getABCfromSWF( data, false );
                    break;
                    
                    default:
                    if( verbose )
                    {
                    ﻿   console.writeLine('unknown format '+version);
                    }
                    
                    console.writeLine( "Error: \"" + file + "\" is not an *.abc or *.swf file" );
                    exit( EXIT_FAILURE );
                }
                
                //verify abc magic number
                if( !_isValidABC( abcdata ) )
                {
                    exit( EXIT_FAILURE );
                }
                
                _appDomain.loadBytes( abcdata );
                
                if( verbose )
                {
                    console.writeLine( "\"" + file + "\" loaded in memory ..." );
                }
            
            }
            else
            {
                console.writeLine( "Error: \"" + file + "\" could not be found" );
                exit( EXIT_FAILURE );
            }
        }
        
        private function _displayHeader( verbose:Boolean = false ):void
        {
            //console.writeLine( buRRRn.ASTUce.info( true ) );
            
            var separator:String = buRRRn.ASTUce.strings.separator;
            var CRLF:String      = "\n";
            var str:String       = "";
            var info:String;
            
            if( verbose ) {
            str += "{sep}{crlf}";
            str += "{name}: {fullname} v{versionL}{crlf}";
            str += "{copyright}{crlf}";
            str += "{origin}{crlf}";
            str += "{sep}";
            } else {
            str += "{name} v{versionS}{crlf}";
            str += "{sep}";
             }
            
            info = Strings.format( str,
                                   {
                                   sep: separator,
                                   crlf: CRLF,
                                   name: AppMetadata.name,
                                   fullname: AppMetadata.fullname,
                                   versionS: AppMetadata.version.toString(2),
                                   versionL: AppMetadata.version,
                                   copyright: AppMetadata.copyright,
                                   origin: AppMetadata.origin
                                   }
                                 );
            
            console.writeLine( info );
        }
        
        private function _displayInfos():void
        {
            _displayHeader( true );
            console.writeLine( "" );
            console.writeLine( "License:" );
            console.writeLine( AppMetadata.license );
            console.writeLine( "" );
            console.writeLine( "project URL:" );
            console.writeLine( "  http://astuce.googlecode.com" );
            console.writeLine( "" );
            console.writeLine( "infos:" );
            console.writeLine( "        OS: " + Capabilities.os );
            console.writeLine( "  language: " + Capabilities.languages[0] );
//            console.writeLine( "    memory: " );
//            console.writeLine( "          total: " + System.totalMemory );
//            console.writeLine( "           free: " + System.freeMemory );
//            console.writeLine( "        private: " + System.privateMemory );
            console.writeLine( "" );
            console.writeLine( "Dependencies:" );
            console.writeLine( "  maashaack  " + system.metadata.version.toString() );
            console.writeLine( "  ASTUce AS3 " + buRRRn.ASTUce.metadata.version.toString() );
            console.writeLine( "  redtamarin " + redtamarin.version );
            console.writeLine( "  Tamarin    " + System.getAvmplusVersion() );
        }
        
        private function _runTests():Boolean
        {
            var allTestsWereSuccessful:Boolean = true;
            
            _runner = new Runner();
            var suiteName:String;
            
            if( _tests.length == 0 )
            {
                console.writeLine( "Error: no unit tests to run" );
                return false;
            }
            
            for( var i:int=0; i<_tests.length; i++ )
            {
                suiteName = _runner.getTestName( _tests[i] );
                console.writeLine( buRRRn.ASTUce.runner.strings.runTitle, suiteName, i );
                
                try
                    {
                    _result = Runner.run( _tests[i], _runner );
                    }
                catch( e1:NullSuiteError )
                    {
                    console.writeLine( buRRRn.ASTUce.runner.strings.nullTestsuite );
                    }
                catch( e2:Error )
                    {
                    console.writeLine( Strings.format( buRRRn.ASTUce.runner.strings.canNotCreateAndRun, i ) );
                    console.writeLine( Strings.format( buRRRn.ASTUce.runner.strings.tab, e2.toString() ) );
                    }
                
                console.writeLine( buRRRn.ASTUce.strings.separator );
                
                if( !_result || !_result.wasSuccessful() )
                {
                    allTestsWereSuccessful = false;
                }
                
            }
            
            return allTestsWereSuccessful;
        }
        
        public function run( args:Array ):void
        {
            //trace( "args: " + eden.serialize( args ) );
            
            if( args.length == 0 )
            {
                showUsages();
                exit( EXIT_FAILURE );
            }
            
            var success:Boolean = _options.parse( args );
            
            
            if( !success || _options.showUsage )
            {
                showUsages();
                exit( EXIT_FAILURE );
            }
            
            if( _options.showInfo )
            {
                _displayInfos();
                console.writeLine( buRRRn.ASTUce.strings.separator );
                exit( EXIT_FAILURE );
            }
            
            verbose = _options.verbose;
            
            _displayHeader( verbose );
            
            if( verbose )
            {
                console.writeLine( "options passed" );
                console.writeLine( "selftest: " + _options.selftest );
                console.writeLine( "verbose: " + _options.verbose );
                console.writeLine( "showUsage: " + _options.showUsage );
                console.writeLine( "load: " + _options.load );
                //console.writeLine( "dumpConfig: " + _options.dumpConfig );
                console.writeLine( "showInfo: " + _options.showInfo );
                console.writeLine( "files: [ " + _options.files +" ]" );
                console.writeLine( "classnames: [ " + _options.classnames + " ]" );
                console.writeLine( buRRRn.ASTUce.strings.separator );
            }
            
            //if( !_hasConfigFile() || _options.dumpConfig )
            if( !_hasConfigFile() )
            {
                _dumpConfiguration();
            }
            
            //ALWAYS load the config from file
            _loadConfiguration();
            
            if( _options.selftest )
            {
                _tests.push( buRRRn.ASTUce.tests.AllTests.suite() );
            }
            
            var i:int;
            
            if( _options.load )
            {
                for( i = 0; i<_options.files.length; i++ )
                {
                    _loadFileInMemory( _options.files[i] );
                }
            }
            
            if( _options.classnames.length != 0 )
            {
                for( i = 0; i<_options.classnames.length; i++ )
                {
                    _tests.push( _options.classnames[i] );
                }
            }
            
            var testpassed:Boolean = _runTests();
            
            if( testpassed )
            {
                exit( EXIT_SUCCESS );
            }
            else
            {
                exit( EXIT_FAILURE );
            }
            
        }
        
    }
}

