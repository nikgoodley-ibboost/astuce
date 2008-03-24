
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
  Portions created by the Initial Developer are Copyright (C) 2006-2007
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

package buRRRn.ASTUce.tests.framework
    {
    import buRRRn.ASTUce.framework.*;
    
    import buRRRn.ASTUce.tests.WasRun;
    
    public class TestCaseTest extends TestCase
        {
        
        public function TestCaseTest( name:String="" )
            {
            super( name );
            }
        
        protected function verifyError( test:ITest ):void
            {
    		var result:TestResult = new TestResult();
    		test.run( result );
    		assertTrue( result.runCount     == 1 );
    		assertTrue( result.failureCount == 0 );
    		assertTrue( result.errorCount   == 1 );
            }
        
        protected function verifyFailure( test:TestCase ):void
            {
    		var result:TestResult = new TestResult();
    		test.run( result );
    		assertTrue( result.runCount     == 1 );
    		assertTrue( result.failureCount == 1 );
    		assertTrue( result.errorCount   == 0 );
            }
        
        protected function verifySuccess( test:TestCase ):void
            {
    		var result:TestResult = new TestResult();
    		test.run( result );
    		assertTrue( result.runCount     == 1 );
    		assertTrue( result.failureCount == 0 );
    		assertTrue( result.errorCount   == 0 );
            }
        
        public function testCaseToString():void
            {
            assertEquals( "testCaseToString( TestCaseTest )", toString() );
            }
        
        public function testError():void
            {
            var error:TestCase = new ErrorTestCase( "error" );
            verifyError( error );
            }
        
        public function testRunAndTearDownFails():void
            {
            var fails:TornDown = new RunAndTearDownFails();
            verifyError( fails );
            assertTrue( fails.tornDown );
            }
        
        public function testSetupFails():void
            {
            var fails:TestCase = new SetupFailsTestCase( "setup_fails" );
            verifyError( fails );
            }
        
        public function testSuccess():void
            {
            var success:TestCase = new SuccessTestCase( "success" );
            verifySuccess( success );
            }
        
        public function testFailure():void
            {
            var failure:TestCase = new FailureTestCase( "failure" );
            verifyFailure( failure );
            }
        
        public function testTearDownAfterError():void
            {
            var fails:TornDown = new TornDown();
            verifyError( fails );
            assertTrue( fails.tornDown );
            }
        
        public function testTearDownFails():void
            {
            var fails:TestCase = new TearDownFailsTestCase( "success" );
            verifyError( fails );
            }
        
        public function testTearDownSetupFails():void
            {
            var fails:TornDown = new TearDownSetupFails();
            verifyError( fails );
            assertTrue( !fails.tornDown );
            }
        
        public function testWasRun():void
            {
            var test:WasRun = new WasRun();
            test.run( null );
            assertTrue( test.wasRun );
            }
        
        public function testExceptionRunningAndTearDown():void
            {
            var t:ITest = new ExceptionRunningAndTearDown();
            var result:TestResult = new TestResult();
            t.run( result );
            var failure:TestFailure = result.errors[0];
            assertEquals( "teardown", failure.thrownError.message );
            }
        
        /* See <NoArgTestCaseTest> for explanation.
        */
        /*
        public function testNoArgTestCaseFails():void
            {
            var t:TestSuite = new TestSuite( NoArgTestCaseTest );
            var result:TestResult = new TestResult();
            t.run( result );
            assertTrue( result.runCount == 1 );
            assertTrue( result.failureCount == 1 ); //1 warning
            }
        */
        public function testNamelessTestCase():void
            {
            var t:TestCase = new TestCase();
            var result:TestResult = new TestResult();
            t.run( result );
            assertTrue( result.runCount == 1 );
            }
        
        }
    
    }

import buRRRn.ASTUce.framework.TestCase;

internal class TornDown extends TestCase
    {
    private var _tornDown:Boolean = false;
    
    public function TornDown( name:String = "" )
        {
        super( name );
        }
    
    public function get tornDown():Boolean
        {
        return _tornDown;
        }
    
    public function tearDown():void
        {
        _tornDown = true;
        }
    
    override protected function runTest():void
        {
        throw new Error();
        }
    }

internal class ErrorTestCase extends TestCase
    {
    public function ErrorTestCase( name:String = "" )
        {
        super( name );
        }
    
    override protected function runTest():void
        {
        throw new Error();
        }
    }

internal class RunAndTearDownFails extends TornDown
    {
    public function RunAndTearDownFails( name:String = "" )
        {
        super( name );
        }
    
    override public function tearDown():void
        {
        super.tearDown();
        throw new Error();
        }
    }

internal class SetupFailsTestCase extends TestCase
    {
    public function SetupFailsTestCase( name:String = "" )
        {
        super( name );
        }
    
    public function setUp():void
        {
        throw new Error();
        }
    
    override protected function runTest():void
        {
        }
    }

internal class SuccessTestCase extends TestCase
    {
    public function SuccessTestCase( name:String = "" )
        {
        super( name );
        }
    
    override protected function runTest():void
        {
        }
    }

internal class FailureTestCase extends TestCase
    {
    public function FailureTestCase( name:String = "" )
        {
        super( name );
        }
    
    override protected function runTest():void
        {
        fail();
        }
    }

internal class TearDownFailsTestCase extends TestCase
    {
    public function TearDownFailsTestCase( name:String = "" )
        {
        super( name );
        }
    
    override protected function runTest():void
        {
        }
    
    public function tearDown():void
        {
        throw new Error();
        }
    }

internal class TearDownSetupFails extends TornDown
    {
    public function TearDownSetupFails( name:String = "" )
        {
        super( name );
        }
    
    public function setUp():void
        {
        throw new Error();
        }
    }

internal class ExceptionRunningAndTearDown extends TornDown
    {
    public function ExceptionRunningAndTearDown( name:String = "" )
        {
        super( name );
        }
    
    override public function tearDown():void
        {
        throw new Error( "teardown" );
        }
    }



