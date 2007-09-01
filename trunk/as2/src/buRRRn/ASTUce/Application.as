
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is ASTUce: ActionScript Test Unit compact edition AS2. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

import buRRRn.ASTUce.config;
import buRRRn.ASTUce.MiniRunner;

/* Singleton: Application
   The ASTUce framework application.
*/
class buRRRn.ASTUce.Application
    {
    
    /* StaticPrivateProperty: _name
       The code name of the framework.
    */
    static private var _name:String    = "ASTUce";
    
    /* StaticPrivateProperty: _fullName
       The full name of the framework.
    */
    static private var _fullName:String = "ActionScript Test Unit compact edition";
    
    /* StaticPrivateProperty: _version
       The version as string of the framework.
    */
    static private var _version:String  = "1.0.0";

    /* StaticPrivateProperty: _ext
       The language extension.
    */
    static private var _ext:String = "AS2";
    
    /* StaticPrivateProperty: _platform
       The target platform of the framework.
    */
    static private var _platform:String = "Flash ActionScript v2.0";
    
    static private var __ASPF__ = Attribute.setAttribute( buRRRn.ASTUce.Application,
                                                          ["_name","_fullName","_version","_ext","_platform"],
                                                          AttributeType.locked );
    
    /* StaticMethod: getInfo
       Returns information about the ASTUce framework.
    */
    static function getInfo():String
        {
        var str, CRLF;
        str = "";
        CRLF = "\n";
        
        if( config.verbose )
            {
            str += _name + ": " + _fullName + " " + _ext + " v" + _version;
            }
        else
            {
            str += _name + " " + _ext + " v" + _version;
            }
        
        /*!## TODO: change copyright notice */
        if( config.verbose )
            {
            str += CRLF;
            str += "Copyright (c) 2004-2005 Zwetan Kjukov, All right reserved." +CRLF
            str += "Made in the EU.";
            }
        
        return str;
        }
    
    /* StaticMethod: main
       Execute the main process of the ASTUce framework.
    */
    static function main()
        {
        var separator = "----------------------------------------------------------------";
        trace( separator );
        
        var runner:MiniRunner = new MiniRunner( "Main Tests" );
        
        if( config.testMyself )
            {
            
            runner.setUp = function()
                {
                this.suite.addTest( Tests.AllTests.suite() );
                }
            
            }
        
        if( arguments.length > 0 )
            {
            for( var i=0; i<arguments.length; i++ )
                {
                runner.suite.addTest( arguments[i] );
                }
            }
        
        trace( getInfo() );
        trace( separator );
        runner.run();
        trace( separator );
        
        if( config.showConstructorList )
            {
            trace( runner.suite );
            trace( separator );
            }
        }
    
    }

