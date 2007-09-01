
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

Tests.ASTUce.samples.MoneyTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

Tests.ASTUce.samples.MoneyTest.prototype = new buRRRn.ASTUce.TestCase();
Tests.ASTUce.samples.MoneyTest.prototype.constructor = Tests.ASTUce.samples.MoneyTest;

Tests.ASTUce.samples.MoneyTest.prototype.setUp = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    this.f12CHF = new Money( 12, "CHF" );
    this.f14CHF = new Money( 14, "CHF" );
    this.f7USD  = new Money(  7, "USD" );
    this.f21USD = new Money( 21, "USD" );
    
    this.fMB1= MoneyBag.create( this.f12CHF, this.f7USD );
    this.fMB2= MoneyBag.create( this.f14CHF, this.f21USD );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testBagMultiply = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    // {[12 CHF][7 USD]} *2 == {[24 CHF][14 USD]}
    var expected = MoneyBag.create( new Money( 24, "CHF" ), new Money( 14, "USD" ) );
    
    this.assertEquals( expected, this.fMB1.multiply(2) ); 
    this.assertEquals( this.fMB1, this.fMB1.multiply(1) );
    this.assertTrue( this.fMB1.multiply(0).isZero() );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testBagNegate = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    // {[12 CHF][7 USD]} negate == {[-12 CHF][-7 USD]}
    var expected = MoneyBag.create( new Money(-12, "CHF"), new Money(-7, "USD") );
    this.assertEquals( expected, this.fMB1.negate() );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testBagSimplePlus = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    // {[12 CHF][7 USD]} + [14 CHF] == {[26 CHF][7 USD]}
    var expected = MoneyBag.create( new Money(26, "CHF"), new Money(7, "USD") );
    this.assertEquals( expected, this.fMB1.plus(this.f14CHF) );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testBagMinus = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    // {[12 CHF][7 USD]} - {[14 CHF][21 USD] == {[-2 CHF][-14 USD]}
    var expected = MoneyBag.create( new Money(-2, "CHF"), new Money(-14, "USD") );
    this.assertEquals( expected, this.fMB1.minus(this.fMB2) );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testBagSumPlus = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    // {[12 CHF][7 USD]} + {[14 CHF][21 USD]} == {[26 CHF][28 USD]}
    var expected = MoneyBag.create( new Money(26, "CHF"), new Money(28, "USD") );
    this.assertEquals( expected, this.fMB1.plus(this.fMB2) );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testIsZero = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    var selfSubstraction = this.fMB1.minus( this.fMB1 );
    
    this.assertTrue( selfSubstraction.isZero() ); 
    this.assertTrue( MoneyBag.create(new Money (0, "CHF"), new Money (0, "USD")).isZero() );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testMixedSimplePlus = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    // [12 CHF] + [7 USD] == {[12 CHF][7 USD]}
    var expected = MoneyBag.create( this.f12CHF, this.f7USD );
    this.assertEquals( expected, this.f12CHF.plus( this.f7USD ) );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testBagNotEquals = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    var bag = MoneyBag.create( this.f12CHF, this.f7USD );
    this.assertFalse( bag.equals( new Money(12, "DEM").plus(this.f7USD) ) );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testMoneyBagEquals = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    this.assertTrue( !this.fMB1.equals( null ) ); 
    this.assertEquals( this.fMB1, this.fMB1 );
    
    var equal = MoneyBag.create( new Money(12, "CHF"), new Money(7, "USD") );
    this.assertTrue( this.fMB1.equals( equal ) );
    this.assertTrue( !this.fMB1.equals( this.f12CHF ) );
    this.assertTrue( !this.f12CHF.equals( this.fMB1 ) );
    this.assertTrue( !this.fMB1.equals( this.fMB2 ) );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testMoneyEquals = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    this.assertTrue( !this.f12CHF.equals(null) ); 
    
    var equalMoney = new Money(12, "CHF");
    this.assertEquals( this.f12CHF, this.f12CHF );
    this.assertEquals( this.f12CHF, equalMoney );
    this.assertTrue( !this.f12CHF.equals( this.f14CHF ) );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testSimplify = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    var m = MoneyBag.create( new Money(26, "CHF"), new Money(28, "CHF") );
    this.assertEquals( new Money(54, "CHF"), m );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testNormalize2 = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    // {[12 CHF][7 USD]} - [12 CHF] == [7 USD]
    var expected = new Money(7, "USD");
    this.assertEquals( expected, this.fMB1.minus(this.f12CHF) );
    }

Tests.ASTUce.samples.MoneyTest.prototype.testNormalize3 = function()
    {
    var Money, MoneyBag;
    Money    = buRRRn.ASTUce.samples.Money;
    MoneyBag = buRRRn.ASTUce.samples.MoneyBag;
    
    // {[12 CHF][7 USD]} - {[12 CHF][3 USD]} == [4 USD]
    var ms1 = MoneyBag.create( new Money(12, "CHF"), new Money(3, "USD") );
    var expected = new Money(4, "USD");
    
    this.assertEquals( expected, this.fMB1.minus(ms1) );
    }

