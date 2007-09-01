
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

import buRRRn.ASTUce.strings;
import buRRRn.ASTUce.TestResult;
import buRRRn.ASTUce.TestFailure;
import buRRRn.ASTUce.ITest;
import buRRRn.ASTUce.AssertionFailedError;

/* Constructor: ResultPrinter
   (implements ITestListener)
*/
/*!## TODO: FIXME DOCUMENTATION */
class buRRRn.ASTUce.ResultPrinter implements buRRRn.ASTUce.ITestListener
    {
    
    private var _writer:Function;
    private var _column:Number;
    
    function ResultPrinter( writer:Function )
        {
        _writer = _global.trace; //default writer from core2
        _column = 0;
        
        if( (writer != null) && (GetTypeOf(writer) == "function") ) //core2
            {
            _writer = writer;
            }
        }
    
    /* Method: writeLine
    */
    function writeLine( message:String ):Void
        {
        var writer;
        writer = this.writer;
        writer( message );
        }
    
    /* Method: print
    */
    function print( result:TestResult, runTime:Number ):Void
        {
        printHeader( runTime );
        printErrors( result );
        printFailures( result );
        printFooter( result );
        }
    
    /* Method: printHeader
       
       note:
       the runTime parameter can either be a
       Number or a Date.
    */
    /*!## TODO: refactor using runTime.valueOf() */
    function printHeader( runTime:Number ):Void
        {
        writeLine( "" );
        writeLine( String.format( strings.PrtTime, elapsedTimeAsString( runTime ) ) ); //core2
        }
    
    /* Method: printErrors
    */
    function printErrors( result:TestResult ):Void
        {
        printDefects( result.errors, result.errorCount, strings.nameError );
        }
    
    /* Method: printFailures
    */
    function printFailures( result:TestResult ):Void
        {
        printDefects( result.failures, result.failureCount, strings.nameFailure );
        }
    
    /* Method: printDefects
    */
    function printDefects( booBoos:Array, /*Int*/ count:Number, type:String ):Void
        {
        var i;
        
        if( count == 0 )
            {
            return;
            }
        
        if( count == 1 )
            {
            writeLine( "" );
            writeLine( String.format( strings.PrtOneDefect, count, type ) ); //core2
            }
        else
            {
            writeLine( "" );
            writeLine( String.format( strings.PrtMoreDefects, count, type ) ); //core2
            }
        
        for( i=0; i<booBoos.length; i++ )
            {
            printDefectHeader( booBoos[i], i );
            printDefectTrace( booBoos[i] );
            }
        }
    
    /* Method: printDefectHeader
    */
    function printDefectHeader( booBoo:TestFailure, /*Int*/ count:Number ):Void
        {
        writeLine( count + ") " + booBoo.failedTest );
        }
    
    /* Method: printDefectTrace
    */
    function printDefectTrace( booBoo:TestFailure ):Void
        {
        /*!## TODO: find a way to have more detais about the code stack */
        //writeLine( booBoo.exceptionMessage ); //short error message
        writeLine( booBoo.thrownException ); //long error message
        writeLine( "" );
        }
    
    /* Method: printFooter
    */
    function printFooter( result:TestResult ):Void
        {
        if( result.wasSuccessful() == true )
            {
            writeLine( "" );
            writeLine( String.format( strings.PrtOK, result.runCount, (result.runCount == 1 ? "": "s") ) ); //core2
            }
        else
            {
            writeLine( "" );
            writeLine( strings.PrtFailure );
            writeLine( String.format( strings.PrtFailureDetails, result.runCount, result.failureCount, result.errorCount ) ); //core2
    		}
        
        writeLine( "" );
        }
    
    /* Method: elapsedTimeAsString
    */
    function elapsedTimeAsString( runTime:Number ):String
        {
        var dat, ms, s, m, h;
        dat = new Date( runTime.valueOf() );
        
        ms = dat.getUTCMilliseconds();
        s  = dat.getUTCSeconds();
        m  = dat.getUTCMinutes();
        h  = dat.getUTCHours();
        
        return String.format( strings.PrtElapsedTime, h, m, s, ms );
        }
    
    /* Getter: writer
    */
    function get writer():Function
        {
        return _writer
        }
    
    /* Method: addError
       see: <ITestListener.prototype.addError>
    */
    function addError( test:ITest, e:Error ):Void
        {
        writeLine( "E" );
        }
    
    /* Method: addFailure
       see: <ITestListener.addFailure>
    */
    function addFailure( test:ITest, afe:AssertionFailedError ):Void
        {
        writeLine( "F" );
        }
    
    /* Method: endTest
       see: <ITestListener.endTest>
    */
    function endTest( test:ITest ):Void
        {
        
        }
    
    /* Method: startTest
       see: <ITestListener.startTest>
    */
    function startTest( test:ITest ):Void
        {
        
        }
    
    }

