
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is ASTUce: ActionScript Test Unit compact edition AS2. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

import buRRRn.ASTUce.*;
import Tests.ASTUce.*;

class Tests.ASTUce.SuiteTest extends TestCase
    {
    
    var result:TestResult;
    
    function SuiteTest( name )
        {
        super( name );
        }
    
    function setUp()
        {
        result = new TestResult();
        }
    
    static function suite()
        {
        var suite:TestSuite = new TestSuite( "SuiteTest" );
        //suite.simpleTrace = true;
        
        /* build the suite manually, because some of the suites are testing
           the functionality that automatically builds suites
        */
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
    
    function testNoTestCaseClass()
        {
        var t:ITest = new TestSuite( NoTestCaseClass );
        
        t.run( result );
        
        assertEquals( 1, result.runCount,    "SUIT_001a" );  // warning test  
        assertTrue( !result.wasSuccessful(), "SUIT_001b" );
        }
    
    function testNoTestCases()
        {
        var t:ITest = new TestSuite( NoTestCases );
        
        t.run( result );
        
        assertTrue( result.runCount     == 1, "SUIT_002a" );  // warning test
        assertTrue( result.failureCount == 1, "SUIT_002b" );
        assertTrue( !result.wasSuccessful(),  "SUIT_002c" );
        }
    
    function testOneTestCase()
        {
        var t:ITest = new TestSuite( OneTestCase );
        
        t.run( result );
        
        assertTrue( result.runCount     == 1, "SUIT_003a" );  
        assertTrue( result.failureCount == 0, "SUIT_003b" );
        assertTrue( result.errorCount   == 0, "SUIT_003c" );
        assertTrue( result.wasSuccessful(),   "SUIT_003d" );
        }
    
    function testNotPublicTestCase()
        {
        var suite:TestSuite = new TestSuite( NotPublicTestCase );
        
        // 1 public test case + 1 warning for the non-public test case
        assertEquals( 2, suite.countTestCases(), "SUIT_004" );
        }
    
    function testNotPublicTestCase2()
        {
        var original = buRRRn.ASTUce.config.testPrivateMethods;
        buRRRn.ASTUce.config.testPrivateMethods = true;
        
        var suite:TestSuite = new TestSuite( NotPublicTestCase );
        suite.run( result );
        
        // 1 public test case + 1 non-public test case
        assertEquals( 2, suite.countTestCases(),  "SUIT_005a" );
        assertTrue( result.runCount     == 2,     "SUIT_005b" );  
        assertTrue( result.failureCount == 0,     "SUIT_005c" );
        assertTrue( result.errorCount   == 0,     "SUIT_005d" );
        //assertTrue( result.wasSuccessful(),     "SUIT_005e" );
        buRRRn.ASTUce.config.testPrivateMethods = original;
        }
    
    function testNotExistingTestCase()
        {
        var t:ITest = new SuiteTest( "notExistingMethod" );
        
        t.run( result );
        
        assertTrue( result.runCount     == 1, "SUIT_006a" );  
        assertTrue( result.failureCount == 1, "SUIT_006b" );
        assertTrue( result.errorCount   == 0, "SUIT_006c" );
        }
    
    function testInheritedTests()
        {
        var suite:TestSuite = new TestSuite( InheritedTestCase );
        
        suite.run( result );
        
		assertTrue( result.wasSuccessful(), "SUIT_007a" );
		assertEquals( 2, result.runCount,   "SUIT_007b" );
        }
    
    function testShadowedTests()
        {
        var suite:TestSuite = new TestSuite( OverrideTestCase );
        
        suite.run( result );
        
        assertEquals( 1, result.runCount, "SUIT_008" );
        }
    
    function testAddTestSuite()
        {
        var suite:TestSuite = new TestSuite();
        suite.addTestSuite( OneTestCase );
        
        suite.run( result );
        
        assertEquals( 1, result.runCount, "SUIT_009" );
        }
    
    }

