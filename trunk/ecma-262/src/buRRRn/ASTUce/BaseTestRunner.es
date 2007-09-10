
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




