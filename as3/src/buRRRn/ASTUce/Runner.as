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
  Portions created by the Initial Developer are Copyright (C) 2006-2008
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
  
  	- Alcaraz Marc (aka eKameleon) <vegas@ekameleon.net> (2007-2008)

*/

package buRRRn.ASTUce
    {
    import system.Reflection;
    import system.Console;
    import system.Strings;
    
    import buRRRn.ASTUce.strings;
    import buRRRn.ASTUce.config;
    
    import buRRRn.ASTUce.framework.*;
    
    import buRRRn.ASTUce.runner.BaseTestRunner;
    import buRRRn.ASTUce.runner.strings;
    import buRRRn.ASTUce.runner.NullSuiteError;
    import buRRRn.ASTUce.ui.ResultPrinter;
    
    
	/**
     * This is the default TestRunner for ASTUce
     */
    public class Runner extends BaseTestRunner
        {
        	
        /**
         * @private
         */
        private var _printer:ResultPrinter;
        
        /**
         * Display the header.
         */
        protected static function displayHeader():void
            {
            //Console.writeLine( buRRRn.ASTUce.info() );
            //Console.writeLine( strings.separator );
            buRRRn.ASTUce.info();
            }
        
        /**
         * Display the test infos.
         */
        protected static function displayInfos( suite:ITest, result:TestResult ):void
            {
            if( config.showConstructorList )
                {
                Console.writeLine( suite );
                }
            }
        
        /**
         * Invoked when the runner failed.
         */

        protected override function runFailed( message:String ):void
            {
            Console.writeLine( message );
            }
        
        /**
         * Creates a new Runner instance.
         * Using the given class writer if provided.
         * <p><b>Note :</b></p>
         * The default class writer for ResultPrinter is system.Console.
         * For building a custom class writer, you have to define a class with a static method having this signature.
         * <pre class="prettyprint">
         *  public static function writeLine( ...messages ):void
         * </pre>
         */
        public function Runner( writer:Class = null )
            {
            _printer = new ResultPrinter( writer );
            }
        
        /**
         * Indicates the printer of this runner.
         */
        public function get printer():*
            {
            return _printer;
            }
        
        /**
         * @private
         */
        public function set printer( printer:* ):void
            {
            _printer = printer;
            }
        
        /**
         * Returns the name of the test.
         * @return the name of the test.
         */
        public function getTestName( any:* ):String
            {
            if( any == null )
                {
                return "null";
                }
            
            if( any is String )
                {
                return any;
                }
            
            if( any is ITest )
                {
                return any.name;
                }
            
            if( any is Class )
                {
                return Reflection.getClassName( any, true );
                }
            
            return "";
            }
        
        /**
         * Runs a multiple test and collects their results.
         */
        public static function main( ...args ):void
            {
            var result:TestResult;
            var runner:Runner = new Runner();
            var suiteName:String;
            
            displayHeader();
            
            for( var i:int=0; i<args.length; i++ )
                {
                suiteName = runner.getTestName( args[i] );
                Console.writeLine( Strings.format( buRRRn.ASTUce.runner.strings.runTitle, suiteName, i ) );
                
                try
                    {
                    result = run( args[i], runner );
                    }
                catch( e:NullSuiteError )
                    {
                    runner.runFailed( buRRRn.ASTUce.runner.strings.nullTestsuite );
                    }
                catch( e:Error )
                    {
                    runner.runFailed( Strings.format( buRRRn.ASTUce.runner.strings.canNotCreateAndRun, i ) );
                    runner.runFailed( Strings.format( buRRRn.ASTUce.runner.strings.tab, e.toString() ) );
                    }
                
                Console.writeLine( buRRRn.ASTUce.strings.separator );
                }
            }
        
        /**
         * Runs a single test and collects its results.
         * <p>This method can be used to start a test run from your program.</p>
         * <p>Parameters :</p>
         * <p><b>Note :</b></p>
         * <p>In the case of a string parameter, the runner will first try to
         * locate a static suite() method, and if it can not find it 
         * then will try to extract a test suite automatically.
         * @param test Can be a ITest (TestCase,TestSuite,etc.), a Class or a String
         */
        public static function run( test:*, runner:Runner = null ):TestResult
            {
            if( runner == null )
                {
                runner = new Runner();
                displayHeader();
                }
            
            var suite:ITest;
            
            
            if( test == null )
                {
                throw new NullSuiteError();
                }
            
            if( test is String )
                {
                suite = runner.getTest( test );
                }
            
            if( test is ITest )
                {
                suite = test;
                }
            
            if( test is Class )
                {
                var staticSuite:* = Reflection.getMethodByName( test, "suite" );
                
                if( staticSuite != null )
                    {
                    suite = staticSuite();
                    }
                else
                    {
                    suite = new TestSuite( test );
                    }
                }
            
            return runner.doRun( suite );
            }
        
        /**
         * Do the run process.
         */
        public function doRun( suite:ITest ):TestResult
            {
            var result:TestResult = new TestResult();
            result.addListener( printer );
            
            /* note:
               we use the Date class to not be dependent
               on flash getTimer()
            */
            var startTime:Number = new Date().valueOf();
            suite.run( result );
            var endTime:Number   = new Date().valueOf();
            
            var runTime:Number   = endTime - startTime;
            printer.print( result, runTime );
            
            displayInfos( suite, result );
            
            return result;
            }
        
        }
    
    }

