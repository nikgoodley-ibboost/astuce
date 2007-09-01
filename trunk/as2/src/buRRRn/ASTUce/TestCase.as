
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
import buRRRn.ASTUce.strings;
import buRRRn.ASTUce.TestResult;

/* Constructor: TestCase
   A test case define the fixture to run multiple tests.
   
   To define a test case:
   1 - implement a subclass of "TestCase"
   2 - initialize the fixture state by overriding "setUp"
   3 - clean-up after a test by overridding "tearDown"
   
   Each test runs its own fixture so there can be
   no side effects among test runs.
   
   Here is an example:
   (code)
   Tests.myTest = function( name )
       {
       buRRRn.ASTUce.TestCase.call( this, name );
       }
   Tests.myTest.prototype = new buRRRn.ASTUce.TestCase();
   Tests.myTest.prototype.constructor = Tests.myTest;
   
   Tests.myTest.prototype.setUp = function()
       {
       this.valueA = 2;
       this.valueB = 3;
       }
   (end)
   
   For each test implement a method which interacts with the fixture.
   
   Verify the expected results with one or more assertions.
   
   (code)
   buRRRn.Tests.AllTests.prototype.testAdd = function()
       {
       var result = this.valueA + this.valueB;
       this.assertTrue( result == 5 );
       }
   (end)
   
   Once the methods are defined you can run them.
*/
class buRRRn.ASTUce.TestCase extends buRRRn.ASTUce.Assertion implements buRRRn.ASTUce.ITest
    {
    
    var _name:String;
    
    //Constructs a test case with the given name or null if name is not provided
    function TestCase( name:String )
        {
        _name = name; //the name of the test case
        }
    
    /* Method: countTestCases
       Counts the number of test cases executed by run (TestResult result).
    */
    function countTestCases():Number
        {
        return 1;
        }
    
    /* Method: createResult
       Creates a default TestResult object.
    */
    function createResult():TestResult
        {
        return new TestResult();
        }
    
    /* Method: run
       A convenience method to run this test, collecting the
       results with a default TestResult object.
       
       see: <TestResult>
    */
    function runEmpty():TestResult
        {
        /* collecting the results with a default TestResult object */
        var result:TestResult = createResult();
        
        run( result );
        
        return result;
        }
    
    /* Method: run
       Runs the test case and collects the results in TestResult.
    */
    function run( result:TestResult ):Void
        {
        if( result == null )
            {
            //collecting the results with a default TestResult object
            result = createResult();
            }
        
        result.run( this );
        }
    
    /* Method: runBare
       Runs the bare test sequence.
    */
    function runBare():Void
        {
        
        setUp();
        
        try
            {
            runTest();
            }
        /* attention
           for debugging only !!
        
          catch( e )
            {
            trace( e );
            }*/
        finally
            {
            tearDown();
            }
        
        }
    
    /* Method: runTest
       Override to run the test and assert its state.
    */
    function runTest():Void
        {
        var runMethod;
        
        assertNotNull( _name, strings.methodNameNull );
        assertNotUndefined( _name, strings.methodNameUndef );
        
        try
            {
            if( !hasProperty( _name ) )
                {
                throw new Error();
                }
            
            runMethod = this[_name];
            }
        catch( e )
            {
            fail( String.format( strings.methodNotFound, _name ) ); //core2
            }
        
        if( _name.startsWith( "_" ) && (config.testPrivateMethods != true) ) //core2
            {
            fail( String.format( strings.methodshouldBePublic, _name ) ); //core2
            }
        
        try
            {
            runMethod.call( this );
            }
        catch( e )
            {
            throw e;
            }
        
        }
    
    /* Method: setUp
       Sets up the fixture, for example, open a network connection.
       
       This method is called before a test is executed.
    */
    function setUp():Void
        {
        
        }
    
    /* Method: tearDown
       Tears down the fixture, for example, close a network connection.
       
       This method is called after a test is executed.
    */
    function tearDown():Void
        {
        
        }
    
    /* Method: toString
       Returns a string representation of the test case.
    */
    function toString():String
        {
        var path = GetObjectPath( this["__constructor__"] );
        var className = path.split( "." ).pop();
        return( className + "( " + name + " )" ); //core2
        }
    
    /* Getter: name
       Gets the name of a TestCase.
    */
    function get name():String
        {
        return _name;
        }
    
    /* Setter: name
       Sets the name of a TestCase.
    */
    function set name( value:String ):Void
        {
        _name = value;
        }
    
    }

