
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
import buRRRn.ASTUce.ITest;
import buRRRn.ASTUce.TestCase;
import buRRRn.ASTUce.TestResult;
import buRRRn.ASTUce.AssertionFailedError;

/* Constructor: TestSuite
   A TestSuite is a Composite of Tests (implements ITest).
   
   It runs a collection of test cases.
   
   all the arguments are .
   
   theConstructor - optionnal, can be either an object
                    or a string, if a string he takes precedence over
                    the name argument.
   
   name           - optionnal, the name of the test suite.
   
   simpleTrace    - optionnal, allows you to reduce the
                    amount of tracing in the output to 1 line.
*/
class buRRRn.ASTUce.TestSuite implements buRRRn.ASTUce.ITest
    {
    var _tests:Array;
    var _name:String;
    
    var simpleTrace:Boolean;
    
    function TestSuite( theConstructor, name:String, simpleTrace:Boolean )
        {
        var ctorName, member;
        
        if( simpleTrace == null )
            {
            simpleTrace = false;
            }
        
        this.simpleTrace = simpleTrace;
        this._tests      = [];
        this._name       = "Unknown";
        
        //Constructs an empty TestSuite
        if( (theConstructor == null) && (name == null) )
            {
            return;
            }
        
        //theConstructor is a string
        if( GetTypeOf( theConstructor ) == "string" )
            {
            _name = theConstructor;
            return;
            }
        
        if( theConstructor.prototype == null )
            {
            addTest( _warning( String.format( strings.objectNotCtor, GetObjectPath( theConstructor ) ) ) ); //core2
            return;
            }
        else
            {
            //var ctorTemp = new theConstructor();
            //ctorName = ctorTemp.getConstructorName();
            //ctorName = GetObjectPath( theConstructor );
            
            var ctorPath = GetObjectPath( new Object(theConstructor) );
            ctorPath = ctorPath.split( "." );
            ctorName = ctorPath.pop();
            //ctorName = theConstructor.prototype.getConstructorName(); //core2
            //trace( "ctorName = " + ctorName );
            //trace( GetObjectPath( theConstructor ) );
            }
        
        /* attention:
           Due to ECMAscript limitation all custom constructors
           are public, but by convention constructors starting
           with "_" are considered private.
        */
        if( ctorName.startsWith( "_" ) ) //core2
            {
            addTest( _warning( String.format( strings.ctorNotPublic, ctorName ) ) );
            return;
            }
        
        if( name == null )
            {
            _name = ctorName;
            }
        else
            {
            _name = name;
            }
        
        /* attention:
           by default every AS2 class has its prototype flag DONTENUM
           set to true, so we set it to false to allow properties enumeration.
        */
        
        var originalAttribute = Attribute.getAttribute( theConstructor.prototype, null );
        Attribute.setAttribute( theConstructor.prototype, null, AttributeType.none, AttributeType.locked );
        
        if(  config.testInheritedTests &&
            (theConstructor.prototype.__proto__ != buRRRn.ASTUce.TestCase.prototype) &&
            (theConstructor.prototype.__proto__ != Object.prototype) &&
            (theConstructor.prototype.__proto__ != null) )
            {
            var parentAttribute = Attribute.getAttribute( theConstructor.prototype.__proto__, null );
            Attribute.setAttribute( theConstructor.prototype.__proto__, null, AttributeType.none, AttributeType.locked );
            }
        
        for( member in theConstructor.prototype )
            {
            /* attention:
               if we use
               if( theConstructor.prototype.hasOwnProperty( member ) )
               we can't inherits testCase
            */
            if( typeof( theConstructor.prototype[member] ) == "function" )
                {
                //trace( "MEMBER = " + member );
                _addTestMethod( member, theConstructor );
                }
            }
        
        //trace( Object.prototype.toSource.call( theConstructor.prototype, 0 ) );
        Attribute.setAttribute( theConstructor.prototype, null, originalAttribute, originalAttribute );
        
        if( config.testInheritedTests && (parentAttribute != undefined) )
            {
            Attribute.setAttribute( theConstructor.prototype.__proto__, null, parentAttribute, parentAttribute );
            }
        
        if( testCount == 0 )
            {
            addTest( _warning( String.format( strings.noTestsFound, ctorName ) ) ); //core2
            }
        
        }
    
    /* Method: addTest
       Adds a test to the suite.
    */
    function addTest( test:ITest ):Void
        {
        /* attention:
           If you try to test something that has not been included
           then off course you obtain a warning.
        */
        if( test === undefined )
            {
            addTest( _warning( strings.argTestDoesNotExist ) );
            return;
            }
        
        /* note:
           as we don't have native interface in ECMAScript
           we can't test if a particular object implements an interface,
           but we can test if a constructor inherits from another constructor.
           
           Here the design choice is to check if the argument "test" inherits
           from TestCase or from TestSuite, the only constructors
           "virtually implementing" ITest.
        */
        /*!## TODO: check if instanceof ITest work for AS2 */
        if( (test instanceof buRRRn.ASTUce.TestCase) || (test instanceof buRRRn.ASTUce.TestSuite) )
            {
            _tests.push( test );
            }
        else
            {
            addTest( _warning( strings.argTestNotATest ) );
            }
        }
    
    /* Method: addTestSuite
       Adds the tests from the given constructor to the suite.
    */
    function addTestSuite( testConstructor ):Void
        {
        addTest( new TestSuite( testConstructor ) );
        }
    
    /* PrivateMethod - _addTestMethod
    */
    function _addTestMethod( method:String, theConstructor ):Void
        {
        var test;
        if( !_isTestMethod( method ) )
            {
            return;
            }
    
        if( !_isPublicTestMethod( method ) && (config.testPrivateMethods != true) )
            {
            addTest( _warning( String.format( strings.testMethNotPublic, method ) ) ); //core2
            return;
            }
        
        //addTest( buRRRn.ASTUce.TestSuite.createTest( theConstructor, method ) );
        addTest( createTest( theConstructor, method ) );
        }
    
    /* StaticMethod: createTest
    */
    static function createTest( theConstructor, name:String ):ITest
        {
        var test;
        
        if( theConstructor == null )
            {
            return( _warning( String.format( strings.canNotCreateTest, name ) ) );
            }
        
        if( theConstructor.prototype == null )
            {
            return( _warning( String.format( strings.objectNotCtor, GetObjectPath( theConstructor ) ) ) );
            }
        
        /*!## TODO: add error checking if path could not be found ? */
        var path = GetObjectPath( theConstructor ); //core2
        //trace( "path = " + path );
        
        /* attention:
           Dynamic instanciation hack using ECMAscript eval().
           
           Should work with any ECMA-262 hosts.
        */
        /*!## TODO: use EDEN for dynamic instanciaion ? */
        //var test = eval( "new "+path+"( \""+name+"\" )" );
        var tmp  = eval( path );
        var test = new tmp( name );
        
        /*!## TODO:
              use try/catch statement ?
              ex:
        try
            {
            var tmp  = eval( path );
            var test = new tmp( name );
            
            if( ITest(test) == null )
                {
                return( _warning( "Object " + test.getConstructorName() + " does not implements ITest interface" ) );
                }
            
            }
        catch( e )
            {
            return( _warning( "Cannot instantiate test case: " + name ) );
            }
        */
        
        return test;
        }
    
    /* Method: countTestCases
       Counts the number of test cases that will be run by this test.
    */
    function countTestCases():Number
        {
        var count, i;
        count = 0;
        
        for( i=0; i<tests.length; i++ )
            {
            count += tests[i].countTestCases();
            }
        
        return count;
        }
    
    /* PrivateMethod - _isPublicTestMethod
    */
    function _isPublicTestMethod( method:String ):Boolean
        {
        return( _isTestMethod( method ) && !method.startsWith( "_" ) ); //core2
        }
    
    /* PrivateMethod - _isTestMethod
    */
    function _isTestMethod( method:String ):Boolean
        {
        /* attention:
           some differences with Junit here,
           we do not differenciate "Test" and "test"
           and also by convention "_Test" and "_test"
           are considered valid private test methods.
        */
        method = method.toLowerCase();
        return( method.startsWith( "test" ) || method.startsWith( "_test" ) ); //core2
        }
    
    /* Method: run
       Runs the tests and collects their result in a TestResult.
    */
    function run( result:TestResult ):Void
        {
        var test, i;
        
        for( i=0; i< tests.length; i++ )
            {
            if( result.shouldStop() )
                {
                break;
                }
            
            test = tests[i];
            runTest( test, result );
            }
        }
    
    /* Method: runTest
    */
    function runTest( test:ITest, result:TestResult ):Void
        {
        test.run( result );
        }
    
    /* Method: testAt
       Returns the test at the given index.
    */
    function testAt( /*Int*/ index:Number ):ITest
        {
        return _tests[index];
        }
    
    /* Getter: testCount
       Returns the number of tests in this suite.
    */
    function get testCount():Number
        {
        return _tests.length;
        }
    
    /* Getter: tests
       Returns the tests as an Array.
    */
    function get tests():Array
        {
        return _tests;
        }
    
    /* Method: toString
    */
    function toString( /*int*/ increment:Number ):String
        {
        var str, CRLF, TAB, SPC, i, j, count;
        str   = "";
        CRLF  = "\n";
        TAB   = "\t";
        SPC   = TAB;
        
        if( increment == null )
            {
            increment = 0;
            }
        else
            {
            for( j=0; j<increment; j++ )
                {
                SPC += TAB;
                }
            
            TAB = SPC;
            }
        
        count = testCount;
        str  += name;
        if( count > 0 )
            {
            str += CRLF + TAB + "{" + CRLF;
            if( simpleTrace )
                {
                str += TAB + countTestCases() + " Tests ..." + CRLF;
                }
            else
                {
                for( i=0; i<count; i++ )
                    {
                    if( tests[i] instanceof buRRRn.ASTUce.TestSuite )
                        {
                        increment++;
                        }
                    
                    str += TAB + tests[i].toString( increment ) + CRLF;
                    
                    if( tests[i] instanceof buRRRn.ASTUce.TestSuite )
                        {
                        increment--;
                        }
                    }
                }
            str += TAB + "}";
            }
        return str;
        }
    
    /* Setter: name
       Sets the name of the suite.
    */
    function set name( value:String ):Void
        {
        _name = value;
        }
    
    /* Getter: name
       Returns the name of the suite.
       
       Not all test suites have a name and this method can return null.
    */
    function get name():String
        {
        /*if( _name == undefined )
            {
            trace( "name is undefined (suite)" );
            _name = GetObjectPath( this ); //core2
            trace( "name = " + _name );
            }
        */
        return _name;
        }
    
    /* PrivateMethod - _warning
       Returns a test which will fail and log a warning message.
    */
    private static function _warning( message:String ):ITest
        {
        //trace( "_warning : " + message );
        var TC:TestCase = new TestCase( "warning" );
        TC.runTest = function()
            {
            /* ATTN:
               don't use this.fail() the error is not thrown in AS2
            */
            //this.fail( message );
            throw new AssertionFailedError( message );
            }
        
        return TC;
        }
    
    }

