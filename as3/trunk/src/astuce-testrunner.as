
include "astuce.as";
include "astuce-test.as";

import buRRRn.ASTUce.Runner;
import buRRRn.ASTUce.metadata;
import buRRRn.ASTUce.samples.AllTests;
import buRRRn.ASTUce.samples.SimpleTest;
import buRRRn.ASTUce.tests.AllTests;

/* note:
   basic options to tune your output
*/
metadata.config.allowStackTrace     = true;
//metadata.config.allowErrorTrace     = false;
//metadata.config.showPrinterDetails  = false;
//metadata.config.showPrinterShortTests = false;
//metadata.config.showObjectSource = false;
metadata.config.showConstructorList = true;

metadata.about( false, true );

/* note:
   SimpleTest will generate error and failure
*/
//Runner.main( buRRRn.ASTUce.tests.AllTests.suite(),
//             buRRRn.ASTUce.samples.AllTests.suite(),
//             "buRRRn.ASTUce.samples.SimpleTest" );

Runner.main( buRRRn.ASTUce.tests.AllTests.suite(),
             buRRRn.ASTUce.samples.AllTests.suite() );
