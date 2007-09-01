@echo off
rem we use Milk v1.0.5
IF "%1"=="" (SET HOST=AS) ELSE (SET HOST=%1)
SET file=ASTUce_%HOST%.eden
rem echo [%HOST%]
rem echo [%file%]
IF EXIST %file% (bin\Milk.exe -c:ASTUce.eden -a:%file%) ELSE (echo "%file%" config file does not exist)
