/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is [ASTUce: ActionScript Test Unit compact edition AS3]. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2006-2011
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
  Marc Alcaraz <ekameleon@gmail.com>.
  
*/

package library.ASTUce
{
    import core.strings.format; void(format);
    import core.version;
    
    import system.terminals.console;
    
    /**
     * Stores static metadata about the project.
     */
    public class metadata
    {
        /** Name of the project. */ 
        public static var name:String = "ASTUce";
        
        /** Full name of the project. */
        public static var fullname:String = "ActionScript Test Unit compact edition AS3";
        
        /** Version of the project. */ 
        public static var version:core.version = new core.version();
        
        include "version.properties";
         
        version.revision = parseInt( "$Rev$".split( " " )[1] );
        
        /** Copyright of the project. */
        public static var copyright:String = "Copyright © 2006-2011 Zwetan Kjukov, All right reserved.";
        
        /** Origin of the project. */
        public static var origin:String = "Made in the EU.";
        
        /**
        * Prints the informations of the package.
        * 
        * @param verbose (optional) display more informations, default is <code>false</code>
        * @param showConfig (optional) display the pretty printing of the config object, default is <code>false</code>
        */
        public static function about( verbose:Boolean = false, showConfig:Boolean = false ):void
        {
            console.writeLine( info( verbose, showConfig ) );
        }
        
        /**
        * Returns the informations of the package.
        * 
        * @param verbose (optional) add more informations, default is <code>false</code>
        * @param showConfig (optional) add the pretty printing of the config object, default is <code>false</code>
        */
        public static function info( verbose:Boolean = false, showConfig:Boolean = false ):String
        {
            var CRLF:String = "\n";
            
            var str:String = "";
                if( !verbose && config.verbose )
                {
                    verbose = true;
                }
                
                if( verbose ) {
                str += "{sep}{crlf}";
                str += "{name}: {fullname} v{version}{crlf}";
                str += "{copyright}{crlf}";
                str += "{origin}{crlf}";
                str += "{sep}";
                } else {
                str += "{name} v{version}{crlf}";
                str += "{sep}";
                }
                
                if( showConfig ) {
                str += "{crlf}config:";
                str += "{config}{crlf}";
                str += "{sep}";
                }
                
            return format( str,
                           {
                           sep: strings.separator,
                           crlf: CRLF,
                           name: metadata.name,
                           fullname: metadata.fullname,
                           version: metadata.version,
                           copyright: metadata.copyright,
                           origin: metadata.origin,
                           config: config.toSource()
                           }
                        );
            
        }
        
        /**
         * Stores the configuration options of the package.
         */
        public static var config:ASTUceConfigurator = new ASTUceConfigurator( {
                           verbose: false,
                           showConstructorList: false,
                           showAllAsSimpleTrace: false,
                           showSimpleTraceDepth: 1,
                           showPrinterShortTests: true,
                           showPrinterDetails: true,
                           showPrintHeader: true,
                           showPrintErrors: true,
                           showPrintFailures: true,
                           showPrintFooter: true,
                           showEmptyTests: true,
                           showObjectSource: true,
                           invertExpectedActual: false,
                           testInheritedTests: true,
                           maxColumn: 38,
                           defectHeaderAsError: false,
                           allowErrorTrace: true,
                           allowStackTrace: true,
                           filterErrorStack: true,
                           cleanupErrorStack: true,
                           cleanupPattern: /\[.*\]/,
                           cleanupReplacement: "",
                           filteredPatterns: [
                           "library.ASTUce.framework::TestResult",
                           "library.ASTUce.framework::TestCase",
                           "library.ASTUce.framework::TestSuite",
                           "library.ASTUce.ui",
                           "at MethodInfo",
                           "at ()",
                           "at Function/http://adobe.com/AS3/2006/builtin::call()",
                           "at Function/http://adobe.com/AS3/2006/builtin::apply()"
                                             ]
                                                                             } );
        
        /**
         * Stores the string resources of the package. 
         */
        public static var strings:ASTUceStrings = new ASTUceStrings();
        
    }
}