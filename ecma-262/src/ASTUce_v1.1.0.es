// ASTUce v1.1.0 - http://code.google.com/p/astuce/ (MPL 1.1)

var self=this;if(!self.buRRRn)
{self.buRRRn={};}
if(!buRRRn.ASTUce)
{buRRRn.ASTUce={};}
buRRRn.ASTUce.version="1.1.0."+parseInt("$Rev: 23 $".split(" ")[1]);buRRRn.ASTUce.info=function(verbose,showConfig)
{if(verbose==null)
{verbose=false;}
if(showConfig==null)
{showConfig=false;}
var separator="----------------------------------------------------------------";var CRLF="\n";var name="ASTUce";var fullname="ActionScript Test Unit compact edition";var copyright="Copyright © 2004-2007 Zwetan Kjukov, All right reserved.";var origin="Made in the EU.";var str="";if(!verbose&&buRRRn.ASTUce.config.verbose)
{verbose=true;}
if(verbose){str+=separator+CRLF;str+=name+": "+fullname+" v"+this.version+CRLF;str+=copyright+CRLF;str+=origin+CRLF;str+=separator;}else{str+=name+" v"+this.version+CRLF;str+=separator;}
if(showConfig){str+=CRLF+"config:";str+=buRRRn.eden.serialize(buRRRn.ASTUce.config)+CRLF;str+=separator;}
trace(str);}
buRRRn.ASTUce.Assertion={};buRRRn.ASTUce.Assertion.assertTrue=function(condition,message)
{if(!condition)
{this.fail(message);}}
buRRRn.ASTUce.Assertion.assertFalse=function(condition,message)
{this.assertTrue(!condition,message);}
buRRRn.ASTUce.Assertion.assertEquals=function(expected,actual,message)
{if(((expected==undefined)&&(actual!=undefined))||((expected!=undefined)&&(actual==undefined)))
{this._failNotEquals(expected,actual,message);}
if((expected==null)&&(actual==null))
{return;}
if(expected==actual)
{return;}
if(((typeof expected=="number")&&(typeof actual=="number"))&&(isNaN(expected)&&isNaN(actual)))
{return;}
if((expected["equals"]!=undefined)&&expected.equals(actual))
{return;}
if(((typeof expected=="string")||(expected instanceof String))&&((typeof actual=="string")||(actual instanceof String)))
{throw new buRRRn.ASTUce.ComparisonFailure(expected,actual,message);}
else
{this._failNotEquals(expected,actual,message);}}
buRRRn.ASTUce.Assertion.assertNotNull=function(obj,message)
{this.assertTrue(obj!=null,message);}
buRRRn.ASTUce.Assertion.assertNull=function(obj,message)
{this.assertTrue(obj==null,message);}
buRRRn.ASTUce.Assertion.assertUndefined=function(obj,message)
{this.assertTrue(obj==undefined,message);}
buRRRn.ASTUce.Assertion.assertNotUndefined=function(obj,message)
{this.assertTrue(obj!=undefined,message);}
buRRRn.ASTUce.Assertion.assertSame=function(expected,actual,message)
{if(expected===actual)
{return;}
this._failNotSame(expected,actual,message);}
buRRRn.ASTUce.Assertion.assertNotSame=function(expected,actual,message)
{if(expected===actual)
{this._failSame(expected,actual,message);}}
buRRRn.ASTUce.Assertion.fail=function(message)
{throw new buRRRn.ASTUce.AssertionFailedError(message);}
buRRRn.ASTUce.Assertion._failSame=function(expected,actual,message)
{var formatted="";if(message!=null)
{formatted=message+" ";}
this.fail(String.format(buRRRn.ASTUce.strings.expectedNotSame,formatted));}
buRRRn.ASTUce.Assertion._failNotSame=function(expected,actual,message)
{var formatted="";if(message!=null)
{formatted=message+" ";}
this.fail(String.format(buRRRn.ASTUce.strings.expectedSame,formatted,expected,actual));}
buRRRn.ASTUce.Assertion._failNotEquals=function(expected,actual,message)
{if(buRRRn.ASTUce.showObjectSource&&(expected!=null)&&(actual!=null))
{expected=expected.toSource();actual=actual.toSource();}
if(buRRRn.ASTUce.invertExpectedActual)
{var tmp=expected;expected=actual;actual=tmp;}
this.fail(buRRRn.ASTUce.Assertion.format(expected,actual,message));}
buRRRn.ASTUce.Assertion.format=function(expected,actual,message)
{var formatted="";if((message!=null)&&(message!=""))
{formatted=message+" ";}
return(String.format(buRRRn.ASTUce.strings.expectedButWas,formatted,expected,actual));}
buRRRn.ASTUce.AssertionFailedError=function(message)
{this.message=message;this.name="AssertionFailedError";}
buRRRn.ASTUce.AssertionFailedError.prototype=new Error();buRRRn.ASTUce.AssertionFailedError.prototype.constructor=buRRRn.ASTUce.AssertionFailedError;buRRRn.ASTUce.BaseTestRunner=function()
{this._suiteMethodName="suite";}
buRRRn.ASTUce.BaseTestRunner.prototype.clearStatus=function()
{}
buRRRn.ASTUce.BaseTestRunner.prototype.getTest=function(suiteCtorName)
{trace("getTest( \""+suiteCtorName+"\" )");if((suiteCtorName=="")||(suiteCtorName==null))
{trace("suiteCtorName is empty or null");this.clearStatus();return null;}
trace("suiteCtorName is NOT empty or null");var Reflection=buRRRn.Reflection;trace("alias Reflection");try
{if(!Reflection.hasConstructorByName(suiteCtorName))
{this.runFailed("Constructor not found \""+suiteCtorName+"\"");return null;}
trace("hasConstructorByName( suiteCtorName )");var ctor=Reflection.getConstructorByName(suiteCtorName);trace("ctor instancied");trace("ctor: "+ctor);}
catch(e)
{this.runFailed("Could not load \""+suiteCtorName+"\"");this.runFailed("    "+e.toString());return null;}
trace("no error in ctor instanciation");var suiteMethod=Reflection.getMethodByName(ctor,this._suiteMethodName);trace("suiteMethod instancied");trace("suiteMethod: "+suiteMethod);if(suiteMethod==null)
{trace("suiteMethod == null");trace("try to extract a test suite automatically");this.clearStatus();return new buRRRn.ASTUce.TestSuite(ctor);}
try
{var test=suiteMethod();}
catch(e)
{this.runFailed("Failed to invoke suite():"+e);return null;}
this.clearStatus();return test;}
buRRRn.ASTUce.ComparisonFailure=function(expected,actual,message)
{buRRRn.ASTUce.AssertionFailedError.call(this,message);this.name="ComparisonFailure";this.expected=expected;this.actual=actual;}
buRRRn.ASTUce.ComparisonFailure.prototype=new buRRRn.ASTUce.AssertionFailedError();buRRRn.ASTUce.ComparisonFailure.prototype.constructor=buRRRn.ASTUce.ComparisonFailure;buRRRn.ASTUce.ComparisonFailure.prototype.getMessage=function()
{if((this.expected==null)||(this.actual==null))
{return buRRRn.ASTUce.Assertion.format(this.expected,this.actual,this.message);}
var expected,actual,end,dots,i,j,k;expected="";actual="";end=Math.min(this.expected.length,this.actual.length);dots="...";for(i=0;i<end;i++)
{if(this.expected.charAt(i)!=this.actual.charAt(i))
{break;}}
j=this.expected.length-1;k=this.actual.length-1;for(;k>=i&&j>=i;k--,j--)
{if(this.expected.charAt(j)!=this.actual.charAt(k))
{break;}}
if(j<i&&k<i)
{expected=this.expected;actual=this.actual;}
else
{expected=this.expected.substring(i,j+1);actual=this.actual.substring(i,k+1);if(i<=end&&i>0)
{expected=dots+expected;actual=dots+actual;}
if(j<this.expected.length-1)
{expected=expected+dots;}
if(k<this.actual.length-1)
{actual=actual+dots;}}
return buRRRn.ASTUce.Assertion.format(expected,actual,this.message);}
buRRRn.ASTUce.config={};buRRRn.ASTUce.config.verbose=true;buRRRn.ASTUce.config.showConstructorList=true;buRRRn.ASTUce.config.showObjectSource=true;buRRRn.ASTUce.config.invertExpectedActual=false;buRRRn.ASTUce.config.testInheritedTests=true;buRRRn.ASTUce.config.testPrivateMethods=false;buRRRn.ASTUce.config.testMyself=false;buRRRn.ASTUce.ITest=function()
{}
buRRRn.ASTUce.ITest.prototype.countTestCases=function()
{}
buRRRn.ASTUce.ITest.prototype.run=function(result)
{}
buRRRn.ASTUce.ITestListener=function()
{}
buRRRn.ASTUce.ITestListener.prototype.addError=function(test,e)
{}
buRRRn.ASTUce.ITestListener.prototype.addFailure=function(test,afe)
{}
buRRRn.ASTUce.ITestListener.prototype.endTest=function(test)
{}
buRRRn.ASTUce.ITestListener.prototype.startTest=function(test)
{}
buRRRn.ASTUce.Protectable=function()
{}
buRRRn.ASTUce.Protectable.prototype.protect=function()
{}
buRRRn.ASTUce.ResultPrinter=function(writer)
{this.writer=trace;this.column=0;if((writer!=null)&&(typeof writer=="function"))
{this.writer=writer;}}
buRRRn.ASTUce.ResultPrinter.prototype.writeLine=function(message)
{var writer;writer=this.getWriter();writer(message);}
buRRRn.ASTUce.ResultPrinter.prototype.print=function(result,runTime)
{this.printHeader(runTime);this.printErrors(result);this.printFailures(result);this.printFooter(result);}
buRRRn.ASTUce.ResultPrinter.prototype.printHeader=function(runTime)
{this.writeLine("");this.writeLine(String.format(buRRRn.ASTUce.strings.PrtTime,this.elapsedTimeAsString(runTime)));}
buRRRn.ASTUce.ResultPrinter.prototype.printErrors=function(result)
{this.printDefects(result.errors(),result.errorCount(),buRRRn.ASTUce.strings.nameError);}
buRRRn.ASTUce.ResultPrinter.prototype.printFailures=function(result)
{this.printDefects(result.failures(),result.failureCount(),buRRRn.ASTUce.strings.nameFailure);}
buRRRn.ASTUce.ResultPrinter.prototype.printDefects=function(booBoos,count,type)
{var i;if(count==0)
{return;}
if(count==1)
{this.writeLine("");this.writeLine(String.format(buRRRn.ASTUce.strings.PrtOneDefect,count,type));}
else
{this.writeLine("");this.writeLine(String.format(buRRRn.ASTUce.strings.PrtMoreDefects,count,type));}
for(i=0;i<booBoos.length;i++)
{this.printDefectHeader(booBoos[i],i);this.printDefectTrace(booBoos[i]);}}
buRRRn.ASTUce.ResultPrinter.prototype.printDefectHeader=function(booBoo,count)
{this.writeLine(count+") "+booBoo.failedTest());}
buRRRn.ASTUce.ResultPrinter.prototype.printDefectTrace=function(booBoo)
{this.writeLine(booBoo.thrownException());this.writeLine("");}
buRRRn.ASTUce.ResultPrinter.prototype.printFooter=function(result)
{if(result.wasSuccessful()==true)
{this.writeLine("");this.writeLine(String.format(buRRRn.ASTUce.strings.PrtOK,result.runCount(),(result.runCount()==1?"":"s")));}
else
{this.writeLine("");this.writeLine(buRRRn.ASTUce.strings.PrtFailure);this.writeLine(String.format(buRRRn.ASTUce.strings.PrtFailureDetails,result.runCount(),result.failureCount(),result.errorCount()));}
this.writeLine("");}
buRRRn.ASTUce.ResultPrinter.prototype.elapsedTimeAsString=function(runTime)
{var dat,ms,s,m,h;dat=new Date(runTime.valueOf());ms=dat.getUTCMilliseconds();s=dat.getUTCSeconds();m=dat.getUTCMinutes();h=dat.getUTCHours();return String.format(buRRRn.ASTUce.strings.PrtElapsedTime,h,m,s,ms);}
buRRRn.ASTUce.ResultPrinter.prototype.getWriter=function()
{return this.writer}
buRRRn.ASTUce.ResultPrinter.prototype.addError=function(test,e)
{this.writeLine("E");}
buRRRn.ASTUce.ResultPrinter.prototype.addFailure=function(test,afe)
{this.writeLine("F");}
buRRRn.ASTUce.ResultPrinter.prototype.endTest=function(test)
{}
buRRRn.ASTUce.ResultPrinter.prototype.startTest=function(test)
{}
buRRRn.ASTUce.Runner=function(writer)
{this.printer=new buRRRn.ASTUce.ResultPrinter(writer);}
buRRRn.ASTUce.Runner.prototype=new buRRRn.ASTUce.BaseTestRunner();buRRRn.ASTUce.Runner.prototype.constructor=buRRRn.ASTUce.Runner;buRRRn.ASTUce.Runner.displayHeader=function()
{buRRRn.ASTUce.info(true,true);}
buRRRn.ASTUce.Runner.prototype.getTestName=function(any)
{if(any==null)
{return"null";}
if((any instanceof String)||(typeof any=="string"))
{return any;}
if((any instanceof buRRRn.ASTUce.TestSuite)||(any instanceof buRRRn.ASTUce.TestCase))
{return any.name;}
if(typeof any=="function")
{return buRRRn.Reflection.getObjectPath(any);}
return"";}
buRRRn.ASTUce.Runner.prototype.runFailed=function(message)
{trace(message);}
buRRRn.ASTUce.Runner.prototype.displayInfos=function(suite,result)
{if(buRRRn.ASTUce.config.showConstructorList)
{trace(suite);}}
buRRRn.ASTUce.Runner.prototype.doRun=function(suite)
{var result=new buRRRn.ASTUce.TestResult();result.addListener(this.printer);var startTime=new Date().valueOf();suite.run(result);var endTime=new Date().valueOf();var runTime=endTime-startTime;this.printer.print(result,runTime);this.displayInfos(suite,result);return result;}
buRRRn.ASTUce.Runner.main=function()
{var result;var runner=new buRRRn.ASTUce.Runner();var suiteName;this.displayHeader();for(var i=0;i<arguments.length;i++)
{suiteName=runner.getTestName(arguments[i]);trace(String.format("[{0}] #{1}",suiteName,i));try
{result=buRRRn.ASTUce.Runner.run(arguments[i],runner);}
catch(e)
{runner.runFailed(String.format("Could not create and run test suite #{0}.",i));runner.runFailed(String.format("    {0}",e.toString()));}
trace(buRRRn.ASTUce.strings.separator);}}
buRRRn.ASTUce.Runner.run=function(test,runner)
{if(runner==null)
{runner=new buRRRn.ASTUce.Runner();this.displayHeader();}
var suite;if(test==null)
{throw new Error("test is null");}
if((test instanceof String)||(typeof test=="string"))
{suite=runner.getTest(test);return runner.doRun(suite);}
if((test instanceof buRRRn.ASTUce.TestCase)||(test instanceof buRRRn.ASTUce.TestSuite))
{suite=test;}
if((typeof test=="function")||(typeof test=="object"))
{var staticSuite=buRRRn.Reflection.getMethodByName(test,"suite");if(staticSuite!=null)
{suite=staticSuite();}
else
{suite=new buRRRn.ASTUce.TestSuite(test);}}
return runner.doRun(suite);}
if(!buRRRn.ASTUce.samples)
{buRRRn.ASTUce.samples={};}
if(!buRRRn.ASTUce.strings)
{buRRRn.ASTUce.strings={};}
buRRRn.ASTUce.strings.separator="----------------------------------------------------------------";buRRRn.ASTUce.strings.expectedNotSame="{0}expected not same";buRRRn.ASTUce.strings.expectedSame="{0}expected same:<{1}> was not:<{2}>";buRRRn.ASTUce.strings.expectedButWas="{0}expected:<{1}> but was:<{2}>";buRRRn.ASTUce.strings.methodNameNull="The method name is null";buRRRn.ASTUce.strings.methodNameUndef="The method name is undefined";buRRRn.ASTUce.strings.methodNotFound="Method \"{0}\" not found";buRRRn.ASTUce.strings.methodshouldBePublic="Method \"{0}\" should be public";buRRRn.ASTUce.strings.objectNotCtor="Object \"{0}\" is not a constructor";buRRRn.ASTUce.strings.ctorNotPublic="Constructor \"{0}\" is not public";buRRRn.ASTUce.strings.noTestsFound="No tests found in \"{0}\"";buRRRn.ASTUce.strings.argTestDoesNotExist="the argument \"test\" does not exist in the objects namespace (check your includes!)";buRRRn.ASTUce.strings.argTestNotATest="the argument \"test\" does not inherit from TestCase or TestSuite";buRRRn.ASTUce.strings.testMethNotPublic="Test method \"{0}\" isn't public";buRRRn.ASTUce.strings.canNotCreateTest="Cannot instantiate \"{0}\" test case";buRRRn.ASTUce.strings.nameError="error";buRRRn.ASTUce.strings.nameFailure="failure";buRRRn.ASTUce.strings.PrtTime="Time: {0}";buRRRn.ASTUce.strings.PrtElapsedTime="{0}h:{1}mn:{2}s:{3}ms";buRRRn.ASTUce.strings.PrtOneDefect="There was {0} {1}:";buRRRn.ASTUce.strings.PrtMoreDefects="There were {0} {1}s:";buRRRn.ASTUce.strings.PrtOK="OK ({0} test{1})";buRRRn.ASTUce.strings.PrtFailure="FAILURES!!!";buRRRn.ASTUce.strings.PrtFailureDetails="Tests run: {0},  Failures: {1},  Errors: {2}";buRRRn.ASTUce.TestCase=function(name)
{this._name=name;}
buRRRn.ASTUce.TestCase.prototype=buRRRn.ASTUce.Assertion;buRRRn.ASTUce.TestCase.prototype.constructor=buRRRn.ASTUce.TestCase;buRRRn.ASTUce.TestCase.prototype.countTestCases=function()
{return 1;}
buRRRn.ASTUce.TestCase.prototype.createResult=function()
{return new buRRRn.ASTUce.TestResult();}
buRRRn.ASTUce.TestCase.prototype.run=function(result)
{if(result==null)
{result=this.createResult();}
result.run(this);return result;}
buRRRn.ASTUce.TestCase.prototype.runBare=function()
{this.setUp();try
{this.runTest();}
finally
{this.tearDown();}}
buRRRn.ASTUce.TestCase.prototype.runTest=function()
{var runMethod;this.assertNotNull(this._name,buRRRn.ASTUce.strings.methodNameNull);this.assertNotUndefined(this._name,buRRRn.ASTUce.strings.methodNameUndef);try
{if(!this.hasProperty(this._name))
{throw new Error();}
runMethod=this[this._name];}
catch(e)
{this.fail(String.format(buRRRn.ASTUce.strings.methodNotFound,this._name));}
if(this._name.startsWith("_")&&(buRRRn.ASTUce.testPrivateMethods!=true))
{this.fail(String.format(buRRRn.ASTUce.strings.methodshouldBePublic,this._name));}
try
{runMethod.call(this);}
catch(e)
{throw e;}}
buRRRn.ASTUce.TestCase.prototype.setUp=function()
{}
buRRRn.ASTUce.TestCase.prototype.tearDown=function()
{}
buRRRn.ASTUce.TestCase.prototype.toString=function()
{return(buRRRn.Reflection.getConstructorName(this)+"( "+this.getName()+" )");}
buRRRn.ASTUce.TestCase.prototype.getName=function()
{if(this._name==undefined)
{this._name=buRRRn.Reflection.getObjectPath(this);}
return this._name;}
buRRRn.ASTUce.TestCase.prototype.setName=function(name)
{this._name=name;}
buRRRn.ASTUce.TestFailure=function(failedTest,thrownException)
{this._failedTest=failedTest;this._thrownException=thrownException;}
buRRRn.ASTUce.TestFailure.prototype.failedTest=function()
{return this._failedTest;}
buRRRn.ASTUce.TestFailure.prototype.thrownException=function()
{return this._thrownException;}
buRRRn.ASTUce.TestFailure.prototype.exceptionMessage=function()
{return this.thrownException().getMessage();}
buRRRn.ASTUce.TestFailure.prototype.isFailure=function()
{return(this.thrownException()instanceof buRRRn.ASTUce.AssertionFailedError);}
buRRRn.ASTUce.TestFailure.prototype.toString=function()
{return(this.failedTest()+": "+this.exceptionMessage());}
buRRRn.ASTUce.TestFailure.prototype.trace=function()
{trace(this.toSource());}
buRRRn.ASTUce.TestResult=function()
{this._failures=[];this._errors=[];this._listeners=[];this._runTests=0;this._stop=false;}
buRRRn.ASTUce.TestResult.prototype.addError=function(test,e)
{var i,listeners;this._errors.push(new buRRRn.ASTUce.TestFailure(test,e));listeners=this.cloneListeners();for(i=0;i<listeners.length;i++)
{listeners[i].addError(test,e);}}
buRRRn.ASTUce.TestResult.prototype.addFailure=function(test,afe)
{var i,listeners;this._failures.push(new buRRRn.ASTUce.TestFailure(test,afe));listeners=this.cloneListeners();for(i=0;i<listeners.length;i++)
{listeners[i].addFailure(test,afe);}}
buRRRn.ASTUce.TestResult.prototype.addListener=function(listener)
{this._listeners.push(listener);}
buRRRn.ASTUce.TestResult.prototype.removeListener=function(listener)
{var index;index=this._listeners.indexOf(listener);if(index>-1)
{this._listeners.splice(index,1);}}
buRRRn.ASTUce.TestResult.prototype.cloneListeners=function()
{return this._listeners.clone();}
buRRRn.ASTUce.TestResult.prototype.endTest=function(test)
{var listeners,i;listeners=this.cloneListeners();for(i=0;i<listeners.length;i++)
{listeners[i].endTest(test);}}
buRRRn.ASTUce.TestResult.prototype.errorCount=function()
{return this._errors.length;}
buRRRn.ASTUce.TestResult.prototype.errors=function()
{return this._errors;}
buRRRn.ASTUce.TestResult.prototype.failureCount=function()
{return this._failures.length;}
buRRRn.ASTUce.TestResult.prototype.failures=function()
{return this._failures;}
buRRRn.ASTUce.TestResult.prototype.run=function(test)
{var p;this.startTest(test);p=new buRRRn.ASTUce.Protectable();p.protect=function()
{return test.runBare();}
this.runProtected(test,p);this.endTest(test);}
buRRRn.ASTUce.TestResult.prototype.runProtected=function(test,p)
{try
{p.protect();}
catch(e)
{if(e instanceof buRRRn.ASTUce.AssertionFailedError)
{this.addFailure(test,e);}
else if(e instanceof Error)
{this.addError(test,e);}}}
buRRRn.ASTUce.TestResult.prototype.runCount=function()
{return this._runTests;}
buRRRn.ASTUce.TestResult.prototype.shouldStop=function()
{return this._stop;}
buRRRn.ASTUce.TestResult.prototype.startTest=function(test)
{var count,listeners,i;count=test.countTestCases();this._runTests+=count;listeners=this.cloneListeners();for(i=0;i<listeners.length;i++)
{listeners[i].startTest(test);}}
buRRRn.ASTUce.TestResult.prototype.stop=function()
{this._stop=true;}
buRRRn.ASTUce.TestResult.prototype.wasSuccessful=function()
{return((this.failureCount()==0)&&(this.errorCount()==0));}
buRRRn.ASTUce.TestSuite=function(theConstructor,name,simpleTrace)
{if(simpleTrace==null)
{simpleTrace=false;}
this.simpleTrace=simpleTrace;this._tests=[];this._name="Unknown";if((name!="")&&(name!=null))
{this._name=name;}
if(theConstructor==null)
{return;}
var strings=buRRRn.ASTUce.strings;var config=buRRRn.ASTUce.config;var Reflection=buRRRn.Reflection;if(Reflection.getTypeOf(theConstructor)=="string")
{try
{var originalCtor=theConstructor;theConstructor=Reflection.getConstructorByName(theConstructor);}
catch(e)
{this.setName(originalCtor);return;}}
if(theConstructor.prototype==null)
{this.addTest(this._warning(String.format(strings.objectNotCtor,Reflection.getObjectPath(theConstructor))));return;}
var ctorName=Reflection.getObjectPath(theConstructor);if(ctorName.startsWith("_"))
{this.addTest(this._warning(String.format(strings.ctorNotPublic,ctorName)));return;}
if(name==null)
{this.setName(ctorName);}
else
{this.setName(name);}
var methods=Reflection.getConstructorMethods(theConstructor,config.testInheritedTests);for(var i=0;i<methods.length;i++)
{this._addTestMethod(methods[i],theConstructor);}
if(this.testCount()==0)
{this.addTest(this._warning(String.format(strings.noTestsFound,ctorName)));}}
buRRRn.ASTUce.TestSuite.prototype.addTest=function(test)
{if(test===undefined)
{this.addTest(this._warning(buRRRn.ASTUce.strings.argTestDoesNotExist));return;}
if((test instanceof buRRRn.ASTUce.TestCase)||(test instanceof buRRRn.ASTUce.TestSuite))
{this._tests.push(test);}
else
{this.addTest(this._warning(buRRRn.ASTUce.strings.argTestNotATest));}}
buRRRn.ASTUce.TestSuite.prototype.addTestSuite=function(testConstructor)
{this.addTest(new buRRRn.ASTUce.TestSuite(testConstructor));}
buRRRn.ASTUce.TestSuite.prototype._addTestMethod=function(method,theConstructor)
{var test;if(!this._isTestMethod(method))
{return;}
if(!this._isPublicTestMethod(method)&&(buRRRn.ASTUce.testPrivateMethods!=true))
{this.addTest(this._warning(String.format(buRRRn.ASTUce.strings.testMethNotPublic,method)));return;}
this.addTest(buRRRn.ASTUce.TestSuite.createTest(theConstructor,method));}
buRRRn.ASTUce.TestSuite.createTest=function(theConstructor,name)
{var test;if(theConstructor==null)
{return(this._warning(String.format(buRRRn.ASTUce.strings.canNotCreateTest,name)));}
if(theConstructor.prototype==null)
{this.addTest(this._warning(String.format(buRRRn.ASTUce.strings.objectNotCtor,buRRRn.Reflection.getObjectPath(theConstructor))));return;}
var path=buRRRn.Reflection.getObjectPath(theConstructor);var tmp=eval(path);var test=new tmp(name);return test;}
buRRRn.ASTUce.TestSuite.prototype.countTestCases=function()
{var count,tests,i;count=0;tests=this.tests();for(i=0;i<tests.length;i++)
{count+=tests[i].countTestCases();}
return count;}
buRRRn.ASTUce.TestSuite.prototype._isPublicTestMethod=function(method)
{return(this._isTestMethod(method)&&!method.startsWith("_"));}
buRRRn.ASTUce.TestSuite.prototype._isTestMethod=function(method)
{method=method.toLowerCase();return(method.startsWith("test")||method.startsWith("_test"));}
buRRRn.ASTUce.TestSuite.prototype.run=function(result)
{var test,tests,i;tests=this.tests();for(i=0;i<tests.length;i++)
{if(result.shouldStop())
{break;}
test=tests[i];this.runTest(test,result);}}
buRRRn.ASTUce.TestSuite.prototype.runTest=function(test,result)
{test.run(result);}
buRRRn.ASTUce.TestSuite.prototype.testAt=function(index)
{return this._tests[index];}
buRRRn.ASTUce.TestSuite.prototype.testCount=function()
{return this._tests.length;}
buRRRn.ASTUce.TestSuite.prototype.tests=function()
{return this._tests;}
buRRRn.ASTUce.TestSuite.prototype.toString=function(increment)
{var str,CRLF,TAB,SPC,i,j,tests,count;str="";CRLF="\n";TAB="\t";SPC=TAB;if(increment==null)
{increment=0;}
else
{for(j=0;j<increment;j++)
{SPC+=TAB;}
TAB=SPC;}
tests=this.tests();count=this.testCount();str+=this.getName();if(count>0)
{str+=CRLF+TAB+"{"+CRLF;if(this.simpleTrace)
{str+=TAB+this.countTestCases()+" Tests ..."+CRLF;}
else
{for(i=0;i<count;i++)
{if(tests[i]instanceof buRRRn.ASTUce.TestSuite)
{increment++;}
str+=TAB+tests[i].toString(increment)+CRLF;if(tests[i]instanceof buRRRn.ASTUce.TestSuite)
{increment--;}}}
str+=TAB+"}";}
return str;}
buRRRn.ASTUce.TestSuite.prototype.setName=function(name)
{this._name=name;}
buRRRn.ASTUce.TestSuite.prototype.getName=function()
{if(this._name==undefined)
{this._name=buRRRn.Reflection.getConstructorPath(this);}
return this._name;}
buRRRn.ASTUce.TestSuite.prototype._warning=function(message)
{var TC;TC=new buRRRn.ASTUce.TestCase("warning");TC.runTest=function()
{this.fail(message);}
return TC;}