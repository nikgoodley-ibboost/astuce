
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
  Portions created by the Initial Developer are Copyright (C) 2004-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

/* Interface: IMoney
   The common interface for simple Monies and MoneyBags.
*/
buRRRn.ASTUce.samples.IMoney = function()
    {
    
    }

/* Method: plus
   Adds a money to this money.
*/
buRRRn.ASTUce.samples.IMoney.prototype.plus = function( /*IMoney*/ m )
    {
    
    }

/* Method: addMoney
   Adds a simple Money to this money.
   This is a helper method for implementing double dispatch.
*/
buRRRn.ASTUce.samples.IMoney.prototype.addMoney = function( /*Money*/ m )
    {
    
    }

/* Method: addMoneyBag
   Adds a MoneyBag to this money.
   This is a helper method for implementing double dispatch
*/
buRRRn.ASTUce.samples.IMoney.prototype.addMoneyBag = function( /*MoneyBag*/ mb )
    {
    
    }

/* Method: isZero
   Tests whether this money is zero.
*/
buRRRn.ASTUce.samples.IMoney.prototype.isZero = function()
    {
    
    }

/* Method: multiply
   Multiplies a money by the given factor.
*/
buRRRn.ASTUce.samples.IMoney.prototype.multiply = function( /*Int*/ factor )
    {
    
    }

/* Method: negate
   Negates this money.
*/
buRRRn.ASTUce.samples.IMoney.prototype.negate = function()
    {
    
    }

/* Method: minus
   Subtracts a money from this money.
*/
buRRRn.ASTUce.samples.IMoney.prototype.minus = function( /*IMoney*/ m )
    {
    
    }

/* Method: appendTo
   Append this to a MoneyBag.
*/
buRRRn.ASTUce.samples.IMoney.prototype.appendTo = function( /*MoneyBag*/ mb )
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
  Portions created by the Initial Developer are Copyright (C) 2004-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

/* Constructor: Money
   implements: IMoney
   
   A simple Money.
*/
buRRRn.ASTUce.samples.Money = function( /*Int*/ amount, /*String*/ currency )
    {
    this._amount = amount;
    this._currency = currency;
    }

/* Method: toString
*/
buRRRn.ASTUce.samples.Money.prototype.toString = function()
    {
    return "["+this.amount()+this.currency()+"]";
    }

/* Method: equals
*/
buRRRn.ASTUce.samples.Money.prototype.equals = function( /*Object*/ obj )
    {
    if( obj instanceof buRRRn.ASTUce.samples.Money )
        {
        if( this.isZero() )
            {
            return obj.isZero();
            }
        
        return( (this.currency() == obj.currency()) && (this.amount() == obj.amount()) );
        }
    
    return false;
    }

/* Method: plus
   Adds a money to this money.
*/
buRRRn.ASTUce.samples.Money.prototype.plus = function( /*IMoney*/ m )
    {
    return m.addMoney( this );
    }

/* Method: addMoney
   Adds a simple Money to this money.
   This is a helper method for implementing double dispatch.
*/
buRRRn.ASTUce.samples.Money.prototype.addMoney = function( /*Money*/ m )
    {
    if( m.currency() == this.currency() )
        {
        return new buRRRn.ASTUce.samples.Money( this.amount() + m.amount() , this.currency() );
        }
    
    return buRRRn.ASTUce.samples.MoneyBag.create( this, m );
    }

/* Method: addMoneyBag
   Adds a MoneyBag to this money.
   This is a helper method for implementing double dispatch
*/
buRRRn.ASTUce.samples.Money.prototype.addMoneyBag = function( /*MoneyBag*/ mb )
    {
    return mb.addMoney( this );
    }

/* Getter: currency
*/
buRRRn.ASTUce.samples.Money.prototype.currency = function()
    {
    return this._currency;
    }

/* Getter: amount
*/
buRRRn.ASTUce.samples.Money.prototype.amount = function()
    {
    return this._amount;
    }

/* Method: isZero
   Tests whether this money is zero.
*/
buRRRn.ASTUce.samples.Money.prototype.isZero = function()
    {
    return( this.amount() == 0 );
    }

/* Method: multiply
   Multiplies a money by the given factor.
*/
buRRRn.ASTUce.samples.Money.prototype.multiply = function( /*Int*/ factor )
    {
    return( new buRRRn.ASTUce.samples.Money( (this.amount()*factor), this.currency() ) );
    }

/* Method: negate
   Negates this money.
*/
buRRRn.ASTUce.samples.Money.prototype.negate = function()
    {
    return( new buRRRn.ASTUce.samples.Money( -this.amount(), this.currency() ) );
    }

/* Method: minus
   Subtracts a money from this money.
*/
buRRRn.ASTUce.samples.Money.prototype.minus = function( /*IMoney*/ m )
    {
    return( this.plus( m.negate() ) );
    }

/* Method: appendTo
   Append this to a MoneyBag.
*/
buRRRn.ASTUce.samples.Money.prototype.appendTo = function( /*MoneyBag*/ mb )
    {
    mb.appendMoney( this );
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

/* Constructor: MoneyBag
   implements: IMoney
   
   A MoneyBag defers exchange rate conversions. For example adding 
   12 Swiss Francs to 14 US Dollars is represented as a bag 
   containing the two Monies 12 CHF and 14 USD. Adding another
   10 Swiss francs gives a bag with 22 CHF and 14 USD. Due to 
   the deferred exchange rate conversion we can later value a 
   MoneyBag with different exchange rates.
  
   A MoneyBag is represented as a list of Monies and provides 
   different constructors to create a MoneyBag.
   
   note:
   we have to include Array.prototype.indexOf for
   MoneyBag.prototype.appendMoney method to work.
*/
buRRRn.ASTUce.samples.MoneyBag = function()
    {
    this._monies = [];
    }

/* StaticMethod: create
*/
buRRRn.ASTUce.samples.MoneyBag.create = function( /*IMoney*/ m1, /*IMoney*/ m2 )
    {
    var result;
    result = new buRRRn.ASTUce.samples.MoneyBag();
    m1.appendTo( result );
    m2.appendTo( result );
    return result.simplify();
    }

/* Method: plus
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.plus = function( /*IMoney*/ m )
    {
    return m.addMoneyBag( this );
    }

/* Method: addMoney
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.addMoney = function( /*Money*/ m )
    {
    return buRRRn.ASTUce.samples.MoneyBag.create( m, this );
    }

/* Method: addMoneyBag
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.addMoneyBag = function( /*MoneyBag*/ mb )
    {
    return buRRRn.ASTUce.samples.MoneyBag.create( mb, this );
    }

/* Method: appendBag
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.appendBag = function( /*MoneyBag*/ aBag )
    {
    var i;
    for( i=0; i<aBag._monies.length; i++ )
        {
        this.appendMoney( aBag._monies[i] );
        }
    }

/* Method: appendMoney
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.appendMoney = function( /*Money*/ aMoney )
    {
    var old, sum;
    
    if( aMoney.isZero() )
        {
        return;
        }
    
    old = this.findMoney( aMoney.currency() );
    
    if( old == null )
        {
        this._monies.push( aMoney );
        return;
        }
    
    this._monies.splice( this._monies.indexOf( old ) , 1 );
    sum = old.plus( aMoney );
    
    if( sum.isZero() )
        {
        return;
        }
    
    this._monies.push( sum );
    }

/* Method: equals
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.equals = function( /*Object*/ obj )
    {
    var i, aMoneyBag, m;
    
    if( obj instanceof buRRRn.ASTUce.samples.MoneyBag )
        {
        aMoneyBag = obj;
        if( this.isZero() )
            {
            return( aMoneyBag.isZero() );
            }
        
        if( aMoneyBag._monies.length != this._monies.length )
            {
            return false;
            }
        
        for( i=0; i<this._monies.length; i++ )
            {
            m = this._monies[i];
            if( !aMoneyBag.contains( m ) )
                {
                return false;
                }
            }
        
        return true;
        }
    
    return false;
    }

/* Method: findMoney
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.findMoney = function( /*String*/ currency )
    {
    var i, m;
    for( i=0; i<this._monies.length; i++ )
        {
        m = this._monies[i];
        
        if( m.currency().equals( currency ) )
            {
            return m;
            }
        }
    return null;
    }

/* Method: contains
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.contains = function( /*Money*/ m )
    {
    var found;
    found = this.findMoney( m.currency() );
    
    if( found == null )
        {
        return false;
        }
    
    return( found.amount() == m.amount() );
    }

/* Method: isZero
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.isZero = function()
    {
    return( this._monies.length == 0 );
    }

/* Method: multiply
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.multiply = function( /*Int*/ factor )
    {
    var result, i, m;
    result = new buRRRn.ASTUce.samples.MoneyBag();
    
    if( factor != 0 )
        {
        for( i=0; i<this._monies.length; i++ )
            {
            m = this._monies[i];
            result.appendMoney( m.multiply( factor ) );
            }
        }
    
    return result;
    }

/* Method: negate
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.negate = function()
    {
    var result, i, m;
    result = new buRRRn.ASTUce.samples.MoneyBag();
    
    for( i=0; i<this._monies.length; i++ )
        {
        m = this._monies[i];
        result.appendMoney( m.negate() );
        }
    
    return result;
    }

/* Method: simplify
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.simplify = function()
    {
    if( this._monies.length == 1 )
        {
        return this._monies[0];
        }
    return this;
    }

/* Method: minus
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.minus = function( /*IMoney*/ m )
    {
    return this.plus( m.negate() );
    }

/* Method: toString
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.toString = function()
    {
    var str, i;
    str = "";
    for( i=0; i<this._monies.length; i++ )
        {
        str += this._monies[i].toString() ;
        }
    return "{" + str + "}";
    }

/* Method: appendTo
*/
buRRRn.ASTUce.samples.MoneyBag.prototype.appendTo = function( /*MoneyBag*/ mb )
    {
    mb.appendBag( this );
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
    //this.assertEquals( Infinity, result );
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


