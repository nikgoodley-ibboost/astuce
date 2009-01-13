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

package buRRRn.ASTUce
{
    import system.cli.ArgumentsParser;
    import system.cli.SwitchStatus;
    
    import system.console;
    
    public class Options extends ArgumentsParser
    {
        
        private var _app:Application;
        
        public var selftest:Boolean;
        public var verbose:Boolean;
        public var showUsage:Boolean;
        public var load:Boolean;
        //public var dumpConfig:Boolean;
        public var showInfo:Boolean;
        
        public var files:Array;
        public var classnames:Array;
        
        public function Options( app:Application )
        {
            super( ["?","s","v","i","l"], true );
            
            _app       = app;
            selftest   = false;
            verbose    = false;
            showUsage  = false;
            load       = false;
            //dumpConfig = false;
            showInfo   = false;
            
            files         = [];
            classnames    = [];
        }
        
        public override function onUsage( errorInfo:String = "" ):void
        {
            
            if( errorInfo != "" )
            {
                console.writeLine( "Cli switch error: " + errorInfo );
            }
            
            showUsage = true;
        }
        
        public override function onNonSwitch( value:String ):SwitchStatus
        {
            classnames.push( value );
            return SwitchStatus.noError;
        }
        
        public override function onSwitch( symbol:String, value:String ):SwitchStatus
        {
            var status:SwitchStatus = SwitchStatus.noError;
            
            switch( symbol )
            {
                case "?":
                status = SwitchStatus.showUsage;
                break;
                
                case "s":
                selftest = true;
                break;
                
                case "v":
                verbose = true;
                break;
                
//                case "d":
//                dumpConfig = true;
//                break;
                
                case "i":
                showInfo = true;
                break;
                
                case "l":
                load = true;
                files.push( value.substr(1) );
                break;
                
                default:
                status = SwitchStatus.error;
            }
            
            return status;
        }
        
        public override function onParsed():SwitchStatus
        {
            var status:SwitchStatus = SwitchStatus.noError;
            
//            if( (files.length > 0) && (classnames.length == 0) )
//            {
//                status = SwitchStatus.showUsage;
//                console.writeLine( "you need to provide at least one <classname>" );
//            }
            
            return status;
        }
        
        
    }
}