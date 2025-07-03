    # specify the service name as commnad line argument

    echo "Enter SERVICE NAME : "
    read SERVICE_NAME
    if [ -z "$SERVICE_NAME" ]
    then
        echo "SERVICE_NAME is not set  : "
    else
        export SERVICE_NAME=$SERVICE_NAME
    fi

