@echo off
copy /D /A buRRRn\ASTUce.es+buRRRn\ASTUce\config.es+buRRRn\ASTUce\strings.es+buRRRn\ASTUce\Assertion.es+buRRRn\ASTUce\AssertionFailedError.es+buRRRn\ASTUce\ComparisonFailure.es+buRRRn\ASTUce\ITest.es+buRRRn\ASTUce\ITestListener.es+buRRRn\ASTUce\Protectable.es+buRRRn\ASTUce\TestCase.es+buRRRn\ASTUce\TestFailure.es+buRRRn\ASTUce\TestResult.es+buRRRn\ASTUce\TestSuite.es ASTUce_v1.1.0_tmp.es
..\bin\jsjuicer -smc "ASTUce v1.1.0" ASTUce_v1.1.0.es ASTUce_v1.1.0_tmp.es
del ASTUce_v1.1.0_tmp.es