
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

