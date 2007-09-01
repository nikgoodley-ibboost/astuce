
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
  Portions created by the Initial Developer are Copyright (C) 2004-2005
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

Tests.ASTUce.TestListenerTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    
    this._result       = null;
    this._startCount   = null;
    this._endCount     = null;
    this._failureCount = null;
    this._errorCount   = null;
    }

Tests.ASTUce.TestListenerTest.prototype = new buRRRn.ASTUce.TestCase();
Tests.ASTUce.TestListenerTest.prototype.constructor = Tests.ASTUce.TestListenerTest;

Tests.ASTUce.TestListenerTest.prototype.addError = function( /*ITest*/ test, /*Error*/ e )
    {
    this._errorCount++;
    }

Tests.ASTUce.TestListenerTest.prototype.addFailure = function( /*ITest*/ test, /*AssertionFailedError*/ afe )
    {
    this._failureCount++;
    }

Tests.ASTUce.TestListenerTest.prototype.endTest = function( /*ITest*/ test )
    {
    this._endCount++;
    }

Tests.ASTUce.TestListenerTest.prototype.startTest = function( /*ITest*/ test )
    {
    this._startCount++;
    }

Tests.ASTUce.TestListenerTest.prototype.setUp = function()
    {
    this._result = new buRRRn.ASTUce.TestResult();
    this._result.addListener( this );
    
    this._startCount   = 0;
    this._endCount     = 0;
    this._failureCount = 0;
    this._errorCount   = 0;
    }

Tests.ASTUce.TestListenerTest.prototype.testError = function()
    {
    var test = new buRRRn.ASTUce.TestCase( "noop" );
    
    test.runTest = function()
        {
        this.__e = new Error();
        }
    
    test.run( this._result );
    this.assertEquals( 1, this._errorCount, "TL_001a" );
    this.assertEquals( 1, this._endCount,   "TL_001b" );
    }

Tests.ASTUce.TestListenerTest.prototype.testFailure = function()
    {
    var test = new buRRRn.ASTUce.TestCase( "noop" );
    
    test.runTest = function()
        {
        /*!## TODO:  change the scope ?
                 we don't want to call this.fail from test
                 bu from TestListenerTest
                 self = this;
                 ...
                     {
                     self.fail();
                     }
        */
        this.fail();
        }
    
    test.run( this._result );
    this.assertEquals( 1, this._failureCount, "TL_002a" );
    this.assertEquals( 1, this._endCount,     "TL_002b" );
    }

Tests.ASTUce.TestListenerTest.prototype.testStartStop = function()
    {
    var test = new buRRRn.ASTUce.TestCase("noop");
    
    test.runTest = function()
        {
        
        }
    
    test.run( this._result );
    this.assertEquals( 1, this._startCount, "TL_003a" );
    this.assertEquals( 1, this._endCount,   "TL_003b" );
    }

