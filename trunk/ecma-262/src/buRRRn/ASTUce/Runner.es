
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
  Portions created by the Initial Developer are Copyright (C) 2004-2007
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

/* Constructor: Runner
   This is the default TestRunner for ASTUce.
   
   Constructs a TestRunner,
   using the given writer function if provided.
           
   note:
   The default writer function for ResultPrinter is trace
   (setup by core2).
*/
buRRRn.ASTUce.Runner = function( writer/*Function*/ )
    {    
    this.printer = new buRRRn.ASTUce.ResultPrinter( writer );
    }

buRRRn.ASTUce.Runner.prototype = new buRRRn.ASTUce.BaseTestRunner();
buRRRn.ASTUce.Runner.prototype.constructor = buRRRn.ASTUce.Runner;

buRRRn.ASTUce.Runner.displayHeader = function()
    {
    trace( "buRRRn.ASTUce.info" );
    }

buRRRn.ASTUce.Runner.prototype.getTestName = function( any )/*String*/
    {
    if( any == null )
        {
        return "null";
        }
    
    if( (any instanceof String) || (typeof any == "string") )
        {
        return any;
        }
    
    if( (any instanceof buRRRn.ASTUce.TestSuite) || (any instanceof buRRRn.ASTUce.TestCase) )
        {
        return any.name;
        }
    
    if( typeof any == "function" )
        {
        //return buRRRn.Reflection.getConstructorName( any );
        return buRRRn.Reflection.getObjectPath( any );
        }
    
    return "";
    }

buRRRn.ASTUce.Runner.prototype.runFailed = function( message/*String*/ )
    {
    trace( message );
    }

buRRRn.ASTUce.Runner.prototype.displayInfos = function( suite/*ITest*/, result/*TestResult*/ )
    {
    if( buRRRn.ASTUce.config.showConstructorList )
        {
        trace( suite );
        }
    }



buRRRn.ASTUce.Runner.prototype.doRun = function( suite/*ITest*/ )/*TestResult*/
    {
    var result = new buRRRn.ASTUce.TestResult();
    result.addListener( this.printer );
    
    var startTime = new Date().valueOf();
    suite.run( result );
    var endTime   = new Date().valueOf();
    
    var runTime = endTime - startTime;
    this.printer.print( result, runTime );
    
    this.displayInfos( suite, result );
    
    return result;
    }





/* Method: main
   Runs multiple test and collects their results.
*/
buRRRn.ASTUce.Runner.main = function()
    {
    var result;
    var runner = new buRRRn.ASTUce.Runner();
    var suiteName;
    
    this.displayHeader();
    
    for( var i=0; i<arguments.length; i++ )
        {
        suiteName = runner.getTestName( arguments[i] );
        trace( String.format( "[{0}] #{1}", suiteName, i ) );
        
        try
            {
            result = buRRRn.ASTUce.Runner.run( arguments[i], runner );
            }
        catch( e )
            {
          /*if( e instanceof NullSuiteError )
                {
                runner.runFailed( _strings.nullTestsuite );
                }
            else
                {*/
                runner.runFailed( String.format( "Could not create and run test suite #{0}.", i ) );
                runner.runFailed( String.format( "    {0}", e.toString() ) );
              /*}*/
            }
        
        trace( buRRRn.ASTUce.strings.separator );
        }
    }

/* Method: run
   
*/
buRRRn.ASTUce.Runner.run = function( test, runner )/*TestResult*/
    {
    if( runner == null )
        {
        runner = new buRRRn.ASTUce.Runner();
        this.displayHeader();
        }
    
    var suite;
    
    if( test == null )
        {
        trace( "suite is null" );
        throw new Error( "test is null" );
        }
    
    if( (test instanceof String) || (typeof test == "string") )
        {
        trace( "suite is string" );
        suite = runner.getTest( test );
        trace( "suite: " + suite.toString() );
        trace( "doRun suite from string" );
        return runner.doRun( suite );
        }
    
    if( (test instanceof buRRRn.ASTUce.TestCase) || (test instanceof buRRRn.ASTUce.TestSuite) )
        {
        trace( "suite is TestCase|TestSuite" );
        suite = test;
        }
    
    if( (typeof test == "function") || (typeof test == "object") )
        {
        trace( "suite is ctor or instance" );
        var staticSuite = buRRRn.Reflection.getMethodByName( test, "suite" );
        
        if( staticSuite != null )
            {
            trace( "staticSuite != null" );
            suite = staticSuite();
            }
        else
            {
            trace( "new buRRRn.ASTUce.TestSuite( test )" )
            suite = new buRRRn.ASTUce.TestSuite( test );
            }
        }
    
    trace( "doRun suite" );
    return runner.doRun( suite );
    }

