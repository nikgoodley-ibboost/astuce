
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

var self = this;

if( !self.buRRRn )
    {
    self.buRRRn = {};
    }

if( !buRRRn.ASTUce  )
    {
    /* Singleton: buRRRn.ASTUce
       The ASTUce application.
    */
    buRRRn.ASTUce = {};
    }

/* Property: version
   Contains ASTUce version.
*/
buRRRn.ASTUce.version = "1.1.0." + parseInt( "$Rev$".split( " " )[1] );


buRRRn.ASTUce.info = function( verbose/*Boolean*/, showConfig/*Boolean*/ )/*String*/
    {
    if( verbose == null )
        {
        verbose = false;
        }
    
    if( showConfig == null )
        {
        showConfig = false;
        }
    
    var separator = "----------------------------------------------------------------";
    var CRLF      = buRRRn.ASTUce.config.CRLF;
    var name      = "ASTUce";
    var fullname  = "ActionScript Test Unit compact edition";
    var copyright = "Copyright © 2004-2007 Zwetan Kjukov, All right reserved.";
    var origin    = "Made in the EU.";
    
    var str = "";
    
    if( !verbose && buRRRn.ASTUce.config.verbose )
        {
        verbose = true;
        }
    
    if( verbose ) {
    str += separator+CRLF;
    str += name+": "+fullname+" v"+this.version+CRLF;
    str += copyright+CRLF;
    str += origin+CRLF;
    str += separator;
    } else {
    str += name+" v"+this.version+CRLF;
    str += separator;
    }
    
    if( showConfig ) {
    str += CRLF+"config:";
    str += buRRRn.eden.serialize( buRRRn.ASTUce.config )+CRLF;
    str += separator;
    }
    
    trace( str );
    }


