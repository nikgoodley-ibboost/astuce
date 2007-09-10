
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

tests.ASTUce.OverrideTestCase = function( name )
    {
    tests.ASTUce.OneTestCase.call( this, name );
    }

tests.ASTUce.OverrideTestCase.prototype = new tests.ASTUce.OneTestCase();
tests.ASTUce.OverrideTestCase.prototype.constructor = tests.ASTUce.OverrideTestCase;

tests.ASTUce.OverrideTestCase.prototype.testCase = function()
    {
    
    }

