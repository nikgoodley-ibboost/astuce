
include "astuce.as";
include "astuce-test.as";

import library.ASTUce.Runner;
import library.ASTUce.metadata;
import library.ASTUce.samples.AllTests;
import library.ASTUce.samples.SimpleTest;
import library.ASTUce.tests.AllTests;

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
//Runner.main( library.ASTUce.tests.AllTests.suite(),
//             library.ASTUce.samples.AllTests.suite(),
//             "library.ASTUce.samples.SimpleTest" );

Runner.main( library.ASTUce.tests.AllTests.suite(),
             library.ASTUce.samples.AllTests.suite() );
