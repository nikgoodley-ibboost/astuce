
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

package buRRRn.ASTUce.framework
    {
    import system.Strings;
    import system.Reflection;
    
    import buRRRn.ASTUce.strings;
    
    /* A test case define the fixture to run multiple tests.
       
       To define a test case:
       ...TODO: complete the doc
       
       See <TestResult>, <TestSuite>.
    */
    public class TestCase extends Assert implements ITest
        {
        
        /* the name of the test case
        */
        private var _name:String;
        
        /* Constructs a test case with the given name if provided.
        */
        public function TestCase( name:String = "" )
            {
            _name = name;
            }
        
        /* Counts the number of test cases executed by run( result:TestResult ).
        */
        public function get countTestCases():int
            {
            return 1;
            }
        
        /* Gets the name of a TestCase
        */
        public function get name():String
            {
            return _name;
            }
        
        /* Sets the name of a TestCase
        */
        public function set name( value:String ):void
            {
            _name = value;
            }
        
        /* Creates a default TestResult object.
        */
        protected function createResult():TestResult
            {
            return new TestResult();
            }
        
        /* Runs the test case and collects the results in TestResult.
           If the TestResult is not provided use the default TestResult object.
        */
        public function run( result:TestResult ):void
            {
            if( result == null )
                {
                result = createResult();
                }
            
            result.run( this );
            }
        
        /* Runs the bare test sequence.
        */
        public function runBare():void
            {
            this["setUp"]();
            
            try
                {
                runTest();
                }
            /* attention:
               for debugging only !!
            
              catch( e:Error )
                {
                trace( e );
                }*/
            finally
                {
                this["tearDown"]();
                }
            }
        
        /* Override to run the test and assert its state.
           
           note:
           sometimes you need a TestCase which will always have
           thesame behaviour, for example "always throw an Error"
           so to do that you will need to override this method.
           
           Also, if you just need that class as a helper class
           inside only one test class, then just declare it as
           internal after the package declaration.
           
           example:
           (code)
            package
                {
                //your main public code here
                }
            
            import buRRRn.ASTUce.framework.TestCase;
            
            internal class ErrorTestCase extends TestCase
                {
                
                public function ErrorTestCase( name:String = "" )
                    {
                    super( name );
                    }
                
                //this class will always throw an error when run
                override protected function runTest():void
                    {
                    throw new Error();
                    }
                
                }
           (end)
        */
        protected function runTest():void
            {
            assertNotNull( _name, strings.methodNameNull );
            //assertNotUndefined( _name, strings.methodNameUndef );
            assertTrue( _name != "", strings.methodNameEmpty );
            
            var runMethod:Function;
            
            try
                {
                if( this[ _name ] == undefined )
                    {
                    throw new Error();
                    }
                
                runMethod = this[ _name ];
                }
            catch( e:Error )
                {
                fail( Strings.format( strings.methodNotFound, _name ) );
                }
            
            try
                {
                runMethod.call( this );
                }
            catch( e:Error )
                {
                throw e;
                }
            }
        
        /* Sets up the fixture, for example, open a network connection.
           This method is called before a test is executed.
           
           note:
           Yes, this method is declared in the prototype on purpose,
           so when you want to add a setUp method you just need to
           write
           (code)
           public function setUp():void
               {
               
               }
           (end)
           and not
           (code)
           override public function setUp():void
               {
               
               }
           (end)
           
           This is because ECMAScript 4 has a nifty feature which
           give priority to a function declared in the class over
           a function declared in the class prototype.
           
           With this setting we can call "this.setUp()" from
           the runBare method without obtaining an error about a missing method,
           and "override" the method in a subclass without the need for an
           override keyword (more userfriendly imho) and without a compiler error
           about an "incompatible override".
           
           No, this is not a hack, this is a prototype-based language feature ;).
        */
        prototype.setUp = function():void
            {
            
            }
        
        /* Tears down the fixture, for example, close a network connection.
           This method is called after a test is executed.
        */
        prototype.tearDown = function():void
            {
            
            }
        
        /* Returns a string representation of the test case
        */
        public function toString( ...args ):String
            {
            var classname:String = Reflection.getClassName( this );
            return name + "( " + classname + " )";
            }
        
        }
    
    }

