
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
  Portions created by the Initial Developer are Copyright (C) 2004-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

if( !buRRRn.ASTUce.strings )
    {
    /* NameSpace: strings
       Configure the ASTUce framework messages.
       
       Klingon resource strings.
       Don't tell me you never wanted to curse in klingon at those failling tests :P ?
       
       attention:
       The framework can test itself only with english messages
       due to the ComparisonFailureTest which compare results to english message.
    */
    buRRRn.ASTUce.strings = {};
    }

/* Property: expectedNotSame
   {0}expected not same
*/
buRRRn.ASTUce.strings.expectedNotSame      = "{0}pIH Qo rap";

/* Property: expectedSame
   {0}expected same:<{1}> was not:<{2}>
*/
buRRRn.ASTUce.strings.expectedSame         = "{0}pIH rap:<{1}> Qo:<{2}>";

/* Property: expectedButWas
   {0}expected:<{1}> but was:<{2}>
*/
buRRRn.ASTUce.strings.expectedButWas       = "{0}pIH:<{1}> 'ach:<{2}>";

/* Property: methodNameNull
   The method name is null
*/
buRRRn.ASTUce.strings.methodNameNull       = "Qap pong pagh (null)";

/* Property: methodNameUndef
   The method name is undefined
*/
buRRRn.ASTUce.strings.methodNameUndef      = "Qap pong Qo yln (undefined)";

/* Property: methodNotFound
   Method "{0}" not found
*/
buRRRn.ASTUce.strings.methodNotFound       = "Qap \"{0}\" Qo Sam";

/* Property: methodshouldBePublic
   Method "{0}" should be public
*/
buRRRn.ASTUce.strings.methodshouldBePublic = "Qap \"{0}\" tlhej Hoch";

/* Property: objectNotCtor
   Object "{0}" is not a constructor
*/
buRRRn.ASTUce.strings.objectNotCtor        = "Doch \"{0}\" Qo qach";

/* Property: ctorNotPublic
   Constructor "{0}" is not public
*/
buRRRn.ASTUce.strings.ctorNotPublic        = "qach \"{0}\" Qo Hoch";

/* Property: noTestsFound
   No tests found in "{0}"
*/
buRRRn.ASTUce.strings.noTestsFound         = "pagh vItHay' \"{0}\" Qo Sam";

/* Property: argTestDoesNotExist
   the argument "test" does not exist in the objects namespace (check your includes!)
*/
buRRRn.ASTUce.strings.argTestDoesNotExist  = "DoS \"test\" Qo yln ngaS logh qach ('ol teywl' ghuy'cha' baQa'!)";

/* Property: argTestNotATest
   the argument "test" does not inherit from TestCase or TestSuite , quH - heritage
*/
buRRRn.ASTUce.strings.argTestNotATest      = "DoS \"test\" Hutlh quH TestCase ghap TestSuite";

/* Property: testMethNotPublic
   Test method "{0}" isn't public
*/
buRRRn.ASTUce.strings.testMethNotPublic    = "vItHay' \"{0}\" ghobe' Hoch";

/* Property: canNotCreateTest
   Cannot instantiate "{0}" test case
*/
buRRRn.ASTUce.strings.canNotCreateTest     = "vItHay' \"{0}\" Qo chenmoH";

/* Property: nameError
   error
*/
buRRRn.ASTUce.strings.nameError            = "Qagh";

/* Property: nameFailure
   failure
*/
buRRRn.ASTUce.strings.nameFailure          = "luj";

/* Property: PrtTime
   Time: {0}
*/
buRRRn.ASTUce.strings.PrtTime              = "poH: {0}";

/* Property: PrtElapsedTime
   {0}h:{1}mn:{2}s:{3}ms
*/
buRRRn.ASTUce.strings.PrtElapsedTime       = "{0}h:{1}mn:{2}s:{3}ms";

/* Property: PrtOneDefect
   There was {0} {1}
*/
buRRRn.ASTUce.strings.PrtOneDefect         = "tu'lu' {0} {1}:";

/* Property: PrtMoreDefects
   There were {0} {1}s
*/
buRRRn.ASTUce.strings.PrtMoreDefects       = "tu'lu' {0} {1}s:";

/* Property: PrtOK
   OK ({0} test{1})
*/
buRRRn.ASTUce.strings.PrtOK                = "QAPLA' ({0} vItHay'{1})";

/* Property: PrtFailure
   FAILURES!!!
*/
buRRRn.ASTUce.strings.PrtFailure           = "BAQA'!!!";

/* Property: PrtFailureDetails
   Tests run: {0},  Failures: {1},  Errors: {2}
*/
buRRRn.ASTUce.strings.PrtFailureDetails    = "vItHay' qet: {0},  luj: {1},  Qagh: {2}";

