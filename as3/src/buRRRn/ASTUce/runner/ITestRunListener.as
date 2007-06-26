
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


package buRRRn.ASTUce.runner
    {
    
    /* A listener interface for observing
       the execution of a test run.
    */
    public interface ITestRunListener
        {
        
        function testRunStarted( testSuiteName:String, testCount:int ):void
        function testRunEnded( elapsedTime:Number ):void
        function testRunStopped( elapsedTime:Number ):void
        function testStarted( testName:String ):void
        function testEnded( testName:String ):void
        function testFailed( status:TestRunStatus, testName:String, trace:String ):void
        
        }
    
    }

