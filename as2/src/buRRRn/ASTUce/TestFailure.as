
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License AS2. 
  
  The Original Code is ASTUce: ActionScript Test Unit compact edition. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2006
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

import buRRRn.ASTUce.ITest;
import buRRRn.ASTUce.AssertionFailedError;

/* Constructor: TestFailure
   A TestFailure collects a failed test together with
   the caught exception.
*/
/*!## TODO:
      - refactor some methods to replace them with getter/setter
      - or suppress getter/setter and use ECMAScript natural way of doing things!
*/
class buRRRn.ASTUce.TestFailure
    {
    
    private var _failedTest:ITest;
    private var _thrownException:Error;
    
    function TestFailure( failedTest:ITest, thrownException:Error )
        {
        _failedTest      = failedTest;
        _thrownException = thrownException;
        }
    
    /* Getter: failedTest
       Gets the failed test.
    */
    function get failedTest()
        {
        return _failedTest;
        }
    
   /* Getter: thrownException
       Gets the thrown exception.
    */
    function get thrownException()
        {
        return _thrownException;
        }
    
    /* Getter: exceptionMessage
    */
    function get exceptionMessage():String
        {
        return thrownException.getMessage();
        }
    
    /* Method: isFailure
       Returns a Boolean indicating if the
       failure was an AssertionFailedError.
    */
    function isFailure():Boolean
        {
        return( thrownException instanceof AssertionFailedError );
        }
    
    /* Method: toString
       Returns a short description of the failure.
    */
    function toString():String
        {
        return( failedTest + ": " + exceptionMessage );
        }
    
    /* Method: trace
    */
    /*!## TODO: remove useless method ? */
    function trace():Void
        {
        trace( toSource() ); //core2
        }
    
    }

