
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
       
       French (fr) resource strings.
       
       attention:
       The framework can test itself only with english messages
       due to the ComparisonFailureTest which compare results to english message.
    */
    buRRRn.ASTUce.strings = {};
    }

/* Property: expectedNotSame
   {0}expected not same
*/
buRRRn.ASTUce.strings.expectedNotSame      = "{0}escompté non identique";

/* Property: expectedSame
   {0}expected same:<{1}> was not:<{2}>
*/
buRRRn.ASTUce.strings.expectedSame         = "{0}escompté identique:<{1}> et non pas:<{2}>";

/* Property: expectedButWas
   {0}expected:<{1}> but was:<{2}>
*/
buRRRn.ASTUce.strings.expectedButWas       = "{0}escompté:<{1}> mais était:<{2}>";

/* Property: methodNameNull
   The method name is null
*/
buRRRn.ASTUce.strings.methodNameNull       = "Le nom de la méthode est non existante (null)";

/* Property: methodNameUndef
   The method name is undefined
*/
buRRRn.ASTUce.strings.methodNameUndef      = "Le nom de la méthode est non définie (undefined)";

/* Property: methodNotFound
   Method "{0}" not found
*/
buRRRn.ASTUce.strings.methodNotFound       = "La méthode \"{0}\" n'a pas été trouvée";

/* Property: methodshouldBePublic
   Method "{0}" should be public
*/
buRRRn.ASTUce.strings.methodshouldBePublic = "La méthode \"{0}\" devrait être publique";

/* Property: objectNotCtor
   Object "{0}" is not a constructor
*/
buRRRn.ASTUce.strings.objectNotCtor        = "L'objet \"{0}\" n'est pas un constructeur";

/* Property: ctorNotPublic
   Constructor "{0}" is not public
*/
buRRRn.ASTUce.strings.ctorNotPublic        = "Le constructeur \"{0}\" n'est pas publique";

/* Property: noTestsFound
   No tests found in "{0}"
*/
buRRRn.ASTUce.strings.noTestsFound         = "Aucun tests n'a été trouvé dans \"{0}\"";

/* Property: argTestDoesNotExist
   the argument "test" does not exist in the objects namespace (check your includes!)
*/
buRRRn.ASTUce.strings.argTestDoesNotExist  = "l'argument \"test\" n'existe pas dans l'espace de nom des objets (vérifiez vos fichiers d'inclusion!)";

/* Property: argTestNotATest
   the argument "test" does not inherit from TestCase or TestSuite
*/
buRRRn.ASTUce.strings.argTestNotATest      = "l'argument \"test\" n'hérite pas de TestCase ou de TestSuite";

/* Property: testMethNotPublic
   Test method "{0}" isn't public
*/
buRRRn.ASTUce.strings.testMethNotPublic    = "La méthode de Test \"{0}\" n'est pas publique";

/* Property: canNotCreateTest
   Cannot instantiate "{0}" test case
*/
buRRRn.ASTUce.strings.canNotCreateTest     = "Le cas de test \"{0}\" ne peut pas être instancié";

/* Property: nameError
   error
*/
buRRRn.ASTUce.strings.nameError            = "erreur";

/* Property: nameFailure
   failure
*/
buRRRn.ASTUce.strings.nameFailure          = "échec";

/* Property: PrtTime
   Time: {0}
*/
buRRRn.ASTUce.strings.PrtTime              = "Temps: {0}";

/* Property: PrtElapsedTime
   {0}h:{1}mn:{2}s:{3}ms
*/
buRRRn.ASTUce.strings.PrtElapsedTime       = "{0}h:{1}mn:{2}s:{3}ms";

/* Property: PrtOneDefect
   There was {0} {1}
*/
buRRRn.ASTUce.strings.PrtOneDefect         = "Il y a eut {0} {1}:";

/* Property: PrtMoreDefects
   There were {0} {1}s
*/
buRRRn.ASTUce.strings.PrtMoreDefects       = "Il y a eut {0} {1}s:";

/* Property: PrtOK
   OK ({0} test{1})
*/
buRRRn.ASTUce.strings.PrtOK                = "OK ({0} test{1})";

/* Property: PrtFailure
   FAILURES!!!
*/
buRRRn.ASTUce.strings.PrtFailure           = "ECHECS!!!";

/* Property: PrtFailureDetails
   Tests run: {0},  Failures: {1},  Errors: {2}
*/
buRRRn.ASTUce.strings.PrtFailureDetails    = "Tests lancés: {0},  Echecs: {1},  Erreurs: {2}";

