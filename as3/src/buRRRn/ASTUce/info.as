
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

package buRRRn.ASTUce
    {
    
    public function info():String
        {
        var str:String  = "";
        var CRLF:String = "\n";
        
        if( config.verbose )
            {
            str += name + ": " + fullName + " " + ext + " v" + version;
            }
        else
            {
            str += name + " " + ext + " v" + version;
            }
        
        if( config.verbose )
            {
            str += CRLF;
            str += "Copyright © 2006-2007 Zwetan Kjukov, All right reserved." + CRLF;
            str += "Made in the EU.";
            }
        
        return str;
        }
    
    }

var name:String     = "ASTUce";
var fullName:String = "ActionScript Test Unit compact edition";
var version:String  = "0.8";
var ext:String      = "AS3";
var platform:String = "Flash ActionScript v3.0";
