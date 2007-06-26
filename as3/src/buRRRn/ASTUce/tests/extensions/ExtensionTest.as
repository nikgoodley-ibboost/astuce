
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


package buRRRn.ASTUce.tests.extensions
    {
    import buRRRn.ASTUce.framework.*;
    
    import buRRRn.ASTUce.extensions.TestSetup;
    
    import buRRRn.ASTUce.tests.WasRun;
    
    public class ExtensionTest extends TestCase
        {
        
        public function ExtensionTest( name:String = "" )
            {
            super( name );
            }
        
        public function testRunningErrorInTestSetup():void
            {
            var test:TestCase = new FailureTestCase( "failure" );
            
            var wrapper:TestSetup = new TestSetup( test );
            var result:TestResult = new TestResult();
            wrapper.run( result );
            assertTrue( !result.wasSuccessful() );
            }
        
        public function testRunningErrorsInTestSetup():void
            {
            var failure:TestCase = new FailureTestCase( "failure" );
            var error:TestCase   = new ErrorTestCase( "error" );
            
            var suite:TestSuite = new TestSuite();
            suite.addTest( failure );
            suite.addTest( error );
            
            var wrapper:TestSetup = new TestSetup( suite );
            var result:TestResult = new TestResult();
            wrapper.run( result );
            
    		assertEquals( 1, result.failureCount );
    		assertEquals( 1, result.errorCount );
            }
        
        public function testSetupErrorDontTearDown():void
            {
            var test:WasRun = new WasRun();
            var wrapper:FailedTornDown = new FailedTornDown( test );
            var result:TestResult = new TestResult();
            wrapper.run( result );
            assertTrue( !wrapper.tornDown );
            }
        
        public function testSetupErrorInTestSetup():void
            {
            var test:WasRun = new WasRun();
            var wrapper:FailedSetUp = new FailedSetUp( test );
            var result:TestResult = new TestResult();
            wrapper.run( result );
		    assertTrue( !test.wasRun);
		    assertTrue( !result.wasSuccessful() );
            }
        
        }
    
    }

import buRRRn.ASTUce.extensions.TestSetup;
import buRRRn.ASTUce.framework.ITest;
import buRRRn.ASTUce.framework.TestCase;

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

internal class FailedTornDown extends TestSetup
    {
    private var _tornDown:Boolean = false;
    
    public function FailedTornDown( test:ITest )
        {
        super( test );
        }
    
    public function get tornDown():Boolean
        {
        return _tornDown;
        }
    
    public function setUp():void
        {
        fail();
        }
    
    public function tearDown():void
        {
        _tornDown = true;
        }
    }

internal class FailedSetUp extends TestSetup
    {
    public function FailedSetUp( test:ITest )
        {
        super( test );
        }
    
    public function setUp():void
        {
        fail();
        }
    }



