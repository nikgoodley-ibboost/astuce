
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

/* Constructor: SimpleTest
   Some simple tests.
   
   ATTENTION:
   this TestCase will generate 4 failures on purpose.
*/
buRRRn.ASTUce.samples.SimpleTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

buRRRn.ASTUce.samples.SimpleTest.prototype = new buRRRn.ASTUce.TestCase();
buRRRn.ASTUce.samples.SimpleTest.prototype.constructor = buRRRn.ASTUce.samples.SimpleTest;

buRRRn.ASTUce.samples.SimpleTest.prototype.setUp = function()
    {
    this.value1 = 2;
    this.value2 = 3;
    }

buRRRn.ASTUce.samples.SimpleTest.prototype.testAdd = function()
    {
    var result = this.value1 + this.value2;
    
    //forced failure
    this.assertTrue( result == 6 );
    
    //passing test
    //this.assertTrue( result == 5 );
    }

buRRRn.ASTUce.samples.SimpleTest.prototype.testDivideByZero = function()
    {
    var zero = 0;
    var result = 8/zero;
    
    //forced failure
    this.assertEquals( 8, result );
    
    //passing test
    //this.assertEquals( 8, Infinity );
    }

buRRRn.ASTUce.samples.SimpleTest.prototype.testEquals = function()
    {
    this.assertEquals( 12, 12 );
    
    var twelve = (12).toString(16);
    this.assertEquals( twelve , "c" );
    
    this.assertEquals( 0x000000000c , 0x000000000c );
    
    //forced failure
    this.assertEquals( 12.0, 11.99, "Capacity" );
    
    //passing test
    //this.assertEquals( 12.0, 12, "Capacity" );
    }

buRRRn.ASTUce.samples.SimpleTest.prototype.testEqualsObject = function()
    {
    var obj1, obj2;
    
    obj1 = {a:1, b:2, c:3};
    obj2 = {a:1, b:2, c:4};
    
    //forced failure
    this.assertEquals( obj1, obj2 );
    }

