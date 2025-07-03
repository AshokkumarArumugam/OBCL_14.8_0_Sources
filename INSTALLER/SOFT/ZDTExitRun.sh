echo "shell script"

function BEGIN()
(
echo "in beginning"
echo "."
echo "Flex Cube UBS : Release 12.4.0.0.0 - Production on $TIME $DATE"
echo "."
echo "Copyright (c) 2016, Oracle Financial Services Software Ltd. All rights reserved."
echo "."
echo "FLEXCUBE INSTALLER running in *** EXEC *** mode"
echo "."
export InstallationShipment="EXEC"
#echo "Checking the write permissions....."
mkdir a
#echo "WRITE permission on the current Folder is not Avaialable. ${?}"
if [ "${?}" == 1 ]
then
	echo "WRITE permission on the current Folder is not Avaialable."
	echo "."
	 
	exit 
fi
echo "."

rmdir a 2> logs/build.log
if [ "${?}" == 1 ]
then
	echo "logs Directory missing"
	echo "Creating logs folder"
	echo "."
	mkdir logs	
fi
#echo "checking whether Installer is running....."
if [ -e ZDTExitRunChk.flg ]
then
	echo "Installer is already running."
	echo "Please manually delete the ZDTExitRunChk.flg file in order to continue."
	echo "."	
	exit
fi
#echo "Creating a new flag file....."
> ZDTExitRunChk.flg
#echo "sucessfully created the flag File."
echo "."
## export PATH=
export JAVA_HOME=
export ORACLE_HOME=
export APPSERVER_HOME=
export ApplicationType="EU"
START
)

function START()
(
export LOAD_ENV_VARIABLES=N
CURRDIR=`pwd`
FILE=$CURRDIR/logs/env.properties
if [ -f $FILE ];
then
GETENV
else
READJAVA
fi
)

function GETENV()
(
echo "."
echo "Environment Variables have been set previously."
echo "."
## Reading env.properties to fetch and set the previously set environment variables
. $FILE
## echo "File name is $FILE"
## echoing the previously set enviornment variables
echo "."
echo "JAVA_HOME = $JAVA_HOME"
echo "."
echo "APPSERVER_HOME = $APPSERVER_HOME"
echo "."
echo "ORACLE_HOME = $ORACLE_HOME"
echo "."
#JAVA_HOME=$javahome
javac -version 2> logs/build.log
echo "----------------------------------------------------"
export PATH=$JAVA_HOME/bin:$PATH
export ConfigPath=$ConfigPath
#export APPSERVER_HOME=$appserverhome
export PATH=$APPSERVER_HOME/bin:$PATH
if [ ! -d $CURRDIR/src/com/ofss/installer ]; then
	if [ ! -f $APPSERVER_HOME/server/lib/weblogic.jar ]; then
		echo "Deployment on WEBLOGIC Application Server will not be supported."
		echo "."
	fi
fi
#export WL_HOME=$WEBLOGIC_HOME
export PATH=$WEBLOGIC_HOME/bin:$PATH
#export ORACLE_HOME=$orahome
export PATH=$ORACLE_HOME/bin:$PATH
cd $ORACLE_HOME/jdbc/lib/
#Bug#31876599 
ojdbc=$( ls |find ojdbc*[0-9].jar|sort -n|tail -1)
cd $CURRDIR
if [ ! -f $ORACLE_HOME/jdbc/lib/$ojdbc ]; then
echo "Invalid ORACLE Home."
	if [ "$ORACLE_HOME" == '' ]
	then
		echo "@@@@@@ORACLE HOME NOT DEFINED@@@@@@"
	fi
	echo "Database Installation will not be supported."
fi
## Copying ojdbc.jar
if [ -f $ORACLE_HOME/jdbc/lib/$ojdbc ]; then
if [ ! -f Library/common/$ojdbc ]; then
cp $ORACLE_HOME/jdbc/lib/$ojdbc Library/common
fi
fi
LOAD_ENV_VARIABLES=Y
SETTINGENV
)

function READJAVA()
(
echo "########################################################################"
echo "."
export JAVA_HOME=
echo "Enter JAVA HOME Directory:"
read JAVA_HOME
export PATH=$JAVA_HOME/bin:$PATH
export JAVA_TOOL_OPTIONS=-Dfile.encoding=ISO-8859-1
java -version 2> logs/build.log
if [ "${?}" == 1 ]
then
	echo "Invalid Java Home."
	echo "."
	READJAVA 
fi
if [ "${?}" == 0 ]
then
if [ -f $JAVA_HOME/bin/java ]
then
	SETJAVA
else
echo "Invalid JAVA Home"
	READJAVA
fi
fi
)

function SETJAVA()
(
if [ "$JAVA_HOME" == '' ]
then
	echo "@@@@@@JAVAHOME NOT DEFINED@@@@@@"
	READJAVA 
else
	export PATH=$JAVA_HOME/bin:$PATH
	echo "Java Home Path has been set successfully."
	echo "."
	READAPPSERVER 	
fi
)



function READAPPSERVER()
(
echo "."
echo "########################################################################"
export APPSERVER_HOME=
echo "Enter Application Server Home:"
read APPSERVER_HOME
if [ ! -f $APPSERVER_HOME/server/lib/weblogic.jar ]; then
	if [ ! -f $APPSERVER_HOME/bin/wsadmin.sh ]; then
	echo "."
	echo "Invalid Application Server Home"
	echo "."
	READAPPSERVER
	else
	SETAPPSERVER
fi
	else
	SETAPPSERVER
fi	
)

function SETAPPSERVER()
(
	export PATH=$APPSERVER_HOME/bin:$PATH
	if [ -f $APPSERVER_HOME/server/lib/weblogic.jar ]; then
	export CLASSPATH=$WEBLOGIC_HOME/server/lib/weblogic.jar:$JAVA_HOME/lib/tools.jar:$CLASSPATH
	echo "WEBLOGIC Application Server Home has been set successfully."
	fi
	if [ -f $APPSERVER_HOME/bin/wsadmin.sh ]; then
	echo "WEBSPHERE Application Server Home has been set successfully."
	fi
	READORACLE
)

function READORACLE()
(
echo "."
echo "########################################################################"
export ORACLE_HOME=
echo "Enter ORACLE Home Directory:"
read ORACLE_HOME
cd $ORACLE_HOME/jdbc/lib/
#Bug#31876599 
ojdbc=$( ls |find ojdbc*[0-9].jar|sort -n|tail -1)
cd $CURRDIR
if [ ! -f $ORACLE_HOME/jdbc/lib/$ojdbc ]; then
echo "Invalid ORACLE Home."
	if [ "$ORACLE_HOME" == '' ]
	then
		echo "@@@@@@ORACLE HOME NOT DEFINED@@@@@@"
	fi
	READORACLE
else
SETORACLE
fi
)

function SETORACLE()
(
	echo "ORACLE Home has been set successfully."
	echo "."
	export PATH=$ORACLE_HOME/bin:$PATH
	## Copying ojdbc.jar
	cp $ORACLE_HOME/jdbc/lib/$ojdbc Library/common
	SETTINGENV
)

function SETTINGENV()
(	
	if [ -f $APPSERVER_HOME/server/lib/weblogic.jar ]; then
	export CLASSPATH=$APPSERVER_HOME/server/lib/weblogic.jar:$JAVA_HOME/lib/tools.jar:$CLASSPATH
	fi
	if [ -f $WEBLOGIC_HOME/server/lib/weblogic.jar ]; then
	export CLASSPATH=$WEBLOGIC_HOME/server/lib/weblogic.jar:$JAVA_HOME/lib/tools.jar:$CLASSPATH
	fi
	if [ "$InstallationShipment" == 'SOFT' ]
	then
	CONFPath
	fi
	CONFPath	
	CHECK_LOG_FOLDER
	exit
)

function CHECK_LOG_FOLDER()
(	
	##echo "Checking logs Folder....."
	cd logs >  logs/build.log
	##echo "--Current Folder--"
	cd ../
)

function CONFPath()
(
	if [ ! -e "$ConfigPath" ]
	then
	echo "Enter Valid Path of Configuration file:"
	read ConfigPath
	CONFPath
	else
	RUNINSTALLER
	fi
)

function RUNINSTALLER()
(
	if [ -f "ZDTExitRun.jar" ]
	then
	##echo $InstallationShipment
	export CLASSPATH=./ZDTExitRun.jar:$CLASSPATH
	echo "Running in Silent Mode"
	java com.ofss.genericsoftinstaller.common.ZDTExitRun "$InstallationShipment" "$ApplicationType" "$ConfigPath" "$JAVA_HOME" "$APPSERVER_HOME" "$ORACLE_HOME" "$WEBLOGIC_HOME" "$LOAD_ENV_VARIABLES"
	EXITINSTALLER
	else
	echo "Error!! ZDTExitRun.jar does not exist.It is required proceed further."
	EXITINSTALLER
	fi
)

echo "calling exit"
function EXITINSTALLER()
(
	echo "in exit"
	echo "Deleting the Flag file ZDTExitRunChk.flg."
	rm ZDTExitRunChk.flg
	export LOAD_ENV_VARIABLES=
	echo "Reading env.properties to fetch and set the previously set environment variables"
	. $FILE
	export VAREDITED=$varedited
	if [ "$VAREDITED" == "Y" ]
	then
	echo "@@@@@@ Restarting the INSTALLER @@@@@@@"
	./ZDTExitRun.sh
	fi
)

BEGIN