
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
  Portions created by the Initial Developer are Copyright (C) 2006-2008
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

package buRRRn.ASTUce.framework
    {
    
    public class TestWarning extends TestCase
        {
        
        private var _message:String;
        private var _detail:String;
        
        public function TestWarning( message:String = "", detail:String = "" )
            {
            super( "warning" );
            _message = message;
            _detail  = detail;
            }
        
        override protected function runTest():void
            {
            fail( _detail );
            }
        
        override public function toString( ...args ):String
            {
            return name + "(" + _message + ")";
            }
        
        }
    }

