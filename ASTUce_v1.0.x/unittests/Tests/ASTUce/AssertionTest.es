
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

/* Constructor: AssertionTest
   
   attention:
   In the tests that follow, we can't use
   standard formatting for exception tests:
   
   (code)
   try
       {
       this.somethingThatShouldThrow(); //throw an AssertionFailedError
       }
   catch( e )
       {
       if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return; //ok we catch the error
            }
        }
    this.fail(); //no error catched
   (end)
   
   because fail() would never be reported.
*/
Tests.ASTUce.AssertionTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

Tests.ASTUce.AssertionTest.prototype = new buRRRn.ASTUce.TestCase();
Tests.ASTUce.AssertionTest.prototype.constructor = Tests.ASTUce.AssertionTest;

Tests.ASTUce.AssertionTest.prototype.testFail = function()
    {
    /* attention:
       Also, we are testing fail,
       so we can't rely on fail() working.
       We have to throw the exception manually.
    */
    try
        {
        this.fail();
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_001" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertEquals = function()
    {
    var o = new Object();
    this.assertEquals( o, o );
    this.assertEquals( new Object(), new Object(), "ASSERT_002" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertEqualsNull = function()
    {
    this.assertEquals( null, null, "ASSERT_003" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertStringEquals = function()
    {
    this.assertEquals( "a", "a", "ASSERT_004" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertNullNotEqualsString = function()
    {
    try
        {
        this.assertEquals( null, "foo" );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.ComparisonFailure )
            {
            return;
            }
        }
    this.fail( "ASSERT_005" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertStringNotEqualsNull = function()
    {
    try
        {
        this.assertEquals( "foo", null );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.ComparisonFailure )
            {
            return;
            }
        }
    this.fail( "ASSERT_006" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertNullNotEqualsNull = function()
    {
    try
        {
        this.assertEquals( null, new Object() );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_007" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertNull = function()
    {
    this.assertNull( null );
    
    try
        {
        this.assertNull( new Object() );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_008" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertNotNull = function()
    {
    this.assertNotNull( new Object() );
    
    try
        {
        this.assertNotNull( null );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_009" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertTrue = function()
    {
    this.assertTrue( true );
    
    try
        {
        this.assertTrue( false );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_010" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertFalse = function()
    {
    this.assertFalse( false );
    
    try
        {
        this.assertFalse( true );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_011" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertSame = function()
    {
    var o = new Object();
    this.assertSame( o, o );
    
    try
        {
        this.assertSame( new Number(1), new Number(1) );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_012" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertNotSame = function()
    {
    this.assertNotSame( new Number(1), null );
    this.assertNotSame( null, new Number(1) );
    this.assertNotSame( new Number(1) , new Number(1) );
    
    var obj = new Number(1);
    
    try
        {
        this.assertNotSame(obj, obj);
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_013" );
    }

Tests.ASTUce.AssertionTest.prototype.testAssertNotSameFailsNull = function()
    {
    try
        {
        var assertNotSame = this.assertNotSame( null, null );
        }
    catch( e )
        {
        if( e instanceof buRRRn.ASTUce.AssertionFailedError )
            {
            return;
            }
        }
    this.fail( "ASSERT_014" );
    }

