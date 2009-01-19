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

/* note:
   as we can not run the unit test of ASTUce with ASTUce CLI
   we need to provide a lightweight test runner for the command-line
   that can return either exit(0) or exit(1)
*/

import C.stdlib.*;

import system.Strings;
import system.console;

import buRRRn.ASTUce.Runner;
import buRRRn.ASTUce.config;
import buRRRn.ASTUce.info;
import buRRRn.ASTUce.runner.strings;
import buRRRn.ASTUce.runner.NullSuiteError;
import buRRRn.ASTUce.framework.TestResult;
import buRRRn.ASTUce.samples.AllTests;
import buRRRn.ASTUce.tests.AllTests;

buRRRn.ASTUce.config.allowStackTrace = true;
buRRRn.ASTUce.config.showConstructorList = false;


/*
Runner.main( buRRRn.ASTUce.tests.AllTests.suite(),
             buRRRn.ASTUce.samples.AllTests.suite() );
*/

console.writeLine( buRRRn.ASTUce.info( true ) );

var tests:Array = [ buRRRn.ASTUce.tests.AllTests.suite(),
                    buRRRn.ASTUce.samples.AllTests.suite() ];

var allTestsWereSuccessful:Boolean = true;
var result:TestResult;
var runner:Runner = new Runner();
var suiteName:String;

for( var i:int = 0; i<tests.length; i++ )
{
    suiteName = runner.getTestName( tests[i] );
    console.writeLine( buRRRn.ASTUce.runner.strings.runTitle, suiteName, i );
    
    try
        {
        result = Runner.run( tests[i], runner );
        }
    catch( e1:NullSuiteError )
        {
        console.writeLine( buRRRn.ASTUce.runner.strings.nullTestsuite );
        }
    catch( e2:Error )
        {
        console.writeLine( Strings.format( buRRRn.ASTUce.runner.strings.canNotCreateAndRun, i ) );
        console.writeLine( Strings.format( buRRRn.ASTUce.runner.strings.tab, e2.toString() ) );
        }
    
    console.writeLine( buRRRn.ASTUce.strings.separator );
    
    if( !result || !result.wasSuccessful() )
    {
        allTestsWereSuccessful = false;
    }
    
}



if( !allTestsWereSuccessful )
{
    exit( EXIT_FAILURE );
}

exit( EXIT_SUCCESS );

