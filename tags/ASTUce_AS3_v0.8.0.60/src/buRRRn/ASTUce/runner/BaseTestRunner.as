
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
*/

package buRRRn.ASTUce.runner
    {
    import system.Reflection;
    
    import buRRRn.ASTUce.config;
    import buRRRn.ASTUce.framework.ITest;
    import buRRRn.ASTUce.framework.ITestListener;
    import buRRRn.ASTUce.framework.AssertionFailedError;
    import buRRRn.ASTUce.framework.TestSuite;
    
    /* Class: BaseTestRunner
       Base class for all test runners.
       
       note:
       this class is a mess in JUnit, so let keep it simple for now
       and think about how to refactor that in a cleaner way...
    */
    public class BaseTestRunner implements ITestListener, ITestRunListener
        {
        
        private var _suiteMethodName:String = "suite"; //default
        
        public function BaseTestRunner()
            {
            
            }
        
        static public function getFilteredTrace( stack:String ):Array
            {
            var lines:Array = stack.split( "\n" );
            
            var preserveErrorMessage:String = lines.shift();
            
            if( !config.filterErrorStack )
                {
                return lines;
                }
            
            var filteredStack:Array  = [];
            filteredStack = lines.filter( filterLine );
            
            if( config.cleanupErrorStack )
                {
                filteredStack.forEach( cleanupLine );
                }
            
            filteredStack.unshift( preserveErrorMessage );
            
            return filteredStack;
            }
        
        static public function filterLine( line:*, index:int = 0, arr:Array = null ):Boolean
            {
            var patterns:Array = config.filteredPatterns;
            
            if( patterns.length == 0 )
                {
                return true;
                }
            
            var i:int;
            for( i=0; i<patterns.length; i++ )
                {
                if( line.indexOf( patterns[i] ) > -1 )
                    {
                    return false;
                    }
                }
            
            return true;
            }
        
        static public function cleanupLine( line:*, index:int = 0, arr:Array = null ):void
            {
            arr[index] = line.replace( config.cleanupPattern  , config.cleanupReplacement );
            }
        
        // implementation of <ITestListener>
        
        /* An error occurred.
        */
        public function addError( test:ITest, e:Error ):void
            {
            testFailed( TestRunStatus.error, test.toString(), e.toString() );
            }
        
        /* A failure occurred.
        */
        public function addFailure( test:ITest, afe:AssertionFailedError ):void
            {
            testFailed( TestRunStatus.failure, test.toString(), afe.toString() );
            }
        
        /* A valid test occurred.
        */
        public function addValid( test:ITest ):void
            {
            
            }
        
        /* A test ended.
        */
        public function endTest( test:ITest ):void
            {
            testEnded( test.toString() );
            }
        
        /* A test started.
        */
        public function startTest( test:ITest ):void
            {
            testStarted( test.toString() );
            }
        
        
        // implementation of <ITestRunListener>
        
        public function testRunStarted( testSuiteName:String, testCount:int ):void
            {
            
            }
        
        public function testRunEnded( elapsedTime:Number ):void
            {
            
            }
        
        public function testRunStopped( elapsedTime:Number ):void
            {
            
            }
        
        public function testStarted( testName:String ):void
            {
            
            }
        
        public function testEnded( testName:String ):void
            {
            
            }
        
        public function testFailed( status:TestRunStatus, testName:String, trace:String ):void
            {
            
            }
        
        /* Override to define how to handle a failed loading of
           a test suite.
        */
        protected function runFailed( message:String ):void
            {
            
            }
        
        /* Clears the status message.
        */
        protected function clearStatus():void
            {
            
            }
        
        /* Returns the Test corresponding to the given suite.
           This is a template method,
           subclasses override runFailed(), clearStatus().
        */
        public function getTest( suiteClassName:String ):ITest
            {
            if( (suiteClassName == "") || (suiteClassName == null) )
                {
                clearStatus();
                return null;
                }
            
            try
                {
                if( !Reflection.hasClassByName( suiteClassName ) )
                    {
                    runFailed( "Class not found \"" + suiteClassName + "\"" );
                    return null;
                    }
                
                var clazz:Class = Reflection.getClassByName( suiteClassName );
                }
            catch( e:Error )
                {
                runFailed( "Could not load \"" + suiteClassName + "\"" );                
                runFailed( "    " + e.toString() );
                return null;
                }
            
            var suiteMethod:Function = Reflection.getMethodByName( clazz, _suiteMethodName );
            
            if( suiteMethod == null )
                {
                // try to extract a test suite automatically
                clearStatus();
                return new TestSuite( clazz );
                }
            
            var test:ITest;
            
            try
                {
                test = suiteMethod();
                }
            catch( e:Error )
                {
                runFailed( "Failed to invoke suite():" + e );
                return null;
                }
            
            clearStatus();
            return test;
            }
        
        }
    
    }

