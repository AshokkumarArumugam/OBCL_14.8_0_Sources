

    if [ -z "$WL_DOMAIN" ]
    then
        echo "WL_DOMAIN is not set  : "
    else
        chmod +x $APP_SERVER_NAME/set_Path.sh
	. $APP_SERVER_HOME\user_projects\domains\$WL_DOMAIN\bin\setDomainEnv.sh
    fi

	