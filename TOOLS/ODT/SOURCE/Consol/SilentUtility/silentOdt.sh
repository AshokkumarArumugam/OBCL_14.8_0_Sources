echo OFF

#echo Changing the screen size to a chosen size
export PATH=$PATH;
export "propertyfile="
export localjavahome=
#echo mode.com 80,50

echo "."
echo "Developer WorkBench For FLEXCUBE UBS : 12.5 "
echo "."
echo "Copyright (c) 2017, Oracle Financial Services Software Ltd. All rights reserved."
export currdir=`pwd`

export FILE=$currdir/resource/SilentOdt.properties
echo "FILE" $FILE
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

java -cp "$CLASSPATH:$currdir/lib/*"  com.ofss.tools.odt.silent.SilentOdt

echo "."
