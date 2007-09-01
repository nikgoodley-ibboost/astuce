
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

/* Constructor: ArrayTest
   A sample test case, testing Array.
*/
Tests.ASTUce.samples.ArrayTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

Tests.ASTUce.samples.ArrayTest.prototype = new buRRRn.ASTUce.TestCase();
Tests.ASTUce.samples.ArrayTest.prototype.constructor = Tests.ASTUce.samples.ArrayTest;

Tests.ASTUce.samples.ArrayTest.prototype.setUp = function()
    {
    this.empty = new Array();
    this.full  = new Array();
    this.full.push( 0 );
    this.full.push( 1 );
    this.full.push( 2 );
    this.full.push( 3 );
    }

Tests.ASTUce.samples.ArrayTest.prototype.testCapacity = function()
    {
    var size = this.full.length;
    
    for( var i=0; i<100; i++ )
        {
        this.full.push( i );
        }
    
    this.assertTrue( this.full.length, size+100 );
    }

Tests.ASTUce.samples.ArrayTest.prototype.testElementAt = function()
    {
    var i = this.full[0];
    this.assertTrue( i == 0 );
    }

Tests.ASTUce.samples.ArrayTest.prototype.testRemoveAll = function()
    {
    this.full.splice( 0, this.full.length );
    this.assertTrue( this.full.length == 0 );
    }

Tests.ASTUce.samples.ArrayTest.prototype.testRemoveElement = function()
    {
    this.full.splice( 0, 1 );
    this.assertTrue( !this.full.contains( 0 ) );
    }

