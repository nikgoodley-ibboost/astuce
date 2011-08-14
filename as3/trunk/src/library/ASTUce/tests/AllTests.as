﻿/*
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

package library.ASTUce.tests
{
    import library.ASTUce.framework.*;
    import library.ASTUce.tests.extensions.AllTests;
    import library.ASTUce.tests.framework.AllTests;
    import library.ASTUce.tests.mocks.AllTests;    

    /* TestSuite that runs all the ASTUce tests
    */
    [ExcludeClass]
    public class AllTests
    {
        
        public function AllTests()
        {
            
        }
        
        static public function suite():Test
        {
            var suite:TestSuite = new TestSuite( "All ASTUce tests" );
            
            suite.addTest( library.ASTUce.tests.framework.AllTests.suite() );
            suite.addTest( library.ASTUce.tests.extensions.AllTests.suite() );
            suite.addTest( library.ASTUce.tests.mocks.AllTests.suite() );
            
            return suite;
        }
        
    }
    
}