
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

/* Singleton: strings
   Configure the ASTUce framework messages.
   
   attention:
   The framework can test itself only with english messages
   due to the ComparisonFailureTest which compare results to english message.
*/
class buRRRn.ASTUce.strings
    {
    
    /* StaticStaticProperty: expectedNotSame
       {0}expected not same
    */
    static var expectedNotSame:String = "{0}expected not same";
    
    /* StaticProperty: expectedSame
       {0}expected same:<{1}> was not:<{2}>
    */
    static var expectedSame:String = "{0}expected same:<{1}> was not:<{2}>";
    
    /* StaticProperty: expectedButWas
       {0}expected:<{1}> but was:<{2}>
    */
    static var expectedButWas:String = "{0}expected:<{1}> but was:<{2}>";
    
    /* StaticProperty: methodNameNull
       The method name is null
    */
    static var methodNameNull:String = "The method name is null";
    
    /* StaticProperty: methodNameUndef
       The method name is undefined
    */
    static var methodNameUndef:String = "The method name is undefined";
    
    /* StaticProperty: methodNotFound
       Method "{0}" not found
    */
    static var methodNotFound:String = "Method \"{0}\" not found";
    
    /* StaticProperty: methodshouldBePublic
       Method "{0}" should be public
    */
    static var methodshouldBePublic:String = "Method \"{0}\" should be public";
    
    /* StaticProperty: objectNotCtor
       Object "{0}" is not a constructor
    */
    static var objectNotCtor:String = "Object \"{0}\" is not a constructor";
    
    /* StaticProperty: ctorNotPublic
       Constructor "{0}" is not public
    */
    static var ctorNotPublic:String = "Constructor \"{0}\" is not public";
    
    /* StaticProperty: noTestsFound
       No tests found in "{0}"
    */
    static var noTestsFound:String = "No tests found in \"{0}\"";
    
    /* StaticProperty: argTestDoesNotExist
       the argument "test" does not exist in the objects namespace (check your includes!)
    */
    static var argTestDoesNotExist:String = "the argument \"test\" does not exist in the objects namespace (check your includes!)";
    
    /* StaticProperty: argTestNotATest
       the argument "test" does not inherit from TestCase or TestSuite
    */
    static var argTestNotATest:String = "the argument \"test\" does not inherit from TestCase or TestSuite";
    
    /* StaticProperty: testMethNotPublic
       Test method "{0}" isn't public
    */
    static var testMethNotPublic:String = "Test method \"{0}\" isn't public";
    
    /* StaticProperty: canNotCreateTest
       Cannot instantiate "{0}" test case
    */
    static var canNotCreateTest:String = "Cannot instantiate \"{0}\" test case";
    
    /* StaticProperty: nameError
       error
    */
    static var nameError:String = "error";
    
    /* StaticProperty: nameFailure
       failure
    */
    static var nameFailure:String = "failure";
    
    /* StaticProperty: PrtTime
       Time: {0}
    */
    static var PrtTime:String = "Time: {0}";
    
    /* StaticProperty: PrtElapsedTime
       {0}h:{1}mn:{2}s:{3}ms
    */
    static var PrtElapsedTime:String = "{0}h:{1}mn:{2}s:{3}ms";
    
    /* StaticProperty: PrtOneDefect
       There was {0} {1}
    */
    static var PrtOneDefect:String = "There was {0} {1}:";
    
    /* StaticProperty: PrtMoreDefects
       There were {0} {1}s
    */
    static var PrtMoreDefects:String = "There were {0} {1}s:";
    
    /* StaticProperty: PrtOK
       OK ({0} test{1})
    */
    static var PrtOK:String = "OK ({0} test{1})";
    
    /* StaticProperty: PrtFailure
       FAILURES!!!
    */
    static var PrtFailure:String = "FAILURES!!!";
    
    /* StaticProperty: PrtFailureDetails
       Tests run: {0},  Failures: {1},  Errors: {2}
    */
    static var PrtFailureDetails:String = "Tests run: {0},  Failures: {1},  Errors: {2}";
    
    }

