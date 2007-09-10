
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

