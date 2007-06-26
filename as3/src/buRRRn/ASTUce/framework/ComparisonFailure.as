
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is [ASTUce: ActionScript Test Unit compact edition AS3]. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2006-2007
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/


package buRRRn.ASTUce.framework
    {
    
    /* Thrown when an assert equals for Strings failed.
    */
    public class ComparisonFailure extends AssertionFailedError
        {
        
        private var _expected:String;
        private var _actual:String;
        
        public function ComparisonFailure( expected:String, actual:String, message:String = "" )
            {
            super( message );
            name = "ComparisonFailure";
            
            _expected = expected;
            _actual   = actual;
            }
        
        /* Returns "..." in place of common prefix and "..." in
           place of common suffix between expected and actual.
           
           note:
           Ideally we would want to override the message property
           but that's not possible.
        */
        public function getMessage():String
            {
            if( (_expected == null) || (_actual == null) || (_expected == _actual) )
                {
                return Assert.format( _expected, _actual, super.message );
                }
            
            var i:int;
            var j:int;
            var k:int;
            var _el:int = _expected.length;
            var _al:int = _actual.length;
            
            var end:int = Math.min( _el , _al );
            
            for( i=0; i<end; i++ )
                {
                if( _expected.charAt(i) != _actual.charAt(i) )
                    {
                    break;
                    }
                }
            
            j = _el - 1;
            k = _al - 1;
            
            for( ; (k >= i) && (j >= i); k--,j-- )
                {
                if( _expected.charAt(j) != _actual.charAt(k) )
                    {
                    break;
                    }
                }
            
            var expected:String;
            var actual:String;
            var dots:String = "...";
            
            if( (j < i) && (k < i) )
                {
                expected = _expected;
                actual   = _actual;
                }
            else
                {
                expected = _expected.substring( i, j+1 );
                actual   = _actual.substring( i, k+1 );
                
                if( (i <= end) && (i > 0) )
                    {
                    expected = dots + expected;
                    actual   = dots + actual;
                    }
                
                if( j < _el-1 )
                    {
                    expected = expected + dots;
                    }
                
                if( k < _al-1 )
                    {
                    actual = actual + dots;
                    }
                
                }
            
            return Assert.format( expected, actual, super.message );
            }
        
        /* Override the Error toString method.
           
           note:
           as toString is declared in the prototype you can not use
           the override statement the 1st time you declare it,
           this because a function declared in a class take priority
           over a function declared in the prototype.
           
           But later if you want to redefine the function in another class
           inheriting the class where you defined toString
           you will have to use the statement override.
           
           little schema:
           > Error.prototype.toString
           >   |_ AssertionFailedError :: no declaration of toString
           >        |_ ComparisonFailure :: public function toString (1st)
           >              |_ OtherFailure :: public override function toString (2nd)
        */
        override public function toString():String
            {
            return name + ": " + getMessage();
            }
        
        }
    
    }

