
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
    
    /* Configure the ASTUce framework
       
       TODO:
       - make the config dynamic with eden
       - FIXME DOC
    */
    public class config
        {
        
        /* Boolean option to configure the getInfo method behaviour.
           
           parameters:
           true  - more verbose
           false - less verbose
        */
        static public var verbose:Boolean = true;
        
        /* Boolean option to display all the constructors being tested.
           
           parameters:
           true  - show constructors list
           false - don't show constructor list
           
           note:
           Will show an indented list of tests
           (code)
            All ASTUce tests
            	{
            	Framework Tests
            		{
            		TestCaseTest
            			{
            			testCaseToString( TestCaseTest )
            			testRunAndTearDownFails( TestCaseTest )
            			testWasRun( TestCaseTest )
            			testError( TestCaseTest )
            			...
           (end)
           
        */
        static public var showConstructorList:Boolean = false;
        
        /* 
           note:
           if false will show the full indentation
           (code)
            All ASTUce tests
            	{
            	Framework Tests
            		{
            		TestCaseTest
            			{
            			testCaseToString( TestCaseTest )
            			testRunAndTearDownFails( TestCaseTest )
            			testWasRun( TestCaseTest )
            			testError( TestCaseTest )
            			...
           (end)
           
           if true will show the indentation till the
           showSimpleTraceDepth
        */
        static public var showAllAsSimpleTrace:Boolean = false;
        
        /* 
           note:
           will limit the depth of description for constructors list
           (code)
            All ASTUce tests
            	{
            	Framework Tests
            		{
            		TestCaseTest
            			{
            			13 Tests ...
            			}
            		Suite tests
            			{
            			7 Tests ...
            			}
           (end)
        */
        static public var showSimpleTraceDepth:int     = 1;
        
        /* 
           note:
           shows the short tests
           (code)
           ...F..E...
           (end)
        */
        static public var showPrinterShortTests:Boolean  = true;
        
        /* 
           note:
           need to be true to display
           - printHeader
           - printErrors
           - printFailures
           - printFooter
           - empty tests
        */
        static public var showPrinterDetails:Boolean  = true;
        
        /* 
           note:
           show the header
           (code)
           Time: 0h:0mn:0s:10ms
           (end)
        */
        static public var showPrintHeader:Boolean     = true;
        
        /* 
           note:
           show the errors details
        */
        static public var showPrintErrors:Boolean     = true;
        
        /* 
           note:
           show the failures details
        */
        static public var showPrintFailures:Boolean   = true;
        
        /* note:
           show the footer
           (code)
           OK (10 tests)
           (end)
        */
        static public var showPrintFooter:Boolean     = true;
        
        /* 
           note:
           sometimes you add a test or a test suite
           that does not contain any tests,
           il will show something as
           (code)
           [unknown]
           (end)
        */
        static public var showEmptyTests:Boolean      = true;
        
        /* Boolean option to display the source of objects being compared.
           
           parameters:
           true  - show the object source
           false - don't show the source
           
           note:
           It help you to debug to see
           (code)
           AssertionFailedError : expected:<{a:1,b:2,c:3}> but was:<{a:1,b:2,c:4}>
           (end)
           instead of
           (code)
           AssertionFailedError : expected:<[object Object]> but was:<[object Object]>
           (end)
        */
        static public var showObjectSource:Boolean = true;
        
        /* Boolean option to invert the order of the arguments: expected, actual
           see <buRRRn.ASTUce.framework.Assert>
           
           parameters:
           true  - the argument order is: actual, expected. (inverted)
           false - the argument order is: expected, actual. (default)
        */
        static public var invertExpectedActual:Boolean = false;
        
        /* Boolean option to configure the behaviour of ASTUce
           regarding private methods.
           ...
           This option has been removed because reflection in ES4/AS3
           do not allow us to find private methods.
        */
        //static public var testPrivateMethods:Boolean = false;
        
        /* Boolean option allowing to iterate or not trough inherited tests.
           
           parameters:
           true  - iterate inherited tests
           false - does NOT iterate inherited tests
           
           note:
           If you set this option to false the following test
           SuiteTest( testInheritedTests ) will fail.
           Hopefully the failure message should direct you here ;).
           (code)
           0) testInheritedTests( SuiteTest )
              AssertionFailedError: see buRRRn.ASTUce.config.testInheritedTests
              	at buRRRn.ASTUce.framework::Assert$/fail()
              	at buRRRn.ASTUce.framework::Assert$/assertTrue()
              	at buRRRn.ASTUce.tests.framework::SuiteTest/testInheritedTests()
           (end)
        */
        static public var testInheritedTests:Boolean = true;
        
        /* Boolean option allowing the ASTUce framework to test itself.
           
           parameters:
           true  - add to tests *buRRRn.Tests.AllTests.suite()*.
           false - add nothing
        */
        //REMOVED FOR NOW
        //static public var testMyself:Boolean = false;
        
        /* 
           note:
           define the max column chars to display
           before returning to the line.
           -> only usefull to print short tests/failures/errors
        */
        static public var maxColumn:int = 38;
        
        static public var defectHeaderAsError:Boolean = false;
        static public var allowErrorTrace:Boolean = true;
        static public var allowStackTrace:Boolean = true;
        
        /* 
           note:
           allow to use the filteredPatterns array
           to filter or not the errors stack trace
           set it to false if you want the full stack.
        */
        static public var filterErrorStack:Boolean = true;
        
        /* allow to clean some informations of the stack trace line
           
           ex:
           at buRRRn.ASTUce.samples::ArrayTest/testClone()[C:\code\sandbox\buRRRn\ASTUce\samples\ArrayTest.as:72]
           become
           at buRRRn.ASTUce.samples::ArrayTest/testClone()
           
           note:
           to remove all file system info between [ and ]
           /\[.*\]/ -> ""
           at buRRRn.ASTUce.samples::ArrayTest/testClone()[C:\code\sandbox\buRRRn\ASTUce\samples\ArrayTest.as:72]
           at buRRRn.ASTUce.samples::ArrayTest/testClone()
           
           to remove only the drive (c:\) info (windows)
           /\[[a-zA-Z]\:\\/ -> "["
           at buRRRn.ASTUce.samples::ArrayTest/testClone()[C:\code\sandbox\buRRRn\ASTUce\samples\ArrayTest.as:72]
           at buRRRn.ASTUce.samples::ArrayTest/testClone()[code\sandbox\buRRRn\ASTUce\samples\ArrayTest.as:72]
           
           to remove the drive and path info (c:\some\path) (windows)
           /\[[a-zA-Z].*\\/ -> "["
           at buRRRn.ASTUce.samples::ArrayTest/testClone()[C:\code\sandbox\buRRRn\ASTUce\samples\ArrayTest.as:72]
           at buRRRn.ASTUce.samples::ArrayTest/testClone()[ArrayTest.as:72]
        */
        static public var cleanupErrorStack:Boolean = true;
        static public var cleanupPattern:RegExp     = /\[.*\]/;
        static public var cleanupReplacement:String = "";
        
        /* An Array of patterns to filter the stack trace.
           
           attention:
           Be carefull with what you add
           adding "buRRRn.ASTUce.framework"
           will filter out
             - buRRRn.ASTUce.framework::Assert$/fail()
             - buRRRn.ASTUce.framework::Assert$/assertTrue()
             - or any other Assert methods
           to not filter the AssertionFailure it is better to
           add the filters this way
           "buRRRn.ASTUce.framework::TestResult"
           "buRRRn.ASTUce.framework::TestCase"
           "buRRRn.ASTUce.framework::TestSuite"
        */
        
        static public var filteredPatterns:Array = [ "buRRRn.ASTUce.framework::TestResult",
                                                     "buRRRn.ASTUce.framework::TestCase",
                                                     "buRRRn.ASTUce.framework::TestSuite",
                                                     "buRRRn.ASTUce.ui",
                                                     "at MethodInfo",
                                                     "at ()",
                                                     "at Function/http://adobe.com/AS3/2006/builtin::call()",
                                                     "at Function/http://adobe.com/AS3/2006/builtin::apply()" ];
        
        /*
        static public var filteredPatterns:Array = [];
        */
        }
    
    }

