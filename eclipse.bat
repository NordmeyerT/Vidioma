call setenv.bat
set ECLIPSE=C:\IDE\eclipse-3.6.1-32

set WORKSPACE=C:\Projekte\.eclipse-3.6.1\vidioma
set JAVA_HOME=C:\IDE\jdk1.7.0_21

start %ECLIPSE%\eclipse\eclipse.exe -java %JAVA_HOME%\bin\javaw.exe -data %WORKSPACE%
rem -clean