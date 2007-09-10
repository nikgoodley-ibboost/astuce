@echo off
set NAME=ASTUce
set VERSION=1.1.0
set WEB=http://code.google.com/p/astuce/
set LICENCE=MPL 1.1
set DEBUG=0

if "%1"=="debug" (
set DEBUG=1
)

echo debug=%DEBUG%

echo [build framework v%VERSION%]
copy /D buRRRn\ASTUce.es+buRRRn\ASTUce\*.es /A %NAME%_v%VERSION%_tmp.es /A

if "%DEBUG%"=="0" (
..\bin\jsjuicer -smc "ASTUce v%VERSION% - %WEB% (%LICENCE%)" ASTUce_v%VERSION%.es ASTUce_v%VERSION%_tmp.es
) else (
  if exist ASTUce_v%VERSION%_debug.es (
  del ASTUce_v%VERSION%_debug.es
  )
type ASTUce_v%VERSION%_tmp.es >> ASTUce_v%VERSION%_debug.es
type EOF.txt >> ASTUce_v%VERSION%_debug.es
)
del ASTUce_v%VERSION%_tmp.es
echo ----------------

echo [build samples v%VERSION%]
copy /D buRRRn\ASTUce\samples.es+buRRRn\ASTUce\samples\*.es /A ASTUce.samples_v%VERSION%_tmp.es  /A

if "%DEBUG%"=="0" (
..\bin\jsjuicer -smc "ASTUce.samples v%VERSION% - %WEB% (%LICENCE%)" ASTUce.samples_v%VERSION%.es ASTUce.samples_v%VERSION%_tmp.es
) else (
  if exist ASTUce.samples_v%VERSION%_debug.es (
  del ASTUce.samples_v%VERSION%_debug.es
  )
type ASTUce.samples_v%VERSION%_tmp.es >> ASTUce.samples_v%VERSION%_debug.es
type EOF.txt >> ASTUce.samples_v%VERSION%_debug.es
)
del ASTUce.samples_v%VERSION%_tmp.es
echo ----------------

echo [build tests v%VERSION%]
copy /D tests\ASTUce.es+tests\ASTUce\*.es /A tests.ASTUce_v%VERSION%_tmp.es /A

if "%DEBUG%"=="0" (
..\bin\jsjuicer -smc "tests.ASTUce v%VERSION% - %WEB% (%LICENCE%)" tests.ASTUce_v%VERSION%.es tests.ASTUce_v%VERSION%_tmp.es
) else (
  if exist tests.ASTUce_v%VERSION%_debug.es (
  del tests.ASTUce_v%VERSION%_debug.es
  )
type tests.ASTUce_v%VERSION%_tmp.es >> tests.ASTUce_v%VERSION%_debug.es
type EOF.txt >> tests.ASTUce_v%VERSION%_debug.es
)
del tests.ASTUce_v%VERSION%_tmp.es
echo ----------------