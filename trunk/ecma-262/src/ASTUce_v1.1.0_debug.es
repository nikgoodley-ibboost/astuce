
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

var self = this;

if( !self.buRRRn )
    {
    self.buRRRn = {};
    }

if( !buRRRn.ASTUce  )
    {
    /* Singleton: buRRRn.ASTUce
       The ASTUce application.
    */
    buRRRn.ASTUce = {};
    }

/* Property: version
   Contains ASTUce version.
*/
buRRRn.ASTUce.version = "1.1.0." + parseInt( "$Rev: 40 $".split( " " )[1] );


buRRRn.ASTUce.info = function( verbose/*Boolean*/, showConfig/*Boolean*/ )/*String*/
    {
    if( verbose == null )
        {
        verbose = false;
        }
    
    if( showConfig == null )
        {
        showConfig = false;
        }
    
    var separator = "----------------------------------------------------------------";
    var CRLF      = buRRRn.ASTUce.config.CRLF;
    var name      = "ASTUce";
    var fullname  = "ActionScript Test Unit compact edition";
    var copyright = "Copyright © 2004-2007 Zwetan Kjukov, All right reserved.";
    var origin    = "Made in the EU.";
    
    var str = "";
    
    if( !verbose && buRRRn.ASTUce.config.verbose )
        {
        verbose = true;
        }
    
    if( verbose ) {
    str += separator+CRLF;
    str += name+": "+fullname+" v"+this.version+CRLF;
    str += copyright+CRLF;
    str += origin+CRLF;
    str += separator;
    } else {
    str += name+" v"+this.version+CRLF;
    str += separator;
    }
    
    if( showConfig ) {
    str += CRLF+"config:";
    str += buRRRn.eden.serialize( buRRRn.ASTUce.config )+CRLF;
    str += separator;
    }
    
    trace( str );
    }



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

/* Singleton: Assertion
   A set of assert methods.
   
   Messages are only displayed when an assert fails.
   
   note:
   Assertion is used because Assert is a reserved
   ECMAscript futur keyword.
*/
buRRRn.ASTUce.Assertion = {};

/* StaticMethod: assertTrue
   Asserts that a condition is true.
   
   If it isn't it throws/trace an <AssertionFailedError> with the given message.
*/
buRRRn.ASTUce.Assertion.assertTrue = function( /*Boolean*/ condition, /*String*/ message )
    {
    if( !condition )
        {
        this.fail( message );
        }
    }

/* StaticMethod: assertFalse
   Asserts that a condition is false.
   
   If it isn't it throws/trace an <AssertionFailedError>.
*/
buRRRn.ASTUce.Assertion.assertFalse = function( /*Boolean*/ condition, /*String*/ message )
    {
    this.assertTrue( !condition, message );
    }

/* StaticMethod: assertEquals
   Asserts that two objects are equal.
   
   If they are not an <AssertionFailedError> is thrown/trace with the given message.
*/
buRRRn.ASTUce.Assertion.assertEquals = function( expected, actual, /*String*/ message )
    {
    
    if( ((expected == undefined) && (actual != undefined)) ||
        ((expected != undefined) && (actual == undefined)) )
        {
        this._failNotEquals( expected, actual, message );
        }
    
    if( (expected == null) && (actual == null) )
        {
        return;
        }
    
    if( expected == actual )
        {
        return;
        }
    
    //special case: you can't compare NaN with himself
    if( ((typeof expected == "number") && (typeof actual == "number")) &&
        (isNaN(expected) && isNaN(actual)) )
        {
        return;
        }
    
    if( (expected["equals"] != undefined) && expected.equals( actual ) )
        {
        return;
        }
    
    
    if( ((typeof expected == "string") || (expected instanceof String)) &&
        ((typeof actual == "string") || (actual instanceof String)) )
        {
        throw new buRRRn.ASTUce.ComparisonFailure( expected, actual, message );
        }
    else
        {
        this._failNotEquals( expected, actual, message );
        }
    
    
    /*
    if( (expected == null) && (actual == null) )
        {
        return;
        }
    
    if( (expected != null) && expected.equals( actual ) ) //core2
        {
        return;
        }
    
    if( ( GetTypeOf( expected ) == "string" ) || ( GetTypeOf( actual ) == "string" ) ) //core2
        {
        throw new buRRRn.ASTUce.ComparisonFailure( expected, actual, message );
        }
    else
        {
        this._failNotEquals( expected, actual, message );
        }
    */
    }

/* StaticMethod: assertNotNull
   Asserts that an object is not null.
   
   If it is an <AssertionFailedError> is thrown with the given message.
*/
buRRRn.ASTUce.Assertion.assertNotNull = function( obj, /*String*/ message )
    {
    this.assertTrue( obj != null, message );
    }

/* StaticMethod: assertNull
   Asserts that an object is null.
   
   If it is not an <AssertionFailedError> is thrown with the given message.
*/
buRRRn.ASTUce.Assertion.assertNull = function( obj, /*String*/ message )
    {
    this.assertTrue( obj == null, message );
    }

/* StaticMethod: assertUndefined
   Asserts that an object is undefined.
   
   If it is not an <AssertionFailedError> is thrown with the given message.
*/
buRRRn.ASTUce.Assertion.assertUndefined = function( obj, /*String*/ message )
    {
    this.assertTrue( obj == undefined, message );
    }

/* StaticMethod: assertNotUndefined
   Asserts that an object is not undefined.
   
   If it is not an <AssertionFailedError> is thrown with the given message.
*/
buRRRn.ASTUce.Assertion.assertNotUndefined = function( obj, /*String*/ message )
    {
    this.assertTrue( obj != undefined, message );
    }

/* StaticMethod: assertSame
   Asserts that two objects refer to the same object.
   
   If they are not an <AssertionFailedError> is thrown with the given message.
   
   note:
   same object mean same reference so the comparison is by reference not by value.
*/
buRRRn.ASTUce.Assertion.assertSame = function( expected, actual, /*String*/ message )
    {
    if( expected === actual )
		{
		return;
		}
    
    this._failNotSame( expected, actual, message );
    }

/* StaticMethod: assertNotSame
   Asserts that two objects refer to the same object.
   
   If they are not an <AssertionFailedError> is thrown with the given message.
*/
buRRRn.ASTUce.Assertion.assertNotSame = function( expected, actual, /*String*/ message )
    {
    if( expected === actual )
        {
        this._failSame( expected, actual, message );
        }
    }

/* StaticMethod: fail
   Fails a test with the given message.
*/
buRRRn.ASTUce.Assertion.fail = function( /*String*/ message )
    {
    throw new buRRRn.ASTUce.AssertionFailedError( message );
    /*!## patch: for Flash 6 AS1
    this.__e = new buRRRn.ASTUce.AssertionFailedError( message );
    */
    }

/* StaticPrivateMethod: _failSame
*/
buRRRn.ASTUce.Assertion._failSame = function( expected, actual, /*String*/ message )
    {
    var formatted = "";
    if( message != null )
        {
        formatted = message + " ";
        }
    
    this.fail( String.format( buRRRn.ASTUce.strings.expectedNotSame, formatted ) ); //core2
    }

/* StaticPrivateMethod: _failNotSame
*/
buRRRn.ASTUce.Assertion._failNotSame = function( expected, actual, /*String*/ message )
    {
    var formatted= "";
    if( message != null )
        {
        formatted= message + " ";
        }
    
    this.fail( String.format( buRRRn.ASTUce.strings.expectedSame, formatted, expected, actual ) ); //core2
    }

/* StaticPrivateMethod: _failNotEquals
*/
buRRRn.ASTUce.Assertion._failNotEquals = function( expected, actual, /*String*/ message )
    {
    if( buRRRn.ASTUce.showObjectSource && (expected != null) && (actual != null) )
        {
        expected = expected.toSource(); //core2
        actual   = actual.toSource(); //core2
        }
    
    if( buRRRn.ASTUce.invertExpectedActual )
        {
        var tmp  = expected;
        expected = actual;
        actual   = tmp;
        }
    
    this.fail( buRRRn.ASTUce.Assertion.format( expected, actual, message ) );
    }

/* StaticMethod: format
*/
buRRRn.ASTUce.Assertion.format = function( expected, actual, /*String*/ message )
    {
    var formatted = "";
    if( (message != null) && (message != "") )
        {
        formatted = message + " ";
        }
    
    return( String.format( buRRRn.ASTUce.strings.expectedButWas, formatted, expected, actual ) ); //core2
    }


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

/* Constructor: AssertionFailedError
   Thrown when an assertion failed.
*/
buRRRn.ASTUce.AssertionFailedError = function( /*String*/ message )
    {
    /* attention:
       we can not use
       Error.call( this, message );
    */
    this.message = message;
    /*!## TODO: define name property in prototype ? */
    this.name = "AssertionFailedError";
    }

buRRRn.ASTUce.AssertionFailedError.prototype = new Error();
buRRRn.ASTUce.AssertionFailedError.prototype.constructor = buRRRn.ASTUce.AssertionFailedError;


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

/* Constructor: BaseTestRunner
   
*/
buRRRn.ASTUce.BaseTestRunner = function()
    {
    this._suiteMethodName = "suite"; //default
    }

buRRRn.ASTUce.BaseTestRunner.prototype.clearStatus = function()
    {
    
    }

buRRRn.ASTUce.BaseTestRunner.prototype.getTest = function( suiteCtorName/*String*/ )/*ITest*/
    {
    trace( "getTest( \"" + suiteCtorName +"\" )" );
    if( (suiteCtorName == "") || (suiteCtorName == null) )
        {
        trace( "suiteCtorName is empty or null" );
        this.clearStatus();
        return null;
        }
    trace( "suiteCtorName is NOT empty or null" );
    var Reflection = buRRRn.Reflection;
    trace( "alias Reflection" );
    
    try
        {
        if( !Reflection.hasConstructorByName( suiteCtorName ) )
            {
            this.runFailed( "Constructor not found \"" + suiteCtorName + "\"" );
            return null;
            }
        trace( "hasConstructorByName( suiteCtorName )" );
        var ctor = Reflection.getConstructorByName( suiteCtorName );
        trace( "ctor instancied" );
        trace( "ctor: " + ctor );
        }
    catch( e )
        {
        this.runFailed( "Could not load \"" + suiteCtorName + "\"" );
        this.runFailed( "    " + e.toString() );
        return null;
        }
    trace( "no error in ctor instanciation" );
    
    var suiteMethod = Reflection.getMethodByName( ctor, this._suiteMethodName );
    trace( "suiteMethod instancied" );
    trace( "suiteMethod: " + suiteMethod );
    
    if( suiteMethod == null )
        {
        // try to extract a test suite automatically
        trace( "suiteMethod == null" );
        trace( "try to extract a test suite automatically" );
        this.clearStatus();
        return new buRRRn.ASTUce.TestSuite( ctor );
        }
    
    try
        {
        var test = suiteMethod();
        }
    catch( e )
        {
        this.runFailed( "Failed to invoke suite():" + e );
        return null;
        }
    
    this.clearStatus();
    return test;
    }





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

/* Constructor: ComparisonFailure
   Thrown when an assert equals for Strings failed.
*/
buRRRn.ASTUce.ComparisonFailure = function( expected, actual, /*String*/ message )
    {
    buRRRn.ASTUce.AssertionFailedError.call( this, message );
    
    /*!## TODO: define name property in prototype ? */
    this.name     = "ComparisonFailure";
    this.expected = expected;
    this.actual   = actual;
    }

buRRRn.ASTUce.ComparisonFailure.prototype = new buRRRn.ASTUce.AssertionFailedError();
buRRRn.ASTUce.ComparisonFailure.prototype.constructor = buRRRn.ASTUce.ComparisonFailure;

/* Method: getMessage
   Returns "..." in place of common prefix and "..." in
   place of common suffix between expected and actual.
*/
buRRRn.ASTUce.ComparisonFailure.prototype.getMessage = function()
    {
    if( (this.expected == null) || (this.actual == null) )
        {
        return buRRRn.ASTUce.Assertion.format( this.expected, this.actual, this.message );
        }
    
    var expected, actual, end, dots, i, j, k;
    expected = "";
    actual   = "";
    end      = Math.min( this.expected.length, this.actual.length );
    dots     = "...";
    
    for( i=0; i<end; i++ )
        {
        if( this.expected.charAt(i) != this.actual.charAt(i) )
            {
            break;
            }
        }
    
    j = this.expected.length - 1;
    k = this.actual.length - 1;
    
    for( ; k>=i && j>=i; k--,j-- )
        {
        if( this.expected.charAt(j) != this.actual.charAt(k) )
            {
            break;
            }
        }
    
    if( j<i && k<i )
        {
        expected = this.expected;
        actual   = this.actual;
        }
    else
        {
        expected = this.expected.substring( i, j+1 );
        actual   = this.actual.substring(   i, k+1 );
        
        if( i<=end && i>0 )
            {
            expected = dots + expected;
            actual   = dots + actual;
            }
        
        if( j < this.expected.length-1 )
            {
            expected = expected + dots;
            }
        
        if( k < this.actual.length-1 )
            {
            actual = actual + dots;
            }
        }
    
    return buRRRn.ASTUce.Assertion.format( expected, actual, this.message );
    }


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

/* Singleton: config
*/
buRRRn.ASTUce.config = {};

buRRRn.ASTUce.config.CRLF = buRRRn.core2.config.CRLF;

/* StaticProperty: verbose
   Boolean configuring the getInfo method behaviour.
   
   true  - more verbose
   false - less verbose
*/
buRRRn.ASTUce.config.verbose = true;

/* StaticProperty: showConstructorList
   Boolean option to display all the constructors being tested.
   
   true  - show constructors list
   false - don't show constructor list
*/
buRRRn.ASTUce.config.showConstructorList = true;

/* StaticProperty: showObjectSource
   Boolean option to display the source of objects being compared.
   
   true  - show the object source
   false - don't show the source
   
   note:
   It help you to debug to see
   (code)
   ## AssertionFailedError : expected:<{a:1,b:2,c:3}> but was:<{a:1,b:2,c:4}> ##
   (end)
   instead of
   (code)
   ## AssertionFailedError : expected:<[object Object]> but was:<[object Object]> ##
   (end)
*/
buRRRn.ASTUce.config.showObjectSource = true;

/* StaticProperty: invertExpectedActual
   Boolean option to invert the order of the arguments: expected, actual
   in buRRRn.ASTUce.Assertion.
   
   true  - the argument order is: actual, expected. (inverted)
   false - the argument order is: expected, actual. (default)
*/
buRRRn.ASTUce.config.invertExpectedActual = false;


buRRRn.ASTUce.config.testInheritedTests = true;

/* StaticProperty: testPrivateMethods
   Boolean configuring the behaviour of ASTUce regarding private methods.
   
   true  - test private methods
   false - don't test private methods
   
   note:
   By default in ECMAScript all methods are public,
   but by convention we use an underscore before the name
   of a method to indicate its private nature.
   
   ASTUce will not test methods starting with an underscore
   except if you force testPrivateMethods = true, then
   methods as _testSomething will be tested by the framework.
*/
/*!## TODO:
      perharps if needed in the futur we will need
      to provide this parameter per TestCase or TestSuite
      instead of the global actual on/off parameter.
*/
buRRRn.ASTUce.config.testPrivateMethods = false;

/* StaticProperty: testMyself
   Boolean option allowing the ASTUce framework to test itself.
   
   true  - add to tests *buRRRn.Tests.AllTests.suite()*.
   false - add nothing
*/
buRRRn.ASTUce.config.testMyself = false;


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

/* Interface: ITest
*/
buRRRn.ASTUce.ITest = function()
    {
    
    }

/* Method: countTestCases
   Counts the number of test cases that will be run by this test.
*/
buRRRn.ASTUce.ITest.prototype.countTestCases = function()
    {
    
    }

/* Method: run
   Runs a test and collects its result in a TestResult instance.
*/
buRRRn.ASTUce.ITest.prototype.run = function( /*TestResult*/ result )
    {
    
    }


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

/* Interface: ITestListener
   A Listener for test progress.
*/
buRRRn.ASTUce.ITestListener = function()
    {
    
    }

/* Method: addError
   An error occurred.
*/
buRRRn.ASTUce.ITestListener.prototype.addError = function( /*ITest*/ test, /*Error*/ e )
    {
    
    }

/* Method: addFailure
   A failure occurred.
*/
buRRRn.ASTUce.ITestListener.prototype.addFailure = function( /*ITest*/ test, /*AssertionFailedError*/ afe )
    {
    
    }

/* Method: endTest
   A test ended.
*/
buRRRn.ASTUce.ITestListener.prototype.endTest = function( /*ITest*/ test )
    {
    
    }

/* Method: startTest
   A test started.
*/
buRRRn.ASTUce.ITestListener.prototype.startTest = function( /*ITest*/ test )
    {
    
    }


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

/* Constructor: Protectable
   A Protectable can be run and can throw errors.
*/
buRRRn.ASTUce.Protectable = function()
    {
    
    }

/* Method: protect
   Run the the following method protected.
*/
buRRRn.ASTUce.Protectable.prototype.protect = function()
    {
    
    }


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

/* Constructor: ResultPrinter
   (implements ITestListener)
*/
/*!## TODO: FIXME DOCUMENTATION */
buRRRn.ASTUce.ResultPrinter = function( /*String*/ writer )
    {
    this.writer = trace; //default writer from core2
    this.column = 0;

    if( (writer != null) && (typeof writer == "function") ) //core2
        {
        this.writer = writer;
        }
    }

/* Method: writeLine
*/
buRRRn.ASTUce.ResultPrinter.prototype.writeLine = function( /*String*/ message )
    {
    var writer;
    writer = this.getWriter();
    writer( message );
    }

/* Method: print
*/
buRRRn.ASTUce.ResultPrinter.prototype.print = function( /*TestResult*/ result, /*Number*/ runTime )
    {
    this.printHeader( runTime );
    this.printErrors( result );
    this.printFailures( result );
    this.printFooter( result );
    }

/* Method: printHeader
   
   note:
   the runTime parameter can either be a
   Number or a Date.
*/
/*!## TODO: refactor using runTime.valueOf() */
buRRRn.ASTUce.ResultPrinter.prototype.printHeader = function( /*Number*/ runTime )
    {
    this.writeLine( "" );
    this.writeLine( String.format( buRRRn.ASTUce.strings.PrtTime, this.elapsedTimeAsString( runTime ) ) ); //core2
    }

/* Method: printErrors
*/
buRRRn.ASTUce.ResultPrinter.prototype.printErrors = function( /*TestResult*/ result )
    {
    this.printDefects( result.errors(), result.errorCount(), buRRRn.ASTUce.strings.nameError );
    }

/* Method: printFailures
*/
buRRRn.ASTUce.ResultPrinter.prototype.printFailures = function( /*TestResult*/ result )
    {
    this.printDefects( result.failures(), result.failureCount(), buRRRn.ASTUce.strings.nameFailure );
    }

/* Method: printDefects
*/
buRRRn.ASTUce.ResultPrinter.prototype.printDefects = function( /*Array*/ booBoos, /*Int*/ count, /*String*/ type )
    {
    var i;
    
    if( count == 0 )
        {
        return;
        }
    
    if( count == 1 )
        {
        this.writeLine( "" );
        this.writeLine( String.format( buRRRn.ASTUce.strings.PrtOneDefect, count, type ) ); //core2
        }
    else
        {
        this.writeLine( "" );
        this.writeLine( String.format( buRRRn.ASTUce.strings.PrtMoreDefects, count, type ) ); //core2
        }
    
    for( i=0; i<booBoos.length; i++ )
        {
        this.printDefectHeader( booBoos[i], i );
        this.printDefectTrace( booBoos[i] );
        }
    }

/* Method: printDefectHeader
*/
buRRRn.ASTUce.ResultPrinter.prototype.printDefectHeader = function( /*TestFailure*/ booBoo, /*Int*/ count )
    {
    this.writeLine( count + ") " + booBoo.failedTest() );
    }

/* Method: printDefectTrace
*/
buRRRn.ASTUce.ResultPrinter.prototype.printDefectTrace = function( /*TestFailure*/ booBoo )
    {
    /*!## TODO: find a way to have more detais about the code stack */
    //this.writeLine( booBoo.exceptionMessage() ); //short error message
    this.writeLine( booBoo.thrownException() ); //long error message
    this.writeLine( "" );
    }

/* Method: printFooter
*/
buRRRn.ASTUce.ResultPrinter.prototype.printFooter = function( /*TestResult*/ result )
    {
    if( result.wasSuccessful() == true )
        {
        this.writeLine( "" );
        this.writeLine( String.format( buRRRn.ASTUce.strings.PrtOK, result.runCount(), (result.runCount() == 1 ? "": "s") ) ); //core2
        }
    else
        {
        this.writeLine( "" );
        this.writeLine( buRRRn.ASTUce.strings.PrtFailure );
        this.writeLine( String.format( buRRRn.ASTUce.strings.PrtFailureDetails, result.runCount(), result.failureCount(), result.errorCount() ) ); //core2
		}
        this.writeLine( "" );
    }

/* Method: elapsedTimeAsString
*/
buRRRn.ASTUce.ResultPrinter.prototype.elapsedTimeAsString = function( /*Number*/ runTime )
    {
    var dat, ms, s, m, h;
    dat = new Date( runTime.valueOf() );
    
    ms = dat.getUTCMilliseconds();
    s  = dat.getUTCSeconds();
    m  = dat.getUTCMinutes();
    h  = dat.getUTCHours();
    
    return String.format( buRRRn.ASTUce.strings.PrtElapsedTime, h, m, s, ms );
    }

/* Getter: getWriter
*/
buRRRn.ASTUce.ResultPrinter.prototype.getWriter = function()
    {
    return this.writer
    }

/* Method: addError
   see: <ITestListener.prototype.addError>
*/
buRRRn.ASTUce.ResultPrinter.prototype.addError = function( /*ITest*/ test, /*Error*/ e )
    {
    this.writeLine( "E" );
    }

/* Method: addFailure
   see: <ITestListener.addFailure>
*/
buRRRn.ASTUce.ResultPrinter.prototype.addFailure = function( /*ITest*/ test, /*AssertionFailedError*/ afe )
    {
    this.writeLine( "F" );
    }

/* Method: endTest
   see: <ITestListener.endTest>
*/
buRRRn.ASTUce.ResultPrinter.prototype.endTest = function( /*ITest*/ test )
    {
    
    }

/* Method: startTest
   see: <ITestListener.startTest>
*/
buRRRn.ASTUce.ResultPrinter.prototype.startTest = function( /*ITest*/ test )
    {
    
    }


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
    //trace( "buRRRn.ASTUce.info" );
    buRRRn.ASTUce.info( true, true );
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
        throw new Error( "test is null" );
        }
    
    if( (test instanceof String) || (typeof test == "string") )
        {
        suite = runner.getTest( test );
        return runner.doRun( suite );
        }
    
    if( (test instanceof buRRRn.ASTUce.TestCase) || (test instanceof buRRRn.ASTUce.TestSuite) )
        {
        suite = test;
        }
    
    if( (typeof test == "function") || (typeof test == "object") )
        {
        var staticSuite = buRRRn.Reflection.getMethodByName( test, "suite" );
        
        if( staticSuite != null )
            {
            suite = staticSuite();
            }
        else
            {
            suite = new buRRRn.ASTUce.TestSuite( test );
            }
        }
    
    return runner.doRun( suite );
    }


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

if( !buRRRn.ASTUce.samples )
    {
    buRRRn.ASTUce.samples = {};
    }


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

if( !buRRRn.ASTUce.strings )
    {
    /* NameSpace: strings
       Configure the ASTUce framework messages.
       
       attention:
       The framework can test itself only with english messages
       due to the ComparisonFailureTest which compare results to english message.
    */
    buRRRn.ASTUce.strings = {};
    }

buRRRn.ASTUce.strings.separator = "----------------------------------------------------------------";

/* Property: expectedNotSame
   {0}expected not same
*/
buRRRn.ASTUce.strings.expectedNotSame      = "{0}expected not same";

/* Property: expectedSame
   {0}expected same:<{1}> was not:<{2}>
*/
buRRRn.ASTUce.strings.expectedSame         = "{0}expected same:<{1}> was not:<{2}>";

/* Property: expectedButWas
   {0}expected:<{1}> but was:<{2}>
*/
buRRRn.ASTUce.strings.expectedButWas       = "{0}expected:<{1}> but was:<{2}>";

/* Property: methodNameNull
   The method name is null
*/
buRRRn.ASTUce.strings.methodNameNull       = "The method name is null";

/* Property: methodNameUndef
   The method name is undefined
*/
buRRRn.ASTUce.strings.methodNameUndef      = "The method name is undefined";

/* Property: methodNotFound
   Method "{0}" not found
*/
buRRRn.ASTUce.strings.methodNotFound       = "Method \"{0}\" not found";

/* Property: methodshouldBePublic
   Method "{0}" should be public
*/
buRRRn.ASTUce.strings.methodshouldBePublic = "Method \"{0}\" should be public";

/* Property: objectNotCtor
   Object "{0}" is not a constructor
*/
buRRRn.ASTUce.strings.objectNotCtor        = "Object \"{0}\" is not a constructor";

/* Property: ctorNotPublic
   Constructor "{0}" is not public
*/
buRRRn.ASTUce.strings.ctorNotPublic        = "Constructor \"{0}\" is not public";

/* Property: noTestsFound
   No tests found in "{0}"
*/
buRRRn.ASTUce.strings.noTestsFound         = "No tests found in \"{0}\"";

/* Property: argTestDoesNotExist
   the argument "test" does not exist in the objects namespace (check your includes!)
*/
buRRRn.ASTUce.strings.argTestDoesNotExist  = "the argument \"test\" does not exist in the objects namespace (check your includes!)";

/* Property: argTestNotATest
   the argument "test" does not inherit from TestCase or TestSuite
*/
buRRRn.ASTUce.strings.argTestNotATest      = "the argument \"test\" does not inherit from TestCase or TestSuite";

/* Property: testMethNotPublic
   Test method "{0}" isn't public
*/
buRRRn.ASTUce.strings.testMethNotPublic    = "Test method \"{0}\" isn't public";

/* Property: canNotCreateTest
   Cannot instantiate "{0}" test case
*/
buRRRn.ASTUce.strings.canNotCreateTest     = "Cannot instantiate \"{0}\" test case";

/* Property: nameError
   error
*/
buRRRn.ASTUce.strings.nameError            = "error";

/* Property: nameFailure
   failure
*/
buRRRn.ASTUce.strings.nameFailure          = "failure";

/* Property: PrtTime
   Time: {0}
*/
buRRRn.ASTUce.strings.PrtTime              = "Time: {0}";

/* Property: PrtElapsedTime
   {0}h:{1}mn:{2}s:{3}ms
*/
buRRRn.ASTUce.strings.PrtElapsedTime       = "{0}h:{1}mn:{2}s:{3}ms";

/* Property: PrtOneDefect
   There was {0} {1}
*/
buRRRn.ASTUce.strings.PrtOneDefect         = "There was {0} {1}:";

/* Property: PrtMoreDefects
   There were {0} {1}s
*/
buRRRn.ASTUce.strings.PrtMoreDefects       = "There were {0} {1}s:";

/* Property: PrtOK
   OK ({0} test{1})
*/
buRRRn.ASTUce.strings.PrtOK                = "OK ({0} test{1})";

/* Property: PrtFailure
   FAILURES!!!
*/
buRRRn.ASTUce.strings.PrtFailure           = "FAILURES!!!";

/* Property: PrtFailureDetails
   Tests run: {0},  Failures: {1},  Errors: {2}
*/
buRRRn.ASTUce.strings.PrtFailureDetails    = "Tests run: {0},  Failures: {1},  Errors: {2}";


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
buRRRn.ASTUce.TestCase = function( /*String*/ name )
    {
    this._name = name; //the name of the test case
    }

buRRRn.ASTUce.TestCase.prototype = buRRRn.ASTUce.Assertion;
buRRRn.ASTUce.TestCase.prototype.constructor = buRRRn.ASTUce.TestCase;

/* Method: countTestCases
   Counts the number of test cases executed by run (TestResult result).
*/
buRRRn.ASTUce.TestCase.prototype.countTestCases = function()
    {
    return 1;
    }

/* Method: createResult
   Creates a default TestResult object.
*/
buRRRn.ASTUce.TestCase.prototype.createResult = function()
    {
    return new buRRRn.ASTUce.TestResult();
    }

/* Method: run
   Runs the test case and collects the results in TestResult.
*/
buRRRn.ASTUce.TestCase.prototype.run = function( /*TestResult*/ result )
    {
    if( result == null )
        {
        //collecting the results with a default TestResult object
        result = this.createResult();
        }
    
    result.run( this );
    return result;
    }

/* Method: runBare
   Runs the bare test sequence.
*/
buRRRn.ASTUce.TestCase.prototype.runBare = function()
    {
    
    this.setUp();
    
    try
        {
        this.runTest();
        }
    /* attention
       for debugging only !!
    
      catch( e )
        {
        trace( e );
        }*/
    finally
        {
        this.tearDown();
        }
    
    /*!## patch: for Flash 6 AS1
    this.runTest();
    
    this.tearDown();
    
    //we catch Errors here
    if( this.__e != null )
        {
        //trace( this.__e );
        return this.__e;
        }
    */
    
    }

/* Method: runTest
   Override to run the test and assert its state.
*/
buRRRn.ASTUce.TestCase.prototype.runTest = function()
    {
    var runMethod;
    
    this.assertNotNull( this._name, buRRRn.ASTUce.strings.methodNameNull );
    this.assertNotUndefined( this._name, buRRRn.ASTUce.strings.methodNameUndef );
    
    try
        {
        if( !this.hasProperty( this._name ) )
            {
            throw new Error();
            }
        
        runMethod = this[this._name];
        }
    catch( e )
        {
        this.fail( String.format( buRRRn.ASTUce.strings.methodNotFound, this._name ) ); //core2
        }
    
    if( this._name.startsWith( "_" ) && (buRRRn.ASTUce.testPrivateMethods != true) ) //core2
        {
        this.fail( String.format( buRRRn.ASTUce.strings.methodshouldBePublic, this._name ) ); //core2
        }
    
    try
        {
        runMethod.call( this );
        }
    catch( e )
        {
        throw e;
        }
    
    /*!## patch: for Flash 6 AS1
    //here we could early check if an error has already occured
    //if( this.__e != null )
    //  {
    //  return;
    //  }
    
    if( this.hasProperty( this._name ) )
        {
        runMethod = this[this._name];
        }
    else
        {
        this.fail( String.format( buRRRn.ASTUce.strings.methodNotFound, this._name ) );
        return;
        }
    
    if( this._name.startsWith( "_" ) && (buRRRn.ASTUce.testPrivateMethods != true) )
        {
        this.fail( String.format( buRRRn.ASTUce.strings.methodshouldBePublic, this._name ) );
        return;
        }
    
    runMethod.call( this );
    */
    
    }

/* Method: setUp
   Sets up the fixture, for example, open a network connection.
   
   This method is called before a test is executed.
*/
buRRRn.ASTUce.TestCase.prototype.setUp = function()
    {
    
    }

/* Method: tearDown
   Tears down the fixture, for example, close a network connection.
   
   This method is called after a test is executed.
*/
buRRRn.ASTUce.TestCase.prototype.tearDown = function()
    {
    
    }

/* Method: toString
   Returns a string representation of the test case.
*/
buRRRn.ASTUce.TestCase.prototype.toString = function()
    {
    //return( this.getConstructorName() + "( " + this.getName() + " )" ); //core2
    return( buRRRn.Reflection.getConstructorName(this) + "( " + this.getName() + " )" );
    }

/* Getter: getName
   Gets the name of a TestCase.
*/
buRRRn.ASTUce.TestCase.prototype.getName = function()
    {
    if( this._name == undefined )
        {
        //this._name = GetObjectPath( this ); //core2
        this._name = buRRRn.Reflection.getObjectPath( this );
        }
    
    return this._name;
    }

/* Setter: setName
   Sets the name of a TestCase.
*/
buRRRn.ASTUce.TestCase.prototype.setName = function( /*String*/ name )
    {
    this._name = name;
    }


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

/* Constructor: TestFailure
   A TestFailure collects a failed test together with
   the caught exception.
*/
/*!## TODO:
      - refactor some methods to replace them with getter/setter
      - or suppress getter/setter and use ECMAScript natural way of doing things!
*/
buRRRn.ASTUce.TestFailure = function( /*ITest*/ failedTest, /*Error*/ thrownException )
    {
    this._failedTest = failedTest;
    this._thrownException = thrownException;
    }

/* Method: failedTest
   Gets the failed test.
*/
buRRRn.ASTUce.TestFailure.prototype.failedTest = function()
    {
    return this._failedTest;
    }

/* Method: thrownException
   Gets the thrown exception.
*/
buRRRn.ASTUce.TestFailure.prototype.thrownException = function()
    {
    return this._thrownException;
    }

/* Method: exceptionMessage
*/
buRRRn.ASTUce.TestFailure.prototype.exceptionMessage = function()
    {
    return this.thrownException().getMessage();
    }

/* Method: isFailure
   Returns a Boolean indicating if the
   failure was an AssertionFailedError.
*/
buRRRn.ASTUce.TestFailure.prototype.isFailure = function()
    {
    return( this.thrownException() instanceof buRRRn.ASTUce.AssertionFailedError );
    }

/* Method: toString
   Returns a short description of the failure.
*/
buRRRn.ASTUce.TestFailure.prototype.toString = function()
    {
    return( this.failedTest() + ": " + this.exceptionMessage() );
    }

/* Method: trace
*/
/*!## TODO: remove useless method ? */
buRRRn.ASTUce.TestFailure.prototype.trace = function()
    {
    trace( this.toSource() ); //core2
    }


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

/* Constructor: TestResult
   A TestResult collects the results of executing a test case.
   
   It is an instance of the Collecting Parameter pattern.
   
   The test framework distinguishes between failures and errors.
   
   A failure is anticipated and checked for with assertions.
   
   Errors are unanticipated problems like an ArrayIndexOutOfBoundsException.
*/
/*!## TODO:
      - refactor some methods to replace them with getter/setter
      - or suppress getter/setter and use ECMAScript natural way of doing things!
      - check the array copy/clone , beware of reference copy!
*/
buRRRn.ASTUce.TestResult = function()
    {
    this._failures  = [];
    this._errors    = [];
    this._listeners = [];
    this._runTests  = 0;
    this._stop      = false;
    }

/* Method: addError
   Adds an error to the list of errors.
   
   The passed in exception caused the error.
*/
buRRRn.ASTUce.TestResult.prototype.addError = function( /*ITest*/ test, /*Error*/ e )
    {
    var i, listeners;
    this._errors.push( new buRRRn.ASTUce.TestFailure( test, e ) );
    listeners = this.cloneListeners();
    for( i=0; i<listeners.length; i++ )
        {
        listeners[i].addError( test, e );
        }
    }

/* Method: addFailure
   Adds a failure to the list of failures.
   
   The passed in exception caused the failure.
*/
buRRRn.ASTUce.TestResult.prototype.addFailure = function( /*ITest*/ test, /*AssertionFailedError*/ afe )
    {
    var i, listeners;
    this._failures.push( new buRRRn.ASTUce.TestFailure( test, afe ) );
    listeners = this.cloneListeners();
    for( i=0; i<listeners.length; i++ )
        {
        listeners[i].addFailure( test, afe );
        }
    }

/* Method: addListener
   Registers a TestListener.
*/
buRRRn.ASTUce.TestResult.prototype.addListener = function( /*TestListener*/ listener )
    {
    this._listeners.push( listener );
    }

/* Method: removeListener
   Unregisters a TestListener.
*/
buRRRn.ASTUce.TestResult.prototype.removeListener = function( /*TestListener*/ listener )
    {
    var index;
    index = this._listeners.indexOf( listener );
    if( index > -1 )
        {
        this._listeners.splice( index, 1 );
        }
    }

/* Method: cloneListeners
   Returns a copy of the listeners.
*/
buRRRn.ASTUce.TestResult.prototype.cloneListeners = function()
    {
    return this._listeners.clone(); //core2
    }

/* Method: endTest
   Informs the result that a test was completed.
*/
buRRRn.ASTUce.TestResult.prototype.endTest = function( /*ITest*/ test )
    {
    var listeners, i;
    listeners = this.cloneListeners();
    for( i=0; i<listeners.length; i++ )
        {
        listeners[i].endTest( test );
        }
    }

/* Method: errorCount
   Gets the number of detected errors.
*/
buRRRn.ASTUce.TestResult.prototype.errorCount = function()
    {
    return this._errors.length;
    }

/* Method: errors
   Returns an Array for the errors.
*/
buRRRn.ASTUce.TestResult.prototype.errors = function()
    {
    return this._errors;
    }

/* Method: failureCount
   Gets the number of detected failures.
*/
buRRRn.ASTUce.TestResult.prototype.failureCount = function()
    {
    return this._failures.length;
    }

/* Method: failures
   Returns an Array for the failures.
*/
buRRRn.ASTUce.TestResult.prototype.failures = function()
    {
    return this._failures;
    }

/* Method: run
   Runs a TestCase.
*/
buRRRn.ASTUce.TestResult.prototype.run = function( /*TestCase*/ test )
    {
    var p;
    this.startTest( test );
    
    p = new buRRRn.ASTUce.Protectable();
    p.protect = function()
        {
        return test.runBare();
        }
    
    this.runProtected( test, p );
    this.endTest( test );
    }

/* Method: runProtected
   Runs a TestCase.
*/
buRRRn.ASTUce.TestResult.prototype.runProtected = function( /*ITest*/ test, /*Protectable*/ p )
    {
    
    try
        {
        p.protect();
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            this.addFailure( test, e );
            }
        else if( e instanceof Error )
            {
            this.addError( test, e );
            }
        }    
    
    /*!## patch: for Flash 6 AS1
    var e;
    e = p.protect();
    
    if( e instanceof buRRRn.ASTUce.AssertionFailedError )
        {
        this.addFailure( test, e );
        }
    else if( e instanceof Error )
        {
        this.addError( test, e );
        }
    */
    }

/* method: runCount
   Gets the number of run tests.
*/
buRRRn.ASTUce.TestResult.prototype.runCount = function()
    {
    return this._runTests;
    }

/* Method: shouldStop
   Checks whether the test run should stop.
*/
buRRRn.ASTUce.TestResult.prototype.shouldStop = function()
    {
    return this._stop;
    }

/* Method: startTest
   Informs the result that a test will be started.
*/
buRRRn.ASTUce.TestResult.prototype.startTest = function( /*ITest*/ test )
    {
    var count, listeners, i;
    count = test.countTestCases();
    this._runTests += count;
    
    listeners = this.cloneListeners();
    for( i=0; i<listeners.length; i++ )
        {
        listeners[i].startTest( test );
        }
    }

/* Method: stop
   Marks that the test run should stop.
*/
buRRRn.ASTUce.TestResult.prototype.stop = function()
    {
    this._stop = true;
    }

/* Method: wasSuccessful
   Returns whether the entire test was successful or not.
*/
buRRRn.ASTUce.TestResult.prototype.wasSuccessful = function()
    {
    return( (this.failureCount() == 0) && (this.errorCount() == 0) );
    }


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
buRRRn.ASTUce.TestSuite = function( theConstructor, name/*String*/, simpleTrace/*Boolean*/ )
    {
    if( simpleTrace == null )
        {
        simpleTrace = false;
        }
    
    this.simpleTrace = simpleTrace;
    this._tests       = [];
    this._name        = "Unknown";
    
    if( (name != "") && (name != null) )
        {
        this._name = name;
        }
    
    //Constructs an empty TestSuite
    if( theConstructor == null )
        {
        return;
        }
    
    var strings    = buRRRn.ASTUce.strings;
    var config     = buRRRn.ASTUce.config;
    var Reflection = buRRRn.Reflection;
    
    //theConstructor is a string
    if( Reflection.getTypeOf( theConstructor ) == "string" )
        {
        try
            {
            var originalCtor = theConstructor;
            theConstructor = Reflection.getConstructorByName( theConstructor );
            }
        catch( e )
            {
            //this.addTest( this._warning( e.toString() ) );
            this.setName( originalCtor );
            return;
            }
        }
    
    if( theConstructor.prototype == null )
        {
        this.addTest( this._warning( String.format( strings.objectNotCtor, Reflection.getObjectPath( theConstructor ) ) ) ); //core2
        return;
        }
    
    var ctorName = Reflection.getObjectPath( theConstructor );
    
    /* attention:
       Due to ECMAscript limitation all custom constructors
       are public, but by convention constructors starting
       with "_" are considered private.
    */
    if( ctorName.startsWith( "_" ) ) //core2
        {
        this.addTest( this._warning( String.format( strings.ctorNotPublic, ctorName ) ) );
        return;
        }
    
    if( name == null )
        {
        this.setName( ctorName );
        }
    else
        {
        this.setName( name );
        }
    
    var methods = Reflection.getConstructorMethods( theConstructor, config.testInheritedTests );
    
    for( var i=0; i<methods.length; i++ )
        {
        this._addTestMethod( methods[i], theConstructor );
        }
    
    
    if( this.testCount() == 0 )
        {
        this.addTest( this._warning( String.format( strings.noTestsFound, ctorName ) ) ); //core2
        }
    
    }

/* Method: addTest
   Adds a test to the suite.
*/
buRRRn.ASTUce.TestSuite.prototype.addTest = function( /*ITest*/ test )
    {
    /* attention:
       If you try to test something that has not been included
       then off course you obtain a warning.
    */
    if( test === undefined )
        {
        this.addTest( this._warning( buRRRn.ASTUce.strings.argTestDoesNotExist ) );
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
    if( (test instanceof buRRRn.ASTUce.TestCase) || (test instanceof buRRRn.ASTUce.TestSuite) )
        {
        this._tests.push( test );
        }
    else
        {
        this.addTest( this._warning( buRRRn.ASTUce.strings.argTestNotATest ) );
        }
    }

/* Method: addTestSuite
   Adds the tests from the given constructor to the suite.
*/
buRRRn.ASTUce.TestSuite.prototype.addTestSuite = function( /*Object*/ testConstructor )
    {
    this.addTest( new buRRRn.ASTUce.TestSuite( testConstructor ) );
    }

/* PrivateMethod - _addTestMethod
*/
buRRRn.ASTUce.TestSuite.prototype._addTestMethod = function( /*String*/ method, /*Object*/ theConstructor )
    {
    var test;
    if( !this._isTestMethod( method ) )
        {
        return;
        }

    if( !this._isPublicTestMethod( method ) && (buRRRn.ASTUce.testPrivateMethods != true) )
        {
        this.addTest( this._warning( String.format( buRRRn.ASTUce.strings.testMethNotPublic, method ) ) ); //core2
        return;
        }
    
    this.addTest( buRRRn.ASTUce.TestSuite.createTest( theConstructor, method ) );
    }

/* StaticMethod: createTest
*/
buRRRn.ASTUce.TestSuite.createTest = function( /*Object*/ theConstructor, /*String*/ name )
    {
    var test;
    //trace( "createTest( obj, " + name + " )" );
    if( theConstructor == null )
        {
        return( this._warning( String.format( buRRRn.ASTUce.strings.canNotCreateTest, name ) ) );
        }
    
    if( theConstructor.prototype == null )
        {
        this.addTest( this._warning( String.format( buRRRn.ASTUce.strings.objectNotCtor, buRRRn.Reflection.getObjectPath( theConstructor ) ) ) );
        return;
        }
    
    /*!## TODO: add error checking if path could not be found ? */
    var path = buRRRn.Reflection.getObjectPath( theConstructor ); //core2
    
    /* attention:
       Dynamic instanciation hack using ECMAscript eval().
       
       Should work with any ECMA-262 hosts.
    */
    /*!## TODO: use EDEN for dynamic instanciaion ? */
    //var test = eval( "new "+path+"( \""+name+"\" )" );
    var tmp  = eval( path );
    var test = new tmp( name );
    
    return test;
    }

/* Method: countTestCases
   Counts the number of test cases that will be run by this test.
*/
buRRRn.ASTUce.TestSuite.prototype.countTestCases = function()
    {
    var count, tests, i;
    count = 0;
    tests = this.tests();
    
    for( i=0; i<tests.length; i++ )
        {
        count += tests[i].countTestCases();
        }
    
    return count;
    }

/* PrivateMethod - _isPublicTestMethod
*/
buRRRn.ASTUce.TestSuite.prototype._isPublicTestMethod = function( /*String*/ method )
    {
    return( this._isTestMethod( method ) && !method.startsWith( "_" ) ); //core2
    }

/* PrivateMethod - _isTestMethod
*/
buRRRn.ASTUce.TestSuite.prototype._isTestMethod = function( /*String*/ method )
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
buRRRn.ASTUce.TestSuite.prototype.run = function( /*TestResult*/ result )
    {
    var test, tests, i;
    tests = this.tests();
    
    for( i=0; i< tests.length; i++ )
        {
        if( result.shouldStop() )
            {
            break;
            }
        
        test = tests[i];
        this.runTest( test, result );
        }
    }

/* Method: runTest
*/
buRRRn.ASTUce.TestSuite.prototype.runTest = function( /*ITest*/ test, /*TestResult*/ result )
    {
    test.run( result );
    }

/* Method: testAt
   Returns the test at the given index.
*/
buRRRn.ASTUce.TestSuite.prototype.testAt = function( /*Int*/ index )
    {
    return this._tests[index];
    }

/* Method: testCount
   Returns the number of tests in this suite.
*/
buRRRn.ASTUce.TestSuite.prototype.testCount = function()
    {
    return this._tests.length;
    }


/* Method: tests
   Returns the tests as an Array.
*/
buRRRn.ASTUce.TestSuite.prototype.tests = function()
    {
    return this._tests;
    }

/* Method: toString
*/
buRRRn.ASTUce.TestSuite.prototype.toString = function( /*int*/ increment )
    {
    var str, CRLF, TAB, SPC, i, j, tests, count;
    str   = "";
    CRLF  = buRRRn.ASTUce.config.CRLF;
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
    
    tests = this.tests();
    count = this.testCount();
    str  += this.getName();
    if( count > 0 )
        {
        str += CRLF + TAB + "{" + CRLF;
        if( this.simpleTrace )
            {
            str += TAB + this.countTestCases() + " Tests ..." + CRLF;
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

/* Setter: setName
   Sets the name of the suite.
*/
buRRRn.ASTUce.TestSuite.prototype.setName = function( /*String*/ name )
    {
    this._name = name;
    }

/* Getter: getName
   Returns the name of the suite.
   Not all test suites have a name and this method can return null.
*/
buRRRn.ASTUce.TestSuite.prototype.getName = function()
    {
    if( this._name == undefined )
        {
        this._name = buRRRn.Reflection.getConstructorPath( this ); //core2
        }
    
    return this._name;
    }

/* PrivateMethod - _warning
   Returns a test which will fail and log a warning message.
*/
buRRRn.ASTUce.TestSuite.prototype._warning = function( /*String*/ message )
    {
    var TC;
    TC = new buRRRn.ASTUce.TestCase( "warning" );
    TC.runTest = function()
        {
        this.fail( message );
        }
    
    return TC;
    }


