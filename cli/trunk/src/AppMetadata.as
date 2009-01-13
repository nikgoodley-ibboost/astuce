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

package
{
    import system.Version;
    
    public class AppMetadata
    {
        public static var name:String = "ASTUce";
        
        public static var fullname:String = "ActionScript Test Unit compact edition CLI";
        
        public static var version:Version = new Version();
        
        include "version.properties"
        
        version.revision = parseInt( "$Rev$".split( " " )[1] );
        
        public static var copyright:String = "Copyright (C) 2006-2009 Zwetan Kjukov, All right reserved.";
        public static var origin:String    = "Made in the EU.";
        
        public static var license:String = "";
        license += "  The contents of this file are subject to the Mozilla Public License Version\n";
        license += "  1.1 (the \"License\"); you may not use this file except in compliance with\n";
        license += "  the License. You may obtain a copy of the License at \n";
        license += "  http://www.mozilla.org/MPL/ \n";
        license += "  \n";
        license += "  Software distributed under the License is distributed on an \"AS IS\" basis,\n";
        license += "  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License\n";
        license += "  for the specific language governing rights and limitations under the License.\n"; 
        license += "  \n";
        license += "  The Original Code is [ASTUce: ActionScript Test Unit compact edition CLI].\n"; 
        license += "  \n";
        license += "  The Initial Developer of the Original Code is\n";
        license += "  Zwetan Kjukov <zwetan@gmail.com>.\n";
        license += "  Portions created by the Initial Developer are Copyright (C) 2006-2009\n";
        license += "  the Initial Developer. All Rights Reserved.\n";
        license += "  \n";
        license += "  Contributor(s):\n";
        
    }
}

