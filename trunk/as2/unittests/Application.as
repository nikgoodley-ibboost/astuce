
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

import buRRRn.ASTUce.config;
import buRRRn.ASTUce.TestSuite;

/* Singleton: Application
*/
class Application
    {
    
    /* StaticMethod: Main
    */
    static function main()
        {
        
        /* NOTE:
           ASTUce configuration
           
           default values are:
           config.verbose = true;
           config.showConstructorList = true;
           config.showObjectSource = true;
           config.invertExpectedActual = false;
           config.testPrivateMethods = false;
           config.testInheritedTests = true;
           config.testMyself = false;
        */
        config.testMyself = true;
        
        /* NOTE:
           if you want to add your own test hierarchy,
           just pass your TestSuite to the ASTUce main method.
           
           (code)
           buRRRn.ASTUce.Application.main( Tests.myNameSpace.AllTests.suite() );
           (end)
           
           you can also add more than one tests passing more
           than one arguments.
           
           (code)
           var TestSuite = buRRRn.ASTUce.TestSuite;
           buRRRn.ASTUce.Application.main(
                                          Tests.myNameSpace.AllTests.suite(),
                                          Tests.otherNameSpace.AllTests.suite(),
                                          new TestSuite( Tests.ASTUce.samples.ArrayTest, "ArrayTest" ),
                                          new TestSuite( Tests.ASTUce.samples.MoneyTest, "MoneyTest" ),
                                          new TestSuite( Tests.ASTUce.samples.SimpleTest, "SimpleTest" )
                                          )
           (end)
        */
        
        /* Default */
        //buRRRn.ASTUce.Application.main( Tests.AllTests.suite() );
        buRRRn.ASTUce.Application.main();
        
        
        /* Test Money */
        //config.testMyself = false;
        //buRRRn.ASTUce.Application.main( new TestSuite( Tests.ASTUce.samples.money.MoneyTest ) );
        
        /* Test samples */
        /* THOSE TESTS WILL GENERATE 4 FAILURES ON PURPOSE */
        //config.testMyself = false;
        //config.showObjectSource = false; //see the difference in SimpleTest( testEqualsObject )
        //config.showConstructorList = false; //see the difference in display
        //buRRRn.ASTUce.Application.main( Tests.ASTUce.samples.AllTests.suite() );
        }

    }
