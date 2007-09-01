
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

import buRRRn.ASTUce.ITest;
import buRRRn.ASTUce.TestFailure;
import buRRRn.ASTUce.AssertionFailedError;
import buRRRn.ASTUce.ITestListener;
import buRRRn.ASTUce.TestCase;
import buRRRn.ASTUce.IProtectable;

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
class buRRRn.ASTUce.TestResult
    {
    
    private var _failures:Array;
    private var _errors:Array;
    private var _listeners:Array;
    private var _runTests:Number;
    private var _stop:Boolean;
    
    function TestResult()
        {
        _failures  = [];
        _errors    = [];
        _listeners = [];
        _runTests  = 0;
        _stop      = false;
        }
    
    /* Method: addError
       Adds an error to the list of errors.
       
       The passed in exception caused the error.
    */
    function addError( test:ITest, e:Error ):Void
        {
        var i, listeners;
        _errors.push( new TestFailure( test, e ) );
        listeners = cloneListeners();
        for( i=0; i<listeners.length; i++ )
            {
            listeners[i].addError( test, e );
            }
        }
    
    /* Method: addFailure
       Adds a failure to the list of failures.
       
       The passed in exception caused the failure.
    */
    function addFailure( test:ITest, afe:AssertionFailedError ):Void
        {
        var i, listeners;
        _failures.push( new TestFailure( test, afe ) );
        listeners = cloneListeners();
        for( i=0; i<listeners.length; i++ )
            {
            listeners[i].addFailure( test, afe );
            }
        }
    
    /* Method: addListener
       Registers a TestListener.
    */
    function addListener( listener:ITestListener ):Void
        {
        _listeners.push( listener );
        }
    
    /* Method: removeListener
       Unregisters a TestListener.
    */
    function removeListener( listener:ITestListener ):Void
        {
        var index;
        index = _listeners.indexOf( listener );
        if( index > -1 )
            {
            _listeners.splice( index, 1 );
            }
        }
    
    /* Method: cloneListeners
       Returns a copy of the listeners.
    */
    function cloneListeners():Array
        {
        return _listeners.clone(); //core2
        }
    
    /* Method: endTest
       Informs the result that a test was completed.
    */
    function endTest( test:ITest ):Void
        {
        var listeners, i;
        listeners = cloneListeners();
        for( i=0; i<listeners.length; i++ )
            {
            listeners[i].endTest( test );
            }
        }
    
    /* Getter: errorCount
       Gets the number of detected errors.
    */
    function get errorCount():Number
        {
        return _errors.length;
        }
    
    /* Getter: errors
       Returns an Array for the errors.
    */
    function get errors():Array
        {
        return _errors;
        }
    
    /* Getter: failureCount
       Gets the number of detected failures.
    */
    function get failureCount():Number
        {
        return _failures.length;
        }
    
    /* Getter: failures
       Returns an Array for the failures.
    */
    function get failures():Array
        {
        return _failures;
        }
    
    /* Method: run
       Runs a TestCase.
    */
    function run( test:TestCase ):Void
        {
        var p;
        startTest( test );
        
        p = new IProtectable();
        p.protect = function()
            {
            return test.runBare();
            }
        
        runProtected( test, p );
        endTest( test );
        }
    
    /* Method: runProtected
       Runs a TestCase.
    */
    function runProtected( test:ITest, /*Protectable*/ p ):Void
        {
        
        try
            {
            p.protect();
            }
        catch( e )
            {
            if( e instanceof AssertionFailedError )
                {
                addFailure( test, e );
                }
            else if( e instanceof Error )
                {
                addError( test, e );
                }
            }    
        
        }
    
    /* Getter: runCount
       Gets the number of run tests.
    */
    function get runCount():Number
        {
        return _runTests;
        }
    
    /* Getter: shouldStop
       Checks whether the test run should stop.
    */
    function get shouldStop():Boolean
        {
        return _stop;
        }
    
    /* Method: startTest
       Informs the result that a test will be started.
    */
    function startTest( test:ITest ):Void
        {
        var count, listeners, i;
        count = test.countTestCases();
        _runTests += count;
        
        listeners = cloneListeners();
        for( i=0; i<listeners.length; i++ )
            {
            listeners[i].startTest( test );
            }
        }
    
    /* Method: stop
       Marks that the test run should stop.
    */
    function stop():Void
        {
        _stop = true;
        }
    
    /* Method: wasSuccessful
       Returns whether the entire test was successful or not.
    */
    function wasSuccessful():Boolean
        {
        return( (failureCount == 0) && (errorCount == 0) );
        }
    
    }

