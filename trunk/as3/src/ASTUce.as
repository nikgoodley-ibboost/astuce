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


//to avoid fwd ref
include "buRRRn/ASTUce/framework/Assert.as";
include "buRRRn/ASTUce/framework/TestCase.as";
include "buRRRn/ASTUce/extensions/TestDecorator.as";

//extensions
include "buRRRn/ASTUce/extensions/ErrorTestCase.as";
include "buRRRn/ASTUce/extensions/RepeatedTest.as";
include "buRRRn/ASTUce/extensions/TestSetup.as";
include "buRRRn/ASTUce/extensions/TimedTest.as";
include "buRRRn/ASTUce/extensions/TimedTestCase.as";

//framework
include "buRRRn/ASTUce/framework/ArrayAssert.as";
include "buRRRn/ASTUce/framework/AssertionFailedError.as";
include "buRRRn/ASTUce/framework/ComparisonFailure.as";
include "buRRRn/ASTUce/framework/DateAssert.as";
include "buRRRn/ASTUce/framework/ITest.as";
include "buRRRn/ASTUce/framework/ITestListener.as";
include "buRRRn/ASTUce/framework/Protectable.as";
include "buRRRn/ASTUce/framework/TestFailure.as";
include "buRRRn/ASTUce/framework/TestResult.as";
include "buRRRn/ASTUce/framework/TestSuite.as";
include "buRRRn/ASTUce/framework/TestWarning.as";

//mocks

//runner
include "buRRRn/ASTUce/runner/BaseTestRunner.as";
include "buRRRn/ASTUce/runner/ITestRunListener.as";
include "buRRRn/ASTUce/runner/NullSuiteError.as";
include "buRRRn/ASTUce/runner/strings.as";
include "buRRRn/ASTUce/runner/TestRunStatus.as";

//samples
  //money
  include "buRRRn/ASTUce/samples/money/IMoney.as";
  include "buRRRn/ASTUce/samples/money/Money.as";
  include "buRRRn/ASTUce/samples/money/MoneyBag.as";
  include "buRRRn/ASTUce/samples/money/MoneyTest.as";
include "buRRRn/ASTUce/samples/AllTests.as";
include "buRRRn/ASTUce/samples/ArrayTest.as";
include "buRRRn/ASTUce/samples/SimpleTest.as";

//tests
  //fwd ref
  include "buRRRn/ASTUce/tests/framework/TornDown.as";
  include "buRRRn/ASTUce/tests/framework/OneTestCase.as";
  //extensions
  include "buRRRn/ASTUce/tests/extensions/AllTests.as";
  include "buRRRn/ASTUce/tests/extensions/ErrorTestCaseTest.as";
  include "buRRRn/ASTUce/tests/extensions/ErrorTimedTest.as";
  include "buRRRn/ASTUce/tests/extensions/ExtensionTest.as";
  include "buRRRn/ASTUce/tests/extensions/FailedSetUp.as";
  include "buRRRn/ASTUce/tests/extensions/FailedTornDown.as";
  include "buRRRn/ASTUce/tests/extensions/NoTimeoutTimedTest.as";
  include "buRRRn/ASTUce/tests/extensions/RepeatedTestTest.as";
  include "buRRRn/ASTUce/tests/extensions/SampleTimedTest.as";
  include "buRRRn/ASTUce/tests/extensions/SuccessTest.as";
  include "buRRRn/ASTUce/tests/extensions/ThrowErrorTestCase.as";
  include "buRRRn/ASTUce/tests/extensions/ThrowNoErrorTestCase.as";
  include "buRRRn/ASTUce/tests/extensions/ThrowRuntimeErrorTestCase.as";
  include "buRRRn/ASTUce/tests/extensions/TimedTestCaseTest.as";
  include "buRRRn/ASTUce/tests/extensions/TimedTestTest.as";
  //framework
  include "buRRRn/ASTUce/tests/framework/AllTests.as";
  include "buRRRn/ASTUce/tests/framework/ArrayAssertTest.as";
  include "buRRRn/ASTUce/tests/framework/AssertTest.as";
  include "buRRRn/ASTUce/tests/framework/ComparisonFailureTest.as";
  include "buRRRn/ASTUce/tests/framework/DoubleTestCase.as";
  include "buRRRn/ASTUce/tests/framework/EmptyRunTestCase.as";
  include "buRRRn/ASTUce/tests/framework/ErrorTestCaseLocal.as";
  include "buRRRn/ASTUce/tests/framework/ExceptionRunningAndTearDown.as";
  include "buRRRn/ASTUce/tests/framework/FailureTestCase.as";
  include "buRRRn/ASTUce/tests/framework/InheritedTestCase.as";
  include "buRRRn/ASTUce/tests/framework/NoArgTestCaseTest.as";
  include "buRRRn/ASTUce/tests/framework/NoTestCaseClass.as";
  include "buRRRn/ASTUce/tests/framework/NoTestCases.as";
  include "buRRRn/ASTUce/tests/framework/NumberAssertTest.as";
  include "buRRRn/ASTUce/tests/framework/OverrideTestCase.as";
  include "buRRRn/ASTUce/tests/framework/RunAndTearDownFails.as";
  include "buRRRn/ASTUce/tests/framework/SetupFailsTestCase.as";
  include "buRRRn/ASTUce/tests/framework/SuccessTestCase.as";
  include "buRRRn/ASTUce/tests/framework/SuiteTest.as";
  include "buRRRn/ASTUce/tests/framework/TearDownFailsTestCase.as";
  include "buRRRn/ASTUce/tests/framework/TearDownSetupFails.as";
  include "buRRRn/ASTUce/tests/framework/TestCaseTest.as";
  include "buRRRn/ASTUce/tests/framework/TestImplementorTest.as";
  include "buRRRn/ASTUce/tests/framework/TestListenerTest.as";
  include "buRRRn/ASTUce/tests/framework/ValidTestCase.as";
  
  //mocks
  include "buRRRn/ASTUce/tests/mocks/AllTests.as";
  
  //runner
  //include "buRRRn/ASTUce/tests/runner/.as";
include "buRRRn/ASTUce/tests/AllTests.as";
include "buRRRn/ASTUce/tests/WasRun.as";

//ui
include "buRRRn/ASTUce/ui/ResultPrinter.as";

//ASTUce
include "buRRRn/ASTUce/ASTUceConfigurator.as";
include "buRRRn/ASTUce/Runner.as";
  //statics
  include "buRRRn/ASTUce/metadata.as";
  //objects
  include "buRRRn/ASTUce/config.as";
  include "buRRRn/ASTUce/strings.as";
  //functions
  include "buRRRn/ASTUce/about.as";
  include "buRRRn/ASTUce/info.as";


