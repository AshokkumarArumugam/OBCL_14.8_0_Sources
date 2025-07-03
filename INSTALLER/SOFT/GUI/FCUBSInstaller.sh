echo "$1 $2 $3"
export silent=$1
export ApplicationType=$2
export ConfigPath=$3

function BEGIN()
(
echo "in beginning"
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
        chmod -R 777 logs
	
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
if [ ! -f Library/common/ucp.jar ]; then
cp $ORACLE_HOME/ucp/lib/ucp.jar Library/common
fi
if [ ! -f Library/common/oraclepki.jar ]; then
cp $ORACLE_HOME/jlib/oraclepki.jar Library/common
fi
if [ ! -f Library/common/osdt_cert.jar ]; then
cp $ORACLE_HOME/jlib/osdt_cert.jar Library/common
fi
if [ ! -f Library/common/osdt_core.jar ]; then	
cp $ORACLE_HOME/jlib/osdt_core.jar Library/common
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
	#READAPPSERVER
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
	cp $ORACLE_HOME/ucp/lib/ucp.jar Library/common
	cp $ORACLE_HOME/jlib/oraclepki.jar Library/common
	cp $ORACLE_HOME/jlib/osdt_cert.jar Library/common
	cp $ORACLE_HOME/jlib/osdt_core.jar Library/common
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
	
	if [ "$InstallationShipment" == 'SOFT' ]
	then
	COMPILE
	fi
	BUILD
	CHECK_LOG_FOLDER
	CHECKFORSILENT
	exit
)


function CLEAR()
(
	echo "Clearing the compiled files....."

	echo "Clearing the jar file."
	rm /F FcubsInstaller.jar 2> logs/build.log
	
	echo "Clearing the compiled classes files."
	if [ -d "src\com\ofss\installer" ]; then
	rm -rf classes 2> logs/build.log  #bug 26284499 
	fi
	echo "."
)


function COMPILE()
(
	echo "Compiling the sources Start..... "
	
	#echo "Create classes folder."	
	mkdir classes
	
	## echo $APPSERVER_HOME
	#echo "Setting class path to compile the sources."
	export CLASSPATH=./Library/common/commons-codec-1.17.1.jar:./Library/common/$ojdbc:./Library/oracle/ucp.jar:./Library/installer/ant-1.10.15/lib/ant-launcher.jar:./Library/installer/ant-1.10.15/lib/ant.jar:./Library/common/log4j-api-2.24.1.jar:./Library/application/sshd-core-2.14.0.jar:./Library/application/sshd-sftp-2.14.0.jar:./Library/application/sshd-common-2.14.0.jar:./Library/plugin-quartz/slf4j-api-2.0.16.jar:./Library/common/log4j-1.2-api-2.24.1.jar:./Library/common/log4j-api-2.24.1.jar:./Library/common/log4j-core-2.24.1.jar:./Library/common/commons-io-2.16.1.jar:./Library/installer/compiler_unshaded_deploy.jar:$CLASSPATH
	#echo "Classpath Sucessfully set.$CLASSPATH"
	echo $CLASSPATH
    #bug 26284499 : changed Entitydetails to entitydetails
	javac -encoding ISO-8859-1 -d ./classes src/com/ofss/installer/*.java src/com/ofss/installer/silent/*.java src/com/ofss/installer/common/build/*.java src/com/ofss/installer/common/compile/*.java src/com/ofss/installer/common/copy/*.java src/com/ofss/installer/common/propertyFile/*.java src/com/ofss/installer/common/deploy/*.java  src/com/ofss/installer/fcel/common/*.java src/com/ofss/installer/fcel/build/*.java src/com/ofss/installer/fcis/common/*.java src/com/ofss/installer/fcis/database/*.java src/com/ofss/installer/fcpm/database/*.java src/com/ofss/installer/fcubs/common/*.java src/com/ofss/installer/fcubs/database/*.java src/com/ofss/installer/gateway/common/*.java  src/com/ofss/installer/odt/common/*.java src/com/ofss/installer/odt/build/*.java src/com/ofss/installer/odt/database/*.java src/com/ofss/installer/fcubs/switchIntegration/*.java src/com/ofss/installer/fcubs/switchIntegration/monitorSetup/*.java src/com/ofss/installer/utility/*.java src/com/ofss/installer/common/database/*.java src/com/ofss/installer/executility/common/*.java src/com/ofss/installer/reportsDSN/common/*.java src/com/ofss/installer/rmanBckup/common/*.java src/com/ofss/installer/userCreation/common/*.java src/com/ofss/installer/scheduler/build/*.java src/com/ofss/installer/fisReports/common/*.java src/com/ofss/installer/ofsaaint/common/*.java  src/com/ofss/installer/fcm/build/*.java src/com/ofss/installer/blockChain/build/*.java  src/com/ofss/installer/paysch/build/*.java src\com\ofss\installer\depXML\common\*.java src/com/ofss/installer/entityDetails/common/*.java src/com/ofss/installer/oltp/build/*.java 2>> logs/build.txt
	if [ "${?}" == 1 ] 
	then	
		echo "."
		echo "*****************************************************"
		echo "****************COMPILATION FAILED*******************"
		echo "*****************************************************"
		echo "**Please refer the log file located under logs/build.log"
		echo "**Possible reason may be that one of the "
		echo "**library files are missing."
		echo "*****************************************************"
		echo "."	
		echo "Deleting the Flag file chk.flg."
		rm chk.flg
	fi	
		
	
	
	echo "Compiled sources successfully."
	echo "."
)


function BUILD()  
(
	
	echo "Building the jar file Starts...."
	
	echo "checking for classes folder"
	
	if [ -d ./classes ]
	then
	echo "classes folder exist"
	else
	mkdir classes
	fi
	
	echo "Copying the property files into Classes."
	cp -R src/log4j2.properties 	./classes	
	
	echo "Creating Images directory under Classes."
	mkdir classes/Images
	
	echo "Copying Images from src folder to classes/Images."
	cp -R src/Images ./classes	
	
	echo "Creating META-INF directory under Classes."
	mkdir classes/META-INF
	
	echo "Copying MANIFEST.MF into Classes/META-INF."
	cp -R config/Jar_MANIFEST/MANIFEST.MF ./classes/META-INF
	
	cd ./classes
	
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
	
function CHECKFORSILENT()
(	
	
	if [ "$silent" == "/s" ]
	then
	echo "Options /s AB/DB/EU/UC/RP/CS/FM/PS/PG ConfigfilePath  %*"
	APPTYPE
	else
	echo "Running Installer in UI Mode..."
	echo "For Running Installer in Silent Mode give /s commond line argument to Batch file"
	RUNINSTALLER
	fi
)	

function APPTYPE()
(	
	if [ "$ApplicationType" != "AD" ] && [ "$ApplicationType" != "AB" ] && [ "$ApplicationType" != "DB" ] && [ "$ApplicationType" != "EU" ] && [ "$ApplicationType" != "UC" ] && [ "$ApplicationType" != "RP" ] && [ "$ApplicationType" != "CS" ] && [ "$ApplicationType" != "FM" ] && [ "$ApplicationType" != "PS" ] && [ "$ApplicationType" != "PG" ] && [ "$ApplicationType" != "IH" ] && [ "$ApplicationType" != "SC" ] && [ "$ApplicationType" != "FCPM" ]
	then
	echo "Enter AB for Application Build or DB for DataBase Build or UC for User Creation or EU for Exec Utility or RP for DSN Entries or CS for CrossScript or FM for FCM Build or PS for Payment scheduler Build or PG for Payment Gateway Build or IH for Internal Handsoff Grants or SC for Scheduler Build or FCPM for FCPM database Installation:"
	read ApplicationType
	APPTYPE
	
	else
	CONFPath
	fi
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
	
	##echo $InstallationShipment
	export CLASSPATH=./Library/common/commons-codec-1.17.1.jar:./Library/common/$ojdbc:./Library/oracle/ucp.jar:./Library/installer/ant-1.10.15/lib/ant-launcher.jar:./Library/installer/ant-1.10.15/lib/ant.jar:./Library/common/log4j-api-2.24.1.jar:./Library/application/sshd-core-2.14.0.jar:./Library/application/sshd-sftp-2.14.0.jar:./Library/application/sshd-common-2.14.0.jar:./Library/plugin-quartz/slf4j-api-2.0.16.jar:./Library/common/log4j-1.2-api-2.24.1.jar:./Library/common/log4j-api-2.24.1.jar:./Library/common/log4j-core-2.24.1.jar:./Library/common/commons-io-2.16.1.jar:./Library/installer/compiler_unshaded_deploy.jar:$CLASSPATH
	export CLASSPATH=./FcubsInstaller.jar:$CLASSPATH
	if [ "$silent" == "/s" ]
	then
	echo "Running in Silent Mode"
	#java -jar FcubsInstaller.jar "$InstallationShipment" "$ApplicationType" "$ConfigPath" "$JAVA_HOME" "$APPSERVER_HOME" "$ORACLE_HOME" "$WEBLOGIC_HOME" "$LOAD_ENV_VARIABLES"
	java com.ofss.installer.FcubsInstaller "$InstallationShipment" "$ApplicationType" "$ConfigPath" "$JAVA_HOME" "$APPSERVER_HOME" "$ORACLE_HOME" "$WEBLOGIC_HOME" "$LOAD_ENV_VARIABLES"
	else
	echo "Running in UI Mode"
	#java -jar FcubsInstaller.jar "$JAVA_HOME" "$APPSERVER_HOME" "$ORACLE_HOME" "$WEBLOGIC_HOME" "$LOAD_ENV_VARIABLES"
	java com.ofss.installer.FcubsInstaller "$JAVA_HOME" "$APPSERVER_HOME" "$ORACLE_HOME" "$WEBLOGIC_HOME" "$LOAD_ENV_VARIABLES" "ALL"
	fi
	EXITINSTALLER
)

echo "calling exit"
function EXITINSTALLER()
(
	echo "in exit"
	echo "Deleting the Flag file chk.flg."
	rm chk.flg
	export LOAD_ENV_VARIABLES=
	echo "Reading env.properties to fetch and set the previously set environment variables"
	. $FILE
	export VAREDITED=$varedited
	if [ "$VAREDITED" == "Y" ] 
	then
	echo "@@@@@@ Restarting the INSTALLER @@@@@@@"
	./FCUBSInstaller.sh
	fi
)

BEGIN
