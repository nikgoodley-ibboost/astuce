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
  Portions created by the Initial Developer are Copyright (C) 2006-2010
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
  Marc Alcaraz <ekameleon@gmail.com>.
  
*/

package buRRRn.ASTUce.ui
{
    import core.strings.format; void(format);
    
    import system.terminals.InteractiveConsole;
    import system.terminals.console;
    
    import buRRRn.ASTUce.metadata;
    import buRRRn.ASTUce.framework.AssertionFailedError;
    import buRRRn.ASTUce.framework.Test;
    import buRRRn.ASTUce.framework.TestListener;
    import buRRRn.ASTUce.framework.TestFailure;
    import buRRRn.ASTUce.framework.TestResult;
    import buRRRn.ASTUce.runner.BaseTestRunner;
    
    /**
     * The UI result printer object.
     */
    public class ResultPrinter implements TestListener
    {
        protected var config:Object  = metadata.config;
        protected var strings:Object = metadata.strings;
        
        private var _writer:InteractiveConsole = console; //default writer
        protected var column:int  = 0;
        
        /**
         * Converts the elapsed time as String.
         */
        protected function elapsedTimeAsString( runTime:Number ):String
        {
            var dat:Date = new Date( runTime.valueOf() );
            
            var ms:int = dat.getUTCMilliseconds();
            var s:int  = dat.getUTCSeconds();
            var m:int  = dat.getUTCMinutes();
            var h:int  = dat.getUTCHours();
            
            return format( strings.PrtElapsedTime, h, m, s, ms );            
        }
        
        protected function printDefects( booBoos:Array, count:int, type:String ):void
        {
            var i:int;
            
            if( count == 0 )
            {
                return;
            }
            
            if( count == 1 )
            {
                writer.writeLine( format( strings.PrtOneDefect, count, type ) );
            }
            else
            {
                writer.writeLine( format( strings.PrtMoreDefects, count, type ) );
            }
            
            for( i=0; i<booBoos.length; i++ )
            {
                printDefect( booBoos[i], i );
            }
        }
        
        protected function printDefectHeader( booBoo:TestFailure, count:int ):void
        {
            if( !config.defectHeaderAsError )
            {
                writer.writeLine( format( strings.PrtDefectHeader, count, booBoo.failedTest ) );
            }
            else
            {
                writer.writeLine( format( strings.PrtDefectHeader, count, booBoo.thrownError ) );
            }
        }
        
        protected function printDefectTrace( booBoo:TestFailure ):void
        {
            if( !config.allowErrorTrace )
            {
                return;
            }
            
            if( !config.allowStackTrace )
            {
                if( !config.defectHeaderAsError )
                {
                    writer.writeLine( format( strings.PrtDefectTrace, " ", booBoo.thrownError ) );
                }
            }
            else
            {
                var i:int = 0;
                var lines:Array = BaseTestRunner.getFilteredTrace( booBoo.trace() );
                
                if( config.defectHeaderAsError )
                {
                    i++;
                }
                
                for( ; i<lines.length; i++ )
                {
                    writer.writeLine( format( strings.PrtDefectTrace, " ", lines[i] ) );
                }
            }
        }
        
        protected function printErrors( result:TestResult ):void
        {
            printDefects( result.errors, result.errorCount, strings.nameError );
        }
        
        protected function printFailures( result:TestResult ):void
        {
            printDefects( result.failures, result.failureCount, strings.nameFailure );
        }
        
        protected function printFooter( result:TestResult ):void
        {
            if( result.wasSuccessful() )
            {
                writer.writeLine( format( strings.PrtOK, result.runCount, (result.runCount == 1 ? "": "s") ) );
            }
            else
            {
                writer.writeLine( format( strings.PrtFailure ) );
                writer.writeLine( format( strings.PrtFailureDetails, result.runCount, result.failureCount, result.errorCount ) );
        	}
        }
        
        protected function printHeader( runTime:Number ):void
        {
            printBlank();
            writer.writeLine( format( strings.PrtTime, elapsedTimeAsString( runTime ) ) );
        }
        
        public function ResultPrinter( writer:InteractiveConsole = null )
        {
            if( writer != null )
            {
                _writer = writer;
            }
        }
        
        public function get writer():*
        {
            return _writer;
        }
        
        // implementation of <TestListener>
        
        /* An error occurred.
        */
        public function addError( test:Test, e:Error ):void
        {
            if( !config.showPrinterShortTests )
            {
                return;
            }
            
            writer.write( strings.PrtShortError );
        }
        
        /* A failure occurred.
        */
        public function addFailure( test:Test, afe:AssertionFailedError ):void
        {
            if( !config.showPrinterShortTests )
            {
                return;
            }
            
            writer.write( strings.PrtShortFailure );
        }
        
        /* A valid test occurred.
        */
        public function addValid( test:Test ):void
        {
            if( !config.showPrinterShortTests )
            {
                return;
            }
            
            writer.write( strings.PrtShortTest );
        }
        
        /* A test ended.
        */
        public function endTest( test:Test ):void
        {
            
        }
        
        /* A test started.
        */
        public function startTest( test:Test ):void
        {
            if( !config.showPrinterShortTests )
            {
                return;
            }
            
            if( column++ >= config.maxColumn )
            {
                printBlank();
                column = 1;
            }
        }
        
        public function reset():void
        {
            column = 0;
        }
        
        public function print( result:TestResult, runTime:Number ):void
        {
            
            if( config.showPrintHeader )
            {
                printHeader( runTime );
            }
            
            if( config.showPrintErrors )
            {
                printErrors( result );
            }
            
            if( config.showPrintFailures )
            {
                printFailures( result );
            }
            
            if( config.showPrintFooter )
            {
                printBlank();
                printFooter( result );
            }
            
            reset();
            
        }
        
        public function printBlank():void
        {
            writer.writeLine( "" );
        }
        
        //only public for testing purposes
        public function printDefect( booBoo:TestFailure, count:int ):void
        {
            printDefectHeader( booBoo, count );
            printDefectTrace( booBoo );
        }
        
    }
    
}

