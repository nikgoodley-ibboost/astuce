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
  Portions created by the Initial Developer are Copyright (C) 2006-2011
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
  Marc Alcaraz <ekameleon@gmail.com>.
  
*/

package library.ASTUce.tests.extensions
{
    import library.ASTUce.framework.*;    
    import library.ASTUce.extensions.TimedTest;
    
    [ExcludeClass]
    public class TimedTestTest extends TestCase
    {
        
        public function TimedTestTest( name:String = "" )
        {
            super( name );
        }
        
        public function testSuiteLong():void
        {
            var suite:TestSuite = new TestSuite( "Long suite" );
            
            suite.addTestSuite( LongTest );
            suite.addTestSuite( LongTest );
            
            var test:Test = new TimedTest( suite, 100 );
            var result:TestResult = new TestResult();
    		test.run( result );
    		
    		assertEquals( 2, result.runCount );
    		assertEquals( 0, result.failureCount );
    		assertEquals( 0, result.errorCount );
        }
        
        public function testSuiteShort():void
        {
            var suite:TestSuite = new TestSuite( "Short suite" );
            
            suite.addTestSuite( ShortTest );
            suite.addTestSuite( ShortTest );
            
            var test:Test = new TimedTest( suite, 50 );
            var result:TestResult = new TestResult();
    		test.run( result );
    		
    		assertEquals( 2, result.runCount );
    		assertEquals( 0, result.failureCount );
    		assertEquals( 0, result.errorCount );
        }
        
    }
    
}

