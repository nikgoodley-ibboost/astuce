
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

if( !_global.tests )
    {
    _global.tests = {};
    }

if( !tests.ASTUce )
    {
    /* NameSpace: tests.ASTUce
    */
    tests.ASTUce = {};
    }


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

tests.ASTUce.OneTestCase = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

tests.ASTUce.OneTestCase.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.OneTestCase.prototype.constructor = tests.ASTUce.OneTestCase;

tests.ASTUce.OneTestCase.prototype.testCase = function( /*int*/ arg )
    {
    
    }



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

tests.ASTUce.AllTests = function( name/*String*/ )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

tests.ASTUce.AllTests.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.AllTests.prototype.constructor = tests.ASTUce.AllTests;

tests.ASTUce.AllTests.suite = function()
    {
    var TestSuite = buRRRn.ASTUce.TestSuite;
    var suite     = new TestSuite( "ASTUce Tests" );
    
    /* note:
       to shorten the detail display you can also directly
       define the simpleTrace argument to a TestSuite.
    */
    //suite.simpleTrace = true;
    
    suite.addTest( new TestSuite( tests.ASTUce.AssertionTest ) );
    suite.addTest( new TestSuite( tests.ASTUce.ComparisonFailureTest ) );
    suite.addTest( new TestSuite( tests.ASTUce.TestListenerTest ) );
    suite.addTest( new TestSuite( tests.ASTUce.TestCaseTest ) );
    suite.addTest( tests.ASTUce.SuiteTest.suite() );
    
    return suite;
    }


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

/* Constructor: AssertionTest
   
   attention:
   In the tests that follow, we can't use
   standard formatting for exception tests:
   
   (code)
   try
       {
       this.somethingThatShouldThrow(); //throw an AssertionFailedError
       }
   catch( e )
       {
       if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return; //ok we catch the error
            }
        }
    this.fail(); //no error catched
   (end)
   
   because fail() would never be reported.
*/
tests.ASTUce.AssertionTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

tests.ASTUce.AssertionTest.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.AssertionTest.prototype.constructor = tests.ASTUce.AssertionTest;

tests.ASTUce.AssertionTest.prototype.testFail = function()
    {
    /* attention:
       Also, we are testing fail,
       so we can't rely on fail() working.
       We have to throw the exception manually.
    */
    try
        {
        this.fail();
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_001" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertEquals = function()
    {
    var o = new Object();
    this.assertEquals( o, o );
    this.assertEquals( new Object(), new Object(), "ASSERT_002" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertEqualsNull = function()
    {
    this.assertEquals( null, null, "ASSERT_003" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertStringEquals = function()
    {
    this.assertEquals( "a", "a", "ASSERT_004" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertNullNotEqualsString = function()
    {
    try
        {
        this.assertEquals( null, "foo" );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_005" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertStringNotEqualsNull = function()
    {
    try
        {
        this.assertEquals( "foo", null );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_006" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertNullNotEqualsNull = function()
    {
    try
        {
        this.assertEquals( null, new Object() );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_007" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertNull = function()
    {
    this.assertNull( null );
    
    try
        {
        this.assertNull( new Object() );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_008" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertNotNull = function()
    {
    this.assertNotNull( new Object() );
    
    try
        {
        this.assertNotNull( null );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_009" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertTrue = function()
    {
    this.assertTrue( true );
    
    try
        {
        this.assertTrue( false );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_010" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertFalse = function()
    {
    this.assertFalse( false );
    
    try
        {
        this.assertFalse( true );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_011" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertSame = function()
    {
    var o = new Object();
    this.assertSame( o, o );
    
    try
        {
        this.assertSame( new Number(1), new Number(1) );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_012" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertNotSame = function()
    {
    this.assertNotSame( new Number(1), null );
    this.assertNotSame( null, new Number(1) );
    this.assertNotSame( new Number(1) , new Number(1) );
    
    var obj = new Number(1);
    
    try
        {
        this.assertNotSame(obj, obj);
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_013" );
    }

tests.ASTUce.AssertionTest.prototype.testAssertNotSameFailsNull = function()
    {
    try
        {
        var assertNotSame = this.assertNotSame( null, null );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_014" );
    }


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

tests.ASTUce.ComparisonFailureTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

tests.ASTUce.ComparisonFailureTest.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.ComparisonFailureTest.prototype.constructor = tests.ASTUce.ComparisonFailureTest;

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorMessage = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "b", "c", "a" );
    this.assertEquals( "a expected:<b> but was:<c>", failure.getMessage(), "CF_001" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorStartSame = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "ba", "bc", null );
    this.assertEquals( "expected:<...a> but was:<...c>", failure.getMessage(), "CF_002" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorEndSame = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "ab", "cb", null);
    this.assertEquals( "expected:<a...> but was:<c...>", failure.getMessage(), "CF_003" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorSame = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "ab", "ab", null );
	this.assertEquals( "expected:<ab> but was:<ab>", failure.getMessage(), "CF_004" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorStartAndEndSame = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "abc", "adc", null );
	this.assertEquals( "expected:<...b...> but was:<...d...>", failure.getMessage(), "CF_005" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorStartSameComplete = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "ab", "abc", null );
	this.assertEquals( "expected:<...> but was:<...c>", failure.getMessage(), "CF_006" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorEndSameComplete = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "bc", "abc", null );
	this.assertEquals( "expected:<...> but was:<a...>", failure.getMessage(), "CF_007" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorOverlapingMatches = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "abc", "abbc", null );
	this.assertEquals( "expected:<......> but was:<...b...>", failure.getMessage(), "CF_008" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorOverlapingMatches2 = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "abcdde", "abcde", null );
	this.assertEquals( "expected:<...d...> but was:<......>", failure.getMessage(), "CF_009" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorWithActualNull = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "a", null, null );
	this.assertEquals( "expected:<a> but was:<null>", failure.getMessage(), "CF_010" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorWithExpectedNull = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( null, "a", null );
	this.assertEquals( "expected:<null> but was:<a>", failure.getMessage(), "CF_011" );
    }


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

tests.ASTUce.InheritedTestCase = function( name )
    {
    tests.ASTUce.OneTestCase.call( this, name );
    }

tests.ASTUce.InheritedTestCase.prototype = new tests.ASTUce.OneTestCase();
tests.ASTUce.InheritedTestCase.prototype.constructor = tests.ASTUce.InheritedTestCase;

tests.ASTUce.InheritedTestCase.prototype.testCase2 = function()
    {
    
    }


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

tests.ASTUce.NoArgTestCaseTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

tests.ASTUce.NoArgTestCaseTest.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.NoArgTestCaseTest.prototype.constructor = tests.ASTUce.NoArgTestCaseTest;

tests.ASTUce.NoArgTestCaseTest.prototype.testNothing = function()
    {
    
    }


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

tests.ASTUce.NoTestCaseClass = function()
    {
    
    }

tests.ASTUce.NoTestCaseClass.prototype.testSuccess = function()
    {
    
    }


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

tests.ASTUce.NoTestCases = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

tests.ASTUce.NoTestCases.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.NoTestCases.prototype.constructor = tests.ASTUce.NoTestCases;

tests.ASTUce.NoTestCases.prototype.noTestCase = function()
    {
    
    }


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

tests.ASTUce.NotPublicTestCase = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

tests.ASTUce.NotPublicTestCase.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.NotPublicTestCase.prototype.constructor = tests.ASTUce.NotPublicTestCase;

tests.ASTUce.NotPublicTestCase.prototype._testNotPublic = function()
    {
    
    }

tests.ASTUce.NotPublicTestCase.prototype.testPublic = function()
    {
    
    }


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

tests.ASTUce.OverrideTestCase = function( name )
    {
    tests.ASTUce.OneTestCase.call( this, name );
    }

tests.ASTUce.OverrideTestCase.prototype = new tests.ASTUce.OneTestCase();
tests.ASTUce.OverrideTestCase.prototype.constructor = tests.ASTUce.OverrideTestCase;

tests.ASTUce.OverrideTestCase.prototype.testCase = function()
    {
    
    }


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

if( !tests.ASTUce.samples )
    {
    /* NameSpace: Tests.ASTUce.samples
    */
    tests.ASTUce.samples = {};
    }

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

/* Constructor: SuiteTest
   A fixture for testing the "auto" test suite feature.
*/
tests.ASTUce.SuiteTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

tests.ASTUce.SuiteTest.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.SuiteTest.prototype.constructor = tests.ASTUce.SuiteTest;

tests.ASTUce.SuiteTest.prototype.setUp = function()
    {
    this.result = new buRRRn.ASTUce.TestResult();
    }

/* StaticMethod: suite
*/
tests.ASTUce.SuiteTest.suite = function()
    {
    var SuiteTest, suite;
    SuiteTest = tests.ASTUce.SuiteTest;
    suite     = new buRRRn.ASTUce.TestSuite( "Suite Tests" );
    //suite.simpleTrace = true;
    
    //build the suite manually, because some of the suites are testing
    //the functionality that automatically builds suites
    suite.addTest( new SuiteTest( "testNoTestCaseClass" ) );
    suite.addTest( new SuiteTest( "testNoTestCases" ) );
    suite.addTest( new SuiteTest( "testOneTestCase" ) );
    suite.addTest( new SuiteTest( "testNotPublicTestCase" ) );
    suite.addTest( new SuiteTest( "testNotPublicTestCase2" ) );
    suite.addTest( new SuiteTest( "testNotExistingTestCase" ) );
    suite.addTest( new SuiteTest( "testInheritedTests" ) );
    suite.addTest( new SuiteTest( "testShadowedTests" ) );
    suite.addTest( new SuiteTest( "testAddTestSuite" ) );
    
    return suite;
    }

tests.ASTUce.SuiteTest.prototype.testNoTestCaseClass = function()
    {
    var t = new buRRRn.ASTUce.TestSuite( tests.ASTUce.NoTestCaseClass );
    t.run( this.result );
    this.assertEquals( 1, this.result.runCount(),  "SUIT_001a" );  // warning test
    this.assertTrue( !this.result.wasSuccessful(), "SUIT_001b" );
    }

tests.ASTUce.SuiteTest.prototype.testNoTestCases = function()
    {
    var t = new buRRRn.ASTUce.TestSuite( tests.ASTUce.NoTestCases );
    t.run( this.result );
    this.assertTrue( this.result.runCount() == 1,     "SUIT_002a" );  // warning test
    this.assertTrue( this.result.failureCount() == 1, "SUIT_002b" );
    this.assertTrue( !this.result.wasSuccessful(),    "SUIT_002c" );
    }

tests.ASTUce.SuiteTest.prototype.testOneTestCase = function()
    {
    var t = new buRRRn.ASTUce.TestSuite( tests.ASTUce.OneTestCase );
    t.run( this.result );
    this.assertTrue( this.result.runCount() == 1,     "SUIT_003a" );  
    this.assertTrue( this.result.failureCount() == 0, "SUIT_003b" );
    this.assertTrue( this.result.errorCount() == 0,   "SUIT_003c" );
    this.assertTrue( this.result.wasSuccessful(),     "SUIT_003d" );
    }

tests.ASTUce.SuiteTest.prototype.testNotPublicTestCase = function()
    {
    var suite = new buRRRn.ASTUce.TestSuite( tests.ASTUce.NotPublicTestCase );
    // 1 public test case + 1 warning for the non-public test case
    this.assertEquals( 2, suite.countTestCases(), "SUIT_004" );
    }

tests.ASTUce.SuiteTest.prototype.testNotPublicTestCase2 = function()
    {
    var original = buRRRn.ASTUce.testPrivateMethods;
    buRRRn.ASTUce.testPrivateMethods = true;
    
    var suite = new buRRRn.ASTUce.TestSuite( tests.ASTUce.NotPublicTestCase );
    suite.run( this.result );
    
    // 1 public test case + 1 non-public test case
    this.assertEquals( 2, suite.countTestCases(),     "SUIT_005a" );
    this.assertTrue( this.result.runCount() == 2,     "SUIT_005b" );  
    this.assertTrue( this.result.failureCount() == 0, "SUIT_005c" );
    this.assertTrue( this.result.errorCount() == 0,   "SUIT_005d" );
    //this.assertTrue( this.result.wasSuccessful(),     "SUIT_005e" );
    buRRRn.ASTUce.testPrivateMethods = original;
    }

tests.ASTUce.SuiteTest.prototype.testNotExistingTestCase = function()
    {
    var t = new tests.ASTUce.SuiteTest( "notExistingMethod" );
    t.run( this.result );
    this.assertTrue( this.result.runCount() == 1,     "SUIT_006a" );  
    this.assertTrue( this.result.failureCount() == 1, "SUIT_006b" );
    this.assertTrue( this.result.errorCount() == 0,   "SUIT_006c" );
    }

tests.ASTUce.SuiteTest.prototype.testInheritedTests = function()
    {
    var suite = new buRRRn.ASTUce.TestSuite( tests.ASTUce.InheritedTestCase );
    suite.run( this.result );
    this.assertTrue( this.result.wasSuccessful(),  "SUIT_007a" );
    this.assertEquals( 2, this.result.runCount(),  "SUIT_007b" );
    }

tests.ASTUce.SuiteTest.prototype.testShadowedTests = function()
    {
    var suite = new buRRRn.ASTUce.TestSuite( tests.ASTUce.OverrideTestCase );
    suite.run( this.result );
    this.assertEquals( 1, this.result.runCount(), "SUIT_008" );
    }

tests.ASTUce.SuiteTest.prototype.testAddTestSuite = function()
    {
    var suite = new buRRRn.ASTUce.TestSuite();
    suite.addTestSuite( tests.ASTUce.OneTestCase );
    suite.run( this.result );
    this.assertEquals( 1, this.result.runCount(), "SUIT_009" );
    }


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

tests.ASTUce.TestListenerTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    
    this._result       = null;
    this._startCount   = null;
    this._endCount     = null;
    this._failureCount = null;
    this._errorCount   = null;
    }

tests.ASTUce.TestListenerTest.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.TestListenerTest.prototype.constructor = tests.ASTUce.TestListenerTest;

tests.ASTUce.TestListenerTest.prototype.addError = function( /*ITest*/ test, /*Error*/ e )
    {
    this._errorCount++;
    }

tests.ASTUce.TestListenerTest.prototype.addFailure = function( /*ITest*/ test, /*AssertionFailedError*/ afe )
    {
    this._failureCount++;
    }

tests.ASTUce.TestListenerTest.prototype.endTest = function( /*ITest*/ test )
    {
    this._endCount++;
    }

tests.ASTUce.TestListenerTest.prototype.startTest = function( /*ITest*/ test )
    {
    this._startCount++;
    }

tests.ASTUce.TestListenerTest.prototype.setUp = function()
    {
    this._result = new buRRRn.ASTUce.TestResult();
    this._result.addListener( this );
    
    this._startCount   = 0;
    this._endCount     = 0;
    this._failureCount = 0;
    this._errorCount   = 0;
    }

tests.ASTUce.TestListenerTest.prototype.testError = function()
    {
    var test = new buRRRn.ASTUce.TestCase( "noop" );
    
    test.runTest = function()
        {
        throw new Error();
        }
    
    test.run( this._result );
    this.assertEquals( 1, this._errorCount, "TL_001a" );
    this.assertEquals( 1, this._endCount,   "TL_001b" );
    }

tests.ASTUce.TestListenerTest.prototype.testFailure = function()
    {
    var test = new buRRRn.ASTUce.TestCase( "noop" );
    
    test.runTest = function()
        {
        /*!## TODO:  change the scope ?
                 we don't want to call this.fail from test
                 bu from TestListenerTest
                 self = this;
                 ...
                     {
                     self.fail();
                     }
        */
        this.fail();
        }
    
    test.run( this._result );
    this.assertEquals( 1, this._failureCount, "TL_002a" );
    this.assertEquals( 1, this._endCount,     "TL_002b" );
    }

tests.ASTUce.TestListenerTest.prototype.testStartStop = function()
    {
    var test = new buRRRn.ASTUce.TestCase("noop");
    
    test.runTest = function()
        {
        
        }
    
    test.run( this._result );
    this.assertEquals( 1, this._startCount, "TL_003a" );
    this.assertEquals( 1, this._endCount,   "TL_003b" );
    }


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

tests.ASTUce.WasRun = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    this._wasRun = false;
    }

tests.ASTUce.WasRun.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.WasRun.prototype.constructor = tests.ASTUce.WasRun;

tests.ASTUce.WasRun.prototype.runTest = function()
    {
    this._wasRun = true;
    }


