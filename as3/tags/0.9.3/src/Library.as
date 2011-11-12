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
  Portions created by the Initial Developer are Copyright (C) 2006-2011
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
  Marc Alcaraz <ekameleon@gmail.com>.
  
*/

package
{
    import flash.display.Sprite;
    
    /**
     * The basic framework Library to be included in the SWC.
     * <p>
     * <b>Note:</b> This class is not a component, it is just
     * a shim that allow to declare the SWC manifest and associate an icon file.
     * </p>
     */
    [ExcludeClass]
    [IconFile("ASTUce.png")]
    public class Library extends Sprite
    {
        public function Library()
        {
        }

    }
}