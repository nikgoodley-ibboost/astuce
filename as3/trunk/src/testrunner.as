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

package
{
    import library.ASTUce.Runner;
    import library.ASTUce.metadata;
    import library.ASTUce.samples.AllTests;
    import library.ASTUce.samples.SimpleTest;
    import library.ASTUce.tests.AllTests;
    
    import flash.display.Sprite;
    
    [ExcludeClass]
    [SWF(width="400", height="400", backgroundColor="0xffffff", frameRate="24", pageTitle="testrunner", scriptRecursionLimit="1000", scriptTimeLimit="60")]
    public class testrunner extends Sprite
    {
        
        public function testrunner()
        {
            
            /* note:
               basic options to tune your output
            */
            metadata.config.allowStackTrace     = true;
            //metadata.config.allowErrorTrace     = false;
            //metadata.config.showPrinterDetails  = false;
            //metadata.config.showPrinterShortTests = false;
            //metadata.config.showObjectSource = false;
            metadata.config.showConstructorList = true;
            
            metadata.about( false, true );
            
            /* note:
               SimpleTest will generate error and failure
            */
//            Runner.main( library.ASTUce.tests.AllTests.suite(),
//                         library.ASTUce.samples.AllTests.suite(),
//                         "library.ASTUce.samples.SimpleTest" );
            
            Runner.main( library.ASTUce.tests.AllTests.suite(),
                         library.ASTUce.samples.AllTests.suite() );
            
        }
    }
}

