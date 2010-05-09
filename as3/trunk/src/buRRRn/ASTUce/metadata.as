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
  Portions created by the Initial Developer are Copyright (C) 2006-2010
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
  Marc Alcaraz <ekameleon@gmail.com>.
  
*/

package buRRRn.ASTUce
{
    import core.strings.format; void(format);
    import core.version;
    
    import system.terminals.console;
    
    /**
     * Stores static metadata about the project
     */
    public class metadata
    {
        /**
         * Name of the project.
         */ 
        public static var name:String = "ASTUce";
        
        /**
         * Full name of the project.
         */
        public static var fullname:String = "ActionScript Test Unit compact edition AS3";
        
        /**
         * Version of the project.
         */ 
        public static var version:core.version = new core.version();
        
        include "version.properties";
        
        version.revision = parseInt( "$Rev$".split( " " )[1] );
        
        public static var copyright:String = "Copyright © 2006-2010 Zwetan Kjukov, All right reserved.";
        public static var origin:String    = "Made in the EU.";
        
        /**
        * Prints the informations of the package.
        */
        public static function about( verbose:Boolean = false, showConfig:Boolean = false ):void
        {
            console.writeLine( info( verbose, showConfig ) );
        }
        
        /**
        * Returns the informations of the package.
        */
        public static function info( verbose:Boolean = false, showConfig:Boolean = false ):String
        {
            var CRLF:String = "\n";
            
            var str:String = "";
                if( !verbose && config.verbose )
                {
                    verbose = true;
                }
                
                if( verbose ) {
                str += "{sep}{crlf}";
                str += "{name}: {fullname} v{version}{crlf}";
                str += "{copyright}{crlf}";
                str += "{origin}{crlf}";
                str += "{sep}";
                } else {
                str += "{name} v{version}{crlf}";
                str += "{sep}";
                }
                
                if( showConfig ) {
                str += "{crlf}config:";
                str += "{config}{crlf}";
                str += "{sep}";
                }
                
            return format( str,
                           {
                           sep: strings.separator,
                           crlf: CRLF,
                           name: metadata.name,
                           fullname: metadata.fullname,
                           version: metadata.version,
                           copyright: metadata.copyright,
                           origin: metadata.origin,
                           config: config.toSource()
                           }
                        );
            
        }
        
        /**
         * Stores the configuration options of the package.
         */
        public static var config:ASTUceConfigurator = new ASTUceConfigurator( {
                           verbose: false,
                           showConstructorList: false,
                           showAllAsSimpleTrace: false,
                           showSimpleTraceDepth: 1,
                           showPrinterShortTests: true,
                           showPrinterDetails: true,
                           showPrintHeader: true,
                           showPrintErrors: true,
                           showPrintFailures: true,
                           showPrintFooter: true,
                           showEmptyTests: true,
                           showObjectSource: true,
                           invertExpectedActual: false,
                           testInheritedTests: true,
                           maxColumn: 38,
                           defectHeaderAsError: false,
                           allowErrorTrace: true,
                           allowStackTrace: true,
                           filterErrorStack: true,
                           cleanupErrorStack: true,
                           cleanupPattern: /\[.*\]/,
                           cleanupReplacement: "",
                           filteredPatterns: [
                           "buRRRn.ASTUce.framework::TestResult",
                           "buRRRn.ASTUce.framework::TestCase",
                           "buRRRn.ASTUce.framework::TestSuite",
                           "buRRRn.ASTUce.UI",
                           "at MethodInfo",
                           "at ()",
                           "at Function/http://adobe.com/AS3/2006/builtin::call()",
                           "at Function/http://adobe.com/AS3/2006/builtin::apply()"
                                             ]
                                                                             } );
        
        /**
         * Stores the string resources of the package. 
         */
        public static var strings:Object = {};
                          strings.separator = "----------------------------------------------------------------";
                          strings.expectedNotSame = "{0}expected not same";
                          strings.expectedSame = "{0}expected same:<{1}> was not:<{2}>";
                          strings.expectedButWas = "{0}expected:<{1}> but was:<{2}>";
                          strings.methodNameNull = "The method name is null";
                          strings.methodNameUndef = "The method name is undefined";
                          strings.methodNameEmpty = "The method name is the empty string";
                          strings.methodNotFound = "Method \"{0}\" not found";
                          strings.methodshouldBePublic = "Method \"{0}\" should be public";
                          strings.objectNotCtor = "Object of type \"{0}\" is not a constructor";
                          strings.ctorNotPublic = "Constructor \"{0}\" is not public";
                          strings.ctorIsMalformed = "Constructor \"{0}\" is malformed, probably the \"name\" argument is missing";
                          strings.ctorIsMalformedMethod = "Method \"{0}\" can not be created because constructor \"{1}\" is malformed";
                          strings.ctorNotInstanciable = "Constructor \"{0}\" is not instanciable";
                          strings.ctorNotInstanciableMethod = "Method \"{0}\" can not be created because constructor \"{1}\" is not instanciable";
                          strings.ctorNotATest = "Constructor \"{0}\" does not implement ITest";
                          strings.canNotInstanciateTestCase = "Cannot instantiate test case \"{0}\" ({1})";
                          strings.noTestsFound = "No tests found in \"{0}\"";
                          strings.argTestDoesNotExist = "the argument \"test\" does not exist in the namespace";
                          strings.argTestNotATest = "the argument \"test\" does not implement ITest";
                          strings.testMethNotPublic = "Test method \"{0}\" isn't public";
                          strings.canNotCreateTest = "Cannot instantiate \"{0}\" test case";
                          strings.nameError = "error";
                          strings.nameFailure = "failure";
                          strings.PrtTime = "Time: {0}";
                          strings.PrtElapsedTime = "{0}h:{1}mn:{2}s:{3}ms";
                          //strings.PrtElapsedTime = "{h}h:{mn}mn:{s}s:{ms}ms";
                          strings.PrtDefectHeader = "{0,4}) {1}";
                          strings.PrtDefectTrace  = "{0,4}  {1}";
                          strings.PrtOneDefect = "There was {0} {1} :";
                          strings.PrtMoreDefects = "There were {0} {1}s :";
                          strings.PrtOK = "OK ({0} test{1})";
                          strings.PrtFailure = "FAILURES!!!";
                          strings.PrtFailureDetails = "Tests run: {0},  Failures: {1},  Errors: {2}";
                          strings.PrtWaitPrompt = "[ENTER] to continue";
                          strings.PrtShortTest = ".";
                          strings.PrtShortError = "E";
                          strings.PrtShortFailure = "F";
                          
                          //Runner
                          strings.runTitle           = "[{0}] #{1}";
                          strings.tab                = "    {0}";
                          strings.nullTestsuite      = "Could not create and run a null test suite";
                          strings.canNotCreateAndRun = "Could not create and run test suite #{0}.";
        
    }
}