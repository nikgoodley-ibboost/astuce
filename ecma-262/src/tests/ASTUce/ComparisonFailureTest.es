
/*
  The contents of this file are subject to the Mozilla Public License Version
  1.1 (the "License"); you may not use this file except in compliance with
  the License. You may obtain a copy of the License at 
  http://www.mozilla.org/MPL/ 
  
  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
  for the specific language governing rights and limitations under the License. 
  
  The Original Code is ASTUce: ActionScript Test Unit compact edition. 
  
  The Initial Developer of the Original Code is
  Zwetan Kjukov <zwetan@gmail.com>.
  Portions created by the Initial Developer are Copyright (C) 2004-2007
  the Initial Developer. All Rights Reserved.
  
  Contributor(s):
*/

tests.ASTUce.ComparisonFailureTest = function( name )
    {
    buRRRn.ASTUce.TestCase.call( this, name );
    }

tests.ASTUce.ComparisonFailureTest.prototype = new buRRRn.ASTUce.TestCase();
tests.ASTUce.ComparisonFailureTest.prototype.constructor = tests.ASTUce.ComparisonFailureTest;

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorMessage = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "b", "c", "a" );
    this.assertEquals( "a expected:<b> but was:<c>", failure.getMessage(), "CF_001" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorStartSame = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "ba", "bc", null );
    this.assertEquals( "expected:<...a> but was:<...c>", failure.getMessage(), "CF_002" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorEndSame = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "ab", "cb", null);
    this.assertEquals( "expected:<a...> but was:<c...>", failure.getMessage(), "CF_003" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorSame = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "ab", "ab", null );
	this.assertEquals( "expected:<ab> but was:<ab>", failure.getMessage(), "CF_004" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorStartAndEndSame = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "abc", "adc", null );
	this.assertEquals( "expected:<...b...> but was:<...d...>", failure.getMessage(), "CF_005" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorStartSameComplete = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "ab", "abc", null );
	this.assertEquals( "expected:<...> but was:<...c>", failure.getMessage(), "CF_006" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorEndSameComplete = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "bc", "abc", null );
	this.assertEquals( "expected:<...> but was:<a...>", failure.getMessage(), "CF_007" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorOverlapingMatches = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "abc", "abbc", null );
	this.assertEquals( "expected:<......> but was:<...b...>", failure.getMessage(), "CF_008" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorOverlapingMatches2 = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "abcdde", "abcde", null );
	this.assertEquals( "expected:<...d...> but was:<......>", failure.getMessage(), "CF_009" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorWithActualNull = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( "a", null, null );
	this.assertEquals( "expected:<a> but was:<null>", failure.getMessage(), "CF_010" );
    }

tests.ASTUce.ComparisonFailureTest.prototype.testComparisonErrorWithExpectedNull = function()
    {
    var failure = new buRRRn.ASTUce.ComparisonFailure( null, "a", null );
	this.assertEquals( "expected:<null> but was:<a>", failure.getMessage(), "CF_011" );
    }

