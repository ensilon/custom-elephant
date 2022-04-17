# custom-elephant

dev environment:
-Ubuntu 21.04
-Eclipse.org 2022-03 Eclipse IDE for Enterprise Java and Web Developers
-Wildfly.org 26.0.1.Final
-OpenJDK 11
-git

steps:
-unzip Wildfly, add to Eclipse workspace config
-git checkout
-import projects
-set jre to OpenJDK 11 for workspace, wildfly
-Project Explorer - right-click elephant-ear - Run As - Server
-Server perspective, elephant-ear - Full publish
-test in browser http://localhost:8080/elephWeb

