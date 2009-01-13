@project_fullname@
==========================================
You can find the latest version of @project_name@ on @project_url@

@project_name@ is a regression testing framework inspired by the xUnit architecture.
This framework is intended for developers who wish to implement unit tests in ActionScript 3.0.
(you can also find other implementation on the project page for JS/AS1/AS2)

@project_name@ provide 3 executables to run AS3 unit tests on the command line

  ASTUce     for OS X
  ASTUce.nix for Linux
  ASTUce.exe for Windows

Dependencies
============
@project_name@ reuse part of the maashaack framework (http://maashaack.googlecode.com).
@project_name@ reuse the redtamarin shell (http://redtamarin.googlecode.com).

The exe on all operating system have no dependencies (just drag n drop n use).

Installation from sources
=========================

from subversion you can do
$svn co @project_url@/svn/cli/trunk/ astuce-cli
or
$svn co @project_url@/svn/cli/tags/0.1 astuce-cli-v0.1

and then use ant to build

Some basic usage and infos
==========================

@project_name@ work in sync with the AS3 library of the same name,
that means no it will not run unit tests written with FlexUnit, AsUnit, etc.

@project_name@ is not an AS3 compiler, so to be able to run
your AS3 unit tests you will need to compile them first
or provide *.swf or *.abc files that contains pre-compiled unit tests.

example:
  1. use Flex Builder or Flash IDE
  2. define your unit tests with the ASTUce library
  3. generate a *.swf, mytests.swf
  4. use ASTUce
     to load the *.swf containing the tests
     and to execute your TestCase or TestSuite (or static suite() method)
     $ ./ASTUce -l:mytests.swf my.package.AllTests

Documentation
=============
You can also find more informations on the project wiki
@project_wiki@

Problem
=======
Please send any usage questions to @project_group@
Please report issues to @project_maintenance@ (precise the version CLI @release_version@)

