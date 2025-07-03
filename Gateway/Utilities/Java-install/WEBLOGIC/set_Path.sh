#!/bin/ksh

# JAVA HOME 
export JAVA_HOME=$APP_SERVER_HOME/jdk150_11

# J2EE HOME 
export J2EE_HOME=$APP_SERVER_HOME/wlserver_10.0/server

# WL HOME 
export WL_HOME=$APP_SERVER_HOME

# DOMAIN HOME 
export DOMAIN_HOME=$APP_SERVER_HOME/user_projects/domains/$WL_DOMAIN

# ANT HOME
export ANT_HOME=$APP_SERVER_HOME/modules/org.apache.ant_1.6.5

export PATH=$JAVA_HOME/bin:$ANT_HOME/bin:$PATH
