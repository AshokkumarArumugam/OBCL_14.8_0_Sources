
#echo Changing the screen size to a chosen size
export PATH=$PATH;
export "propertyfile="
export localjavahome=
#echo mode.com 80,50

echo "."
echo "Developer WorkBench For FLEXCUBE UBS : 12.5 "
echo "."
echo "Copyright (c) 2014, Oracle Financial Services Software Ltd. All rights reserved."
export currdir=`pwd`

export FILE=$currdir/resource/SilentOdt.properties

if [ -f $FILE ];
then
. $FILE > /dev/null 2>&1

echo "localjavahome = $JAVA_HOME"
export toolsjarpath=$JAVA_HOME/lib/tools.jar
if [ -f $toolsjarpath ];
then
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=$toolsjarpath:$CLASSPATH
echo "tools.jar successfully added in the class path"
else
echo "JAVA_HOME path is not proper"
fi
else
echo "SilentOdt.properties doesnt exist"
fi

echo "continue..."
echo Enter Symmetric Key: 
read ReferenceNumber
echo Enter DB Password: 
read password1
echo Enter DB URL: 
read password2
echo Enter ODT Login Password: 
read password3

java -cp "$CLASSPATH:$currdir/lib/*"  com.ofss.tools.odt.silent.SilentODTEncryptDecrypt  ${ReferenceNumber} ${password1} ${password2} ${password3}

echo "."
