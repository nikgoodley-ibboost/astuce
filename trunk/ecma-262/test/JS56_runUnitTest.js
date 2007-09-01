
var _global = this;

_global.include = function( /*String*/ filepath )
    {
    var FSO = new ActiveXObject( "Scripting.FileSystemObject" );
    
    if( FSO.FileExists( filepath ) )
        {
        return eval( FSO.OpenTextFile( filepath ).ReadAll() );
        }
    else
        {
        WScript.Echo( "## ERROR : \"" + filepath + "\" does not exist ##" );
        }
    }

include( "..\\lib\\core2\\core2_v1.0.1_JS56.js56" );

include( "..\\release\\lib\\ASTUce_v1.0.0.es" );
include( "..\\release\\lib\\ASTUce_v1.0.0_TESTS.es" );

/* Singleton: Application
*/
_global.Application = {};

/* StaticMethod: Main
*/
Application.main = function()
    {
    
    /* NOTE:
       ASTUce configuration
       
       default values are:
       buRRRn.ASTUce.invertExpectedActual = false;
       buRRRn.ASTUce.testMyself = false;
       buRRRn.ASTUce.testPrivateMethods = false;
       buRRRn.ASTUce.showConstructorList = false;
       buRRRn.ASTUce.showObjectSource = true;
       buRRRn.ASTUce.verbose = true;
    */
    buRRRn.ASTUce.showConstructorList = true;
    buRRRn.ASTUce.testMyself = true;
    
    /* NOTE:
       if you want to add your own test hierarchy,
       just pass your TestSuite to the ASTUce main method.
       
       (code)
       buRRRn.ASTUce.main( Tests.myNameSpace.AllTests.suite() );
       (end)
       
       you can also add more than one tests passing more
       than one arguments.
       
       (code)
       var TestSuite = buRRRn.ASTUce.TestSuite;
       buRRRn.ASTUce.main(
                          Tests.myNameSpace.AllTests.suite(),
                          Tests.otherNameSpace.AllTests.suite(),
                          new TestSuite( Tests.ASTUce.samples.ArrayTest, "ArrayTest" ),
                          new TestSuite( Tests.ASTUce.samples.MoneyTest, "MoneyTest" ),
                          new TestSuite( Tests.ASTUce.samples.SimpleTest, "SimpleTest" )
                          )
       (end)
    */
    
    /* ASTUce sample tests will generate 4 failures */
    //buRRRn.ASTUce.main( Tests.ASTUce.samples.AllTests.suite() );
    
    /* Default */
    buRRRn.ASTUce.main();
    
    }

trace( ScriptEngine() +" "+ WScript.Version );

/* Main Entry Point */
Application.main();

