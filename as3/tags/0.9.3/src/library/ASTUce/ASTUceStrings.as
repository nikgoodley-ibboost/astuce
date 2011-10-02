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

package library.ASTUce
{
    /**
    * Ressource strings for the ASTUce framework.
    */
    public class ASTUceStrings
    {
        public function ASTUceStrings() {}
        
        public var separator:String = "----------------------------------------------------------------";
        public var expectedNotSame:String = "{0}expected not same";
        public var expectedSame:String = "{0}expected same:<{1}> was not:<{2}>";
        public var expectedButWas:String = "{0}expected:<{1}> but was:<{2}>";
        public var methodNameNull:String = "The method name is null";
        public var methodNameUndef:String = "The method name is undefined";
        public var methodNameEmpty:String = "The method name is the empty string";
        public var methodNotFound:String = "Method \"{0}\" not found";
        public var methodshouldBePublic:String = "Method \"{0}\" should be public";
        public var objectNotCtor:String = "Object of type \"{0}\" is not a constructor";
        public var ctorNotPublic:String = "Constructor \"{0}\" is not public";
        public var ctorIsMalformed:String = "Constructor \"{0}\" is malformed, probably the \"name\" argument is missing";
        public var ctorIsMalformedMethod:String = "Method \"{0}\" can not be created because constructor \"{1}\" is malformed";
        public var ctorNotInstanciable:String = "Constructor \"{0}\" is not instanciable";
        public var ctorNotInstanciableMethod:String = "Method \"{0}\" can not be created because constructor \"{1}\" is not instanciable";
        public var ctorNotATest:String = "Constructor \"{0}\" does not implement Test";
        public var canNotInstanciateTestCase:String = "Cannot instantiate test case \"{0}\" ({1})";
        public var noTestsFound:String = "No tests found in \"{0}\"";
        public var argTestDoesNotExist:String = "the argument \"test\" does not exist in the namespace";
        public var argTestNotATest:String = "the argument \"test\" does not implement Test";
        public var testMethNotPublic:String = "Test method \"{0}\" isn't public";
        public var canNotCreateTest:String = "Cannot instantiate \"{0}\" test case";
        public var nameError:String = "error";
        public var nameFailure:String = "failure";
        public var PrtTime:String = "Time: {0}";
        public var PrtElapsedTime:String = "{0}h:{1}mn:{2}s:{3}ms";
        //public var PrtElapsedTime:String = "{h}h:{mn}mn:{s}s:{ms}ms";
        public var PrtDefectHeader:String = "{0,4}) {1}";
        public var PrtDefectTrace:String  = "{0,4}  {1}";
        public var PrtOneDefect:String = "There was {0} {1} :";
        public var PrtMoreDefects:String = "There were {0} {1}s :";
        public var PrtOK:String = "OK ({0} test{1})";
        public var PrtFailure:String = "FAILURES!!!";
        public var PrtFailureDetails:String = "Tests run: {0},  Failures: {1},  Errors: {2}";
        public var PrtWaitPrompt:String = "[ENTER] to continue";
        public var PrtShortTest:String = ".";
        public var PrtShortError:String = "E";
        public var PrtShortFailure:String = "F";
                          
        //Runner
        public var runTitle:String           = "[{0}] #{1}";
        public var tab:String                = "    {0}";
        public var nullTestsuite:String      = "Could not create and run a null test suite";
        public var canNotCreateAndRun:String = "Could not create and run test suite #{0}.";
    }
}