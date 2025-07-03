#!/bin/sh
# If IBM Websphere Application Server, specify APP_SERVER_NAME=WAS
# If Oracle 10g Application Server, specify APP_SERVER_NAME=OC4J
# If Oracle 10g Application Server, specify APP_SERVER_NAME=WEBLOGIC

#set -v

export APP_SERVER_NAME=WEBLOGIC

# Apllication Server Install directory.
export APP_SERVER_HOME=/home/flexml/WEBLOGIC

# If Application Server is Weblogic Provide Domain Name
export WL_DOMAIN=fcubs10.2

# Kernel Install directory.
export KERNEL_INSTALL_DIR=/home/flexml/Kernel10.2

# If ENTERPRISE QUEUE is IBM WebSphere MQ, specify IS_ENTERPRISE_QUEUE_WebSphereMQ=true
# If ENTERPRISE QUEUE is Oracle 10g Application Server Queue, specify IS_ENTERPRISE_QUEUE_WebSphereMQ=false
export IS_ENTERPRISE_QUEUE_WebSphereMQ=false

# Specify the following only if IS_ENTERPRISE_QUEUE_WebSphereMQ=true 
export IBM_WEBSPHERE_MQ_INSTALL_DIR=/home/flexml/Websphere_MQ

# Set the User Home 
export USER_HOME=$HOME

chmod +x $APP_SERVER_NAME/set_Path.sh
cd $APP_SERVER_NAME
. set_Path.sh

echo "Press Enter to Continue ..."
read 
clear

