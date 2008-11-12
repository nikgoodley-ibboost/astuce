@project_fullname@
==========================================
You can find the latest version of @project_name@ on @project_url@

@project_name@ is a regression testing framework inspired by the xUnit architecture.
This framework is intended for developers who wish to implement unit tests in ActionScript 3.0.
(you can also find other implementation on the project page for JS/AS1/AS2)

Dependencies
============
@project_name@ reuse part of the maashaack framework,
which we embedd in our SWC.

Installation from sources
=========================

from subversion you can do
$svn co @project_url@/trunk astuce
or
$svn co @project_url@/tags/0.1 astuce-v0.1

you will also need to checkout the maashaack framework
http://maashaack.googlecode.com


Installation for Flash CS3
==========================
Before you begin to use @project_name@ within Flash CS3,
you first need to add the @project_name@ SWC to Flash CS3.

To do so:
1. If you have Flash CS3 currently open, NO NEED to quit the application.

2. Navigate to the location where you unzipped the @project_name@ zip
   and find the swc (e.g. lib/ASTUce.swc).

3. Copy the SWC file there:
   - (Windows) C:\Program Files\Adobe\ Adobe Flash CS3\language\Configuration\Components
   - (Mac OS X) Macintosh HD/Applications/Adobe Flash CS3/Configuration/Components

4. In the Component panel options click "reload".

Flash CS3 is now set up to support @project_fullname@.

Installation for Flex Builder 3
===============================
Before you can compile your code, you will need to link it to the @project_shortname@ SWC file.

To do so:
1. select Project->Properties.
   A Properties dialog box will appear for your project.
   Click on Flex Build Path and then select the Library Path tab:

2. Click Add SWC... within the Library Path pane.
   An Add SWC dialog box will appear.
   Navigate to the location where you unzipped the @project_shortname@ zip
   and select lib/ASTUce.swc file and click OK.

or

Just drop the ASTUce.swc file into your Flex project /libs directory

Documentation
=============
Documentation of the @project_fullname@ is in the /doc directory.
You can also find more informations on the project wiki
@project_wiki@

Problem
=======
Please send any usage questions to @project_group@
Please report issues to @project_maintenance@ (precise the version @release_version@)
