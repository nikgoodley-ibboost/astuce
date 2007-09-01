
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
import buRRRn.ASTUce.ComparisonFailure;
import buRRRn.ASTUce.AssertionFailedError;

/* Singleton: Assertion
   A set of assert methods.
   
   Messages are only displayed when an assert fails.
   
   note:
   Assertion is used because Assert is a reserved
   ECMAscript futur keyword.
*/
class buRRRn.ASTUce.Assertion
    {
    
    /* StaticMethod: assertTrue
       Asserts that a condition is true.
       
       If it isn't it throws/trace an <AssertionFailedError> with the given message.
    */
    static function assertTrue( condition:Boolean, message:String ):Void
        {
        if( !condition )
            {
            fail( message );
            }
        }
    
    /* StaticMethod: assertFalse
       Asserts that a condition is false.
       
       If it isn't it throws/trace an <AssertionFailedError>.
    */
    static function assertFalse( condition:Boolean, message:String ):Void
        {
        assertTrue( !condition, message );
        }
    
    /* StaticMethod: assertEquals
       Asserts that two objects are equal.
       
       If they are not an <AssertionFailedError> is thrown/trace with the given message.
    */
    static function assertEquals( expected, actual, message:String ):Void
        {
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
            throw new ComparisonFailure( expected, actual, message );
            }
        else
            {
            _failNotEquals( expected, actual, message );
            }
        }
    
    /* StaticMethod: assertNotNull
       Asserts that an object is not null.
       
       If it is an <AssertionFailedError> is thrown with the given message.
    */
    static function assertNotNull( obj, message:String ):Void
        {
        assertTrue( obj != null, message );
        }
    
    /* StaticMethod: assertNull
       Asserts that an object is null.
       
       If it is not an <AssertionFailedError> is thrown with the given message.
    */
    static function assertNull( obj, message:String ):Void
        {
        assertTrue( obj == null, message );
        }
    
    /* StaticMethod: assertUndefined
       Asserts that an object is undefined.
       
       If it is not an <AssertionFailedError> is thrown with the given message.
    */
    static function assertUndefined( obj, message:String ):Void
        {
        assertTrue( obj == undefined, message );
        }
    
    /* StaticMethod: assertNotUndefined
       Asserts that an object is not undefined.
       
       If it is not an <AssertionFailedError> is thrown with the given message.
    */
    static function assertNotUndefined( obj, message:String ):Void
        {
        assertTrue( obj != undefined, message );
        }
    
    /* StaticMethod: assertSame
       Asserts that two objects refer to the same object.
       
       If they are not an <AssertionFailedError> is thrown with the given message.
       
       note:
       same object mean same reference so the comparison is by reference not by value.
    */
    static function assertSame( expected, actual, message:String ):Void
        {
        if( expected == null )
    		{
    		expected = new NullObject(); //core2
    		}
        
        if( expected.referenceEquals( actual ) ) //core2
            {
            return;
            }
        
        _failNotSame( expected, actual, message );
        }
    
    /* StaticMethod: assertNotSame
       Asserts that two objects refer to the same object.
       
       If they are not an <AssertionFailedError> is thrown with the given message.
    */
    static function assertNotSame( expected, actual, message:String ):Void
        {
        if( expected == null )
    		{
    		expected = new NullObject(); //core2
    		}
    	
        if( expected.referenceEquals( actual ).toBoolean() ) //core2
            {
            _failSame( expected, actual, message );
            }
        }
    
    /* StaticMethod: fail
       Fails a test with the given message.
    */
    static function fail( message:String ):Void
        {
        throw new AssertionFailedError( message );
        }
    
    /* StaticPrivateMethod: _failSame
    */
    static function _failSame( expected, actual, message:String ):Void
        {
        var formatted:String = "";
        if( message != null )
            {
            formatted = message + " ";
            }
        
        fail( String.format( strings.expectedNotSame, formatted ) ); //core2
        }
    
    /* StaticPrivateMethod: _failNotSame
    */
    static function _failNotSame( expected, actual, message:String ):Void
        {
        var formatted:String = "";
        if( message != null )
            {
            formatted= message + " ";
            }
        
        fail( String.format( strings.expectedSame, formatted, expected, actual ) ); //core2
        }
    
    /* StaticPrivateMethod: _failNotEquals
    */
    static function _failNotEquals( expected, actual, message:String ):Void
        {
        if( config.showObjectSource && (expected != null) && (actual != null) )
            {
            expected = expected.toSource(); //core2
            actual   = actual.toSource(); //core2
            }
        
        if( config.invertExpectedActual )
            {
            var tmp  = expected;
            expected = actual;
            actual   = tmp;
            }
        
        fail( format( expected, actual, message ) );
        }
    
    /* StaticMethod: format
    */
    static function format( expected, actual, message:String ):String
        {
        var formatted:String = "";
        if( (message != null) && (message != "") )
            {
            formatted = message + " ";
            }
        
        return( String.format(strings.expectedButWas, formatted, expected, actual ) ); //core2
        }
    
    }

