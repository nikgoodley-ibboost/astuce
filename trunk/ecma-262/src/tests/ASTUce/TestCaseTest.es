
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is ASTUce: ActionScript Test Unit compact edition. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2007
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

/* Constructor: TestCaseTest
   A test case testing the testing framework.
*/
tests.ASTUce.TestCaseTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

tests.ASTUce.TestCaseTest.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.TestCaseTest.prototype.constructor = tests.ASTUce.TestCaseTest;

        /* InnerConstructor: TestCaseTest.TornDown
        */
        tests.ASTUce.TestCaseTest.TornDown = function( name )
            {
            buRRRn.ASTUce.TestCase.call( this, name );
            this._tornDown = false;
            }
        
        tests.ASTUce.TestCaseTest.TornDown.prototype = new buRRRn.ASTUce.TestCase();
        tests.ASTUce.TestCaseTest.TornDown.prototype.constructor = tests.ASTUce.TestCaseTest.TornDown;
        
        tests.ASTUce.TestCaseTest.TornDown.prototype.setUp = function()
            {
            
            }
        
        tests.ASTUce.TestCaseTest.TornDown.prototype.tearDown = function()
            {
            this._tornDown = true;
            }
        
        tests.ASTUce.TestCaseTest.TornDown.prototype.runTest = function()
            {
            throw new Error();
            }

tests.ASTUce.TestCaseTest.prototype.testSuccess = function()
    {
    var success = new buRRRn.ASTUce.TestCase( "success" );
    
    success.runTest = function()
        {
        }
    
    this.verifySuccess( success );
    }

tests.ASTUce.TestCaseTest.prototype.testFailure = function()
    {
    var failure = new buRRRn.ASTUce.TestCase( "failure" );
    
    failure.runTest = function()
        {
        this.fail();
        }
    
    this.verifyFailure( failure );
    }

tests.ASTUce.TestCaseTest.prototype.testError = function()
    {
    var err = new buRRRn.ASTUce.TestCase( "error" );
    err.runTest = function()
        {
        throw new Error();
        }
    
    this.verifyError( err );
    }

tests.ASTUce.TestCaseTest.prototype.testSetupFails = function()
    {
    var fails = new buRRRn.ASTUce.TestCase( "success" );
    
    fails.setUp = function()
        {
        throw new Error();
        }
    
    fails.runTest = function()
        {
        }
    
    this.verifyError( fails );
    }

tests.ASTUce.TestCaseTest.prototype.testTearDownFails = function()
    {
    var fails = new buRRRn.ASTUce.TestCase( "success" );
    
    fails.tearDown = function()
        {
        throw new Error();
        }
    
    fails.runTest = function()
        {
        }
    
    this.verifyError( fails );
    }

tests.ASTUce.TestCaseTest.prototype.testCaseToString = function()
    {
    this.assertEquals( "TestCaseTest( testCaseToString )", this.toString(), "TC_001" );
    }

tests.ASTUce.TestCaseTest.prototype.testRunAndTearDownFails = function()
    {
    var fails = new tests.ASTUce.TestCaseTest.TornDown( "runAndTearDown" );
    fails.tearDown = function()
        {
        /* ATTENTION:
           super.tearDown() and/or
           super.tearDown.apply( this )
           does not work to call the super method "tearDown"
           because we define an instance method not a constructor method.
        */
        /* note:
           equivalent
           (code)
           this.constructor.prototype.tearDown.apply( this );
           //or
           this.__proto__.tearDown.apply( this );
           (end)
        */
        //safer call
        tests.ASTUce.TestCaseTest.TornDown.prototype.tearDown.apply( this );
        
        throw new Error();
        }
    
    fails.runTest = function()
        {
        throw new Error();
        }
    
    this.verifyError( fails );
    this.assertTrue( fails._tornDown, "TC_002" );
    }

tests.ASTUce.TestCaseTest.prototype.testTearDownAfterError = function()
    {
    var fails = new tests.ASTUce.TestCaseTest.TornDown();
    this.verifyError( fails );
    this.assertTrue( fails._tornDown, "TC_003" );
    }

tests.ASTUce.TestCaseTest.prototype.testTearDownSetupFails = function()
    {
    var fails = new tests.ASTUce.TestCaseTest.TornDown();
    
    fails.setUp = function()
        {
        throw new Error();
        }
    
    fails.tearDown = function()
        {
        
        }
    
    this.verifyError( fails );
    this.assertTrue( !fails._tornDown, "TC_004" );
    }

tests.ASTUce.TestCaseTest.prototype.testWasRun = function()
    {
    var test = new tests.ASTUce.WasRun();
    test.run();
    this.assertTrue( test._wasRun, "TC_005" );
    }

tests.ASTUce.TestCaseTest.prototype.testExceptionRunningAndTearDown = function()
    {
    var t = new tests.ASTUce.TestCaseTest.TornDown();
    
    t.tearDown = function()
        {
        throw new Error( "tearDown" );
        }
    
    var result = new buRRRn.ASTUce.TestResult();
    t.run( result );
    var failure = result.errors()[0];
    this.assertEquals( "tearDown", failure.thrownException().getMessage(), "TC_006" );
    }

tests.ASTUce.TestCaseTest.prototype.testNoArgTestCasePasses = function()
    {
    var t = new buRRRn.ASTUce.TestSuite( tests.ASTUce.NoArgTestCaseTest );
    var result = new buRRRn.ASTUce.TestResult();
    t.run( result );
    this.assertTrue( result.runCount()     == 1, "TC_007a" );
    this.assertTrue( result.failureCount() == 0, "TC_007b" );
    this.assertTrue( result.errorCount()   == 0, "TC_007c" );
    }

tests.ASTUce.TestCaseTest.prototype.testNamelessTestCase = function()
    {
    var t = new buRRRn.ASTUce.TestCase();
    
    try
        {
        t.run();
        this.fail();
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "TC_008" );    
    }

tests.ASTUce.TestCaseTest.prototype.verifyError = function( /*TestCase*/ test )
    {
    var result = test.run();
    this.assertTrue( result.runCount()     == 1, "TC_009a" );
    this.assertTrue( result.failureCount() == 0, "TC_009b" );
    this.assertTrue( result.errorCount()   == 1, "TC_009c" );
    }

tests.ASTUce.TestCaseTest.prototype.verifyFailure = function( /*TestCase*/ test )
    {
    var result = test.run();
    this.assertTrue( result.runCount()     == 1, "TC_010a" );
    this.assertTrue( result.failureCount() == 1, "TC_010b" );
    this.assertTrue( result.errorCount()   == 0, "TC_010c" );
    }

tests.ASTUce.TestCaseTest.prototype.verifySuccess = function( /*TestCase*/ test )
    {
    var result = test.run();
    this.assertTrue( result.runCount()     == 1, "TC_011a" );
    this.assertTrue( result.failureCount() == 0, "TC_011b" );
    this.assertTrue( result.errorCount()   == 0, "TC_011c" );
    }

