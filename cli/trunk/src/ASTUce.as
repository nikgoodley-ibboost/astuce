/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is [ASTUce: ActionScript Test Unit compact edition CLI]. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2006-2009
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
  
*/


//libraries
include "../lib/maashaack/maashaack.as";
include "../lib/ASTUce/ASTUce.as";

include "utils/SWFTags.as";
include "utils/SWFRect.as";
include "utils/SWF.as";
include "AppMetadata.as";
include "buRRRn/ASTUce/Application.as";
include "buRRRn/ASTUce/Options.as";

//imports
import avmplus.System;
import buRRRn.ASTUce.Application;

//main entry point
var app:Application = new Application();
app.run( System.argv );
