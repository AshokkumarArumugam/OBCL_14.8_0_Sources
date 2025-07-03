echo "$1 $2 $3"
export silent=$1
export ApplicationType=$2
export ConfigPath=$3

function BEGIN()
(
echo "."
echo "Flex Cube UBS : Release 12.5.0.0.0 - Production on $TIME $DATE"
echo "."
echo "Copyright (c) 2016, Oracle Financial Services Software Ltd. All rights reserved."
echo "."
if [ -d src/com/ofss/installer ]
then
echo "FLEXCUBE INSTALLER running in *** SOFT *** mode"
echo "."
export InstallationShipment="SOFT"
else
echo "FLEXCUBE INSTALLER running in *** EXEC *** mode"
echo "."
export InstallationShipment="EXEC"
fi
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
if [ -e chk.flg ]
then
	echo "Installer is already running."
	echo "Please manually delete the chk.flg file in order to continue."
	echo "."
	
	exit
fi

#echo "Creating a new flag file....."
> chk.flg
#echo "sucessfully created the flag File."
echo "."

## export PATH=
export JAVA_HOME=
export ORACLE_HOME=
export APPSERVER_HOME=
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
if [ ! -f $ORACLE_HOME/jdbc/lib/ojdbc6.jar ]; then
echo "Invalid ORACLE Home."
	if [ "$ORACLE_HOME" == '' ]
	then
		echo "@@@@@@ORACLE HOME NOT DEFINED@@@@@@"
	fi
	echo "Database Installation will not be supported."
fi
## Copying ojdbc.jar
if [ -f $ORACLE_HOME/jdbc/lib/ojdbc6.jar ]; then
if [ ! -f Library/common/ojdbc6.jar ]; then
cp $ORACLE_HOME/jdbc/lib/ojdbc6.jar Library/common
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
	SETWLHOME 	
fi
)


function SETWLHOME()
(
if [ -f $WEBLOGIC_HOME/server/lib/weblogic.jar ]; then
	export PATH=$WEBLOGIC_HOME/bin:$PATH
	echo "WEBLOGIC Application Server Home has been set successfully."
	echo "."
	export CLASSPATH=$WEBLOGIC_HOME/server/lib/weblogic.jar;$JAVA_HOME/lib/tools.jar;$CLASSPATH;
	export APPSERVER_HOME=$WEBLOGIC_HOME
	export PATH=$WEBLOGIC_HOME/bin:$PATH
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
if [ ! -f $ORACLE_HOME/jdbc/lib/ojdbc6.jar ]; then
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
	cp $ORACLE_HOME/jdbc/lib/ojdbc6.jar Library/common
	SETTINGENV

)

function SETTINGENV()
(	
	CLEAR
	if [ -f $APPSERVER_HOME/server/lib/weblogic.jar ]; then
	export CLASSPATH=$APPSERVER_HOME/server/lib/weblogic.jar:$JAVA_HOME/lib/tools.jar:$CLASSPATH
	fi
	
	if [ -f $WEBLOGIC_HOME/server/lib/weblogic.jar ]; then
	export CLASSPATH=$WEBLOGIC_HOME/server/lib/weblogic.jar:$JAVA_HOME/lib/tools.jar:$CLASSPATH
	fi
	
	BUILD
	CHECK_LOG_FOLDER
	export RUNTYPE='DEPLOY'
	RUNINSTALLER
	exit
)


function CLEAR()
(
	echo "Clearing the compiled files....."

	echo "Clearing the jar file."
	rm /F FcubsInstaller.jar 2> logs/build.log
	
	echo "Clearing the compiled classes files."
	RD /S /Q classes 2> logs/build.log
	echo "."
)


function BUILD()  
(
	
	export CLASSPATH=./Library/common/commons-codec-1.17.1.jar:./Library/common/ojdbc6.jar:./Library/oracle/ucp.jar:./Library/common/log4j-core-2.24.1.jar:./Library/common/log4j-api-2.24.1.jar:./Library/common/commons-io-2.16.1.jar:$CLASSPATH
	
	echo "Building the jar file Starts...."
	echo "checking for classes folder"
	
	if [ -d ./classes ]
	then
	echo "classes folder exist"
	else
	mkdir classes
	fi
	
	echo "Copying the property files into Classes."
	cp -R src/log4j.properties 	./classes	
	
	echo "Creating Images directory under Classes."
	mkdir ./classes/Images
	
	echo "Copying Images from src folder to classes/Images."
	cp -R src/Images ./classes	
	
	echo "Creating META-INF directory under Classes."
	mkdir ./classes/META-INF
	
	echo "Copying MANIFEST.MF into Classes/META-INF."
	cp -R config/Jar_MANIFEST/MANIFEST.MF ./classes/META-INF
	
	cd classes
	
	echo "Building the jar file."
	jar -cMf ../FcubsInstaller.jar META-INF/MANIFEST.MF *
	cd ../
	
	#echo "Removing the Classes folder."
	# RD /S /Q classes	
	
	echo "Building jar is done."
	echo "."
	
)

function CHECK_LOG_FOLDER()
(	
	##echo "Checking logs Folder....."
	cd logs >  logs/build.log
	##echo "--Current Folder--"
	cd ../
)
	


function RUNINSTALLER()
(
	
	##echo $InstallationShipment
	export CLASSPATH=./FcubsInstaller.jar:$CLASSPATH
	if [ "$silent" == "/s" ]
	then
	echo "Running in Silent Mode"
	#java -jar FcubsInstaller.jar "$InstallationShipment" "$ApplicationType" "$ConfigPath" "$JAVA_HOME" "$APPSERVER_HOME" "$ORACLE_HOME" "$WEBLOGIC_HOME" "$LOAD_ENV_VARIABLES"
	java com.ofss.installer.FcubsInstaller "$InstallationShipment" "$ApplicationType" "$ConfigPath" "$JAVA_HOME" "$APPSERVER_HOME" "$ORACLE_HOME" "$WEBLOGIC_HOME" "$LOAD_ENV_VARIABLES"
	else
	echo "Running in UI Mode"
	#java -jar FcubsInstaller.jar "$JAVA_HOME" "$APPSERVER_HOME" "$ORACLE_HOME" "$WEBLOGIC_HOME" "$LOAD_ENV_VARIABLES"
	java com.ofss.installer.FcubsInstaller "$JAVA_HOME" "$APPSERVER_HOME" "$ORACLE_HOME" "$WEBLOGIC_HOME" "$LOAD_ENV_VARIABLES" "DEPLOY"
	fi
	EXITINSTALLER
)

function EXITINSTALLER()
(
	echo "Deleting the Flag file chk.flg."
	rm chk.flg
	export LOAD_ENV_VARIABLES=
	echo "Reading env.properties to fetch and set the previously set environment variables"
	. $FILE
	export VAREDITED=$varedited
	if [ "$VAREDITED" == "Y" ]
	then
	echo "@@@@@@ Restarting the INSTALLER @@@@@@@"
	./FcubsDeployInstaller.sh
	fi
)


BEGIN
