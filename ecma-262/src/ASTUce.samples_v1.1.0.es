// ASTUce.samples v1.1.0 - http://code.google.com/p/astuce/ (MPL 1.1)

if(!buRRRn.ASTUce.samples)
{buRRRn.ASTUce.samples={};}
buRRRn.ASTUce.samples.IMoney=function()
{}
buRRRn.ASTUce.samples.IMoney.prototype.plus=function(m)
{}
buRRRn.ASTUce.samples.IMoney.prototype.addMoney=function(m)
{}
buRRRn.ASTUce.samples.IMoney.prototype.addMoneyBag=function(mb)
{}
buRRRn.ASTUce.samples.IMoney.prototype.isZero=function()
{}
buRRRn.ASTUce.samples.IMoney.prototype.multiply=function(factor)
{}
buRRRn.ASTUce.samples.IMoney.prototype.negate=function()
{}
buRRRn.ASTUce.samples.IMoney.prototype.minus=function(m)
{}
buRRRn.ASTUce.samples.IMoney.prototype.appendTo=function(mb)
{}
buRRRn.ASTUce.samples.Money=function(amount,currency)
{this._amount=amount;this._currency=currency;}
buRRRn.ASTUce.samples.Money.prototype.toString=function()
{return"["+this.amount()+this.currency()+"]";}
buRRRn.ASTUce.samples.Money.prototype.equals=function(obj)
{if(obj instanceof buRRRn.ASTUce.samples.Money)
{if(this.isZero())
{return obj.isZero();}
return((this.currency()==obj.currency())&&(this.amount()==obj.amount()));}
return false;}
buRRRn.ASTUce.samples.Money.prototype.plus=function(m)
{return m.addMoney(this);}
buRRRn.ASTUce.samples.Money.prototype.addMoney=function(m)
{if(m.currency()==this.currency())
{return new buRRRn.ASTUce.samples.Money(this.amount()+m.amount(),this.currency());}
return buRRRn.ASTUce.samples.MoneyBag.create(this,m);}
buRRRn.ASTUce.samples.Money.prototype.addMoneyBag=function(mb)
{return mb.addMoney(this);}
buRRRn.ASTUce.samples.Money.prototype.currency=function()
{return this._currency;}
buRRRn.ASTUce.samples.Money.prototype.amount=function()
{return this._amount;}
buRRRn.ASTUce.samples.Money.prototype.isZero=function()
{return(this.amount()==0);}
buRRRn.ASTUce.samples.Money.prototype.multiply=function(factor)
{return(new buRRRn.ASTUce.samples.Money((this.amount()*factor),this.currency()));}
buRRRn.ASTUce.samples.Money.prototype.negate=function()
{return(new buRRRn.ASTUce.samples.Money(-this.amount(),this.currency()));}
buRRRn.ASTUce.samples.Money.prototype.minus=function(m)
{return(this.plus(m.negate()));}
buRRRn.ASTUce.samples.Money.prototype.appendTo=function(mb)
{mb.appendMoney(this);}
buRRRn.ASTUce.samples.MoneyBag=function()
{this._monies=[];}
buRRRn.ASTUce.samples.MoneyBag.create=function(m1,m2)
{var result;result=new buRRRn.ASTUce.samples.MoneyBag();m1.appendTo(result);m2.appendTo(result);return result.simplify();}
buRRRn.ASTUce.samples.MoneyBag.prototype.plus=function(m)
{return m.addMoneyBag(this);}
buRRRn.ASTUce.samples.MoneyBag.prototype.addMoney=function(m)
{return buRRRn.ASTUce.samples.MoneyBag.create(m,this);}
buRRRn.ASTUce.samples.MoneyBag.prototype.addMoneyBag=function(mb)
{return buRRRn.ASTUce.samples.MoneyBag.create(mb,this);}
buRRRn.ASTUce.samples.MoneyBag.prototype.appendBag=function(aBag)
{var i;for(i=0;i<aBag._monies.length;i++)
{this.appendMoney(aBag._monies[i]);}}
buRRRn.ASTUce.samples.MoneyBag.prototype.appendMoney=function(aMoney)
{var old,sum;if(aMoney.isZero())
{return;}
old=this.findMoney(aMoney.currency());if(old==null)
{this._monies.push(aMoney);return;}
this._monies.splice(this._monies.indexOf(old),1);sum=old.plus(aMoney);if(sum.isZero())
{return;}
this._monies.push(sum);}
buRRRn.ASTUce.samples.MoneyBag.prototype.equals=function(obj)
{var i,aMoneyBag,m;if(obj instanceof buRRRn.ASTUce.samples.MoneyBag)
{aMoneyBag=obj;if(this.isZero())
{return(aMoneyBag.isZero());}
if(aMoneyBag._monies.length!=this._monies.length)
{return false;}
for(i=0;i<this._monies.length;i++)
{m=this._monies[i];if(!aMoneyBag.contains(m))
{return false;}}
return true;}
return false;}
buRRRn.ASTUce.samples.MoneyBag.prototype.findMoney=function(currency)
{var i,m;for(i=0;i<this._monies.length;i++)
{m=this._monies[i];if(m.currency().equals(currency))
{return m;}}
return null;}
buRRRn.ASTUce.samples.MoneyBag.prototype.contains=function(m)
{var found;found=this.findMoney(m.currency());if(found==null)
{return false;}
return(found.amount()==m.amount());}
buRRRn.ASTUce.samples.MoneyBag.prototype.isZero=function()
{return(this._monies.length==0);}
buRRRn.ASTUce.samples.MoneyBag.prototype.multiply=function(factor)
{var result,i,m;result=new buRRRn.ASTUce.samples.MoneyBag();if(factor!=0)
{for(i=0;i<this._monies.length;i++)
{m=this._monies[i];result.appendMoney(m.multiply(factor));}}
return result;}
buRRRn.ASTUce.samples.MoneyBag.prototype.negate=function()
{var result,i,m;result=new buRRRn.ASTUce.samples.MoneyBag();for(i=0;i<this._monies.length;i++)
{m=this._monies[i];result.appendMoney(m.negate());}
return result;}
buRRRn.ASTUce.samples.MoneyBag.prototype.simplify=function()
{if(this._monies.length==1)
{return this._monies[0];}
return this;}
buRRRn.ASTUce.samples.MoneyBag.prototype.minus=function(m)
{return this.plus(m.negate());}
buRRRn.ASTUce.samples.MoneyBag.prototype.toString=function()
{var str,i;str="";for(i=0;i<this._monies.length;i++)
{str+=this._monies[i].toString();}
return"{"+str+"}";}
buRRRn.ASTUce.samples.MoneyBag.prototype.appendTo=function(mb)
{mb.appendBag(this);}
buRRRn.ASTUce.samples.SimpleTest=function(name)
{buRRRn.ASTUce.TestCase.call(this,name);}
buRRRn.ASTUce.samples.SimpleTest.prototype=new buRRRn.ASTUce.TestCase();buRRRn.ASTUce.samples.SimpleTest.prototype.constructor=buRRRn.ASTUce.samples.SimpleTest;buRRRn.ASTUce.samples.SimpleTest.prototype.setUp=function()
{this.value1=2;this.value2=3;}
buRRRn.ASTUce.samples.SimpleTest.prototype.testAdd=function()
{var result=this.value1+this.value2;this.assertTrue(result==6);}
buRRRn.ASTUce.samples.SimpleTest.prototype.testDivideByZero=function()
{var zero=0;var result=8/zero;this.assertEquals(8,result);}
buRRRn.ASTUce.samples.SimpleTest.prototype.testEquals=function()
{this.assertEquals(12,12);var twelve=(12).toString(16);this.assertEquals(twelve,"c");this.assertEquals(0x000000000c,0x000000000c);this.assertEquals(12.0,11.99,"Capacity");}
buRRRn.ASTUce.samples.SimpleTest.prototype.testEqualsObject=function()
{var obj1,obj2;obj1={a:1,b:2,c:3};obj2={a:1,b:2,c:4};this.assertEquals(obj1,obj2);}