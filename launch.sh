#!/bin/bash

if [ -z $1 ]; then
  env_mode="local"
else
  env_mode=$1
fi

echo ">>> Current Mode : $env_mode"

echo ">>> Check Server was Launched"
CURRENT_PID=$(pgrep -f 'thymeleaf-admin')

if [ -z $CURRENT_PID ]; then
  echo ">>> No Server"
else
  echo ">>> Already Activated at $CURRENT_PID"
  kill -9 $CURRENT_PID
  sleep 3
fi

echo ">>> New Server Launch!!!"

JAR_NAME=$(ls | grep 'thymeleaf-admin*' | head -n 1)
echo ">>> JAR Name: /home/kong/front/$JAR_NAME"
echo ">>> Launch IT!!!"

nohup java -jar -Dspring.profiles.active=$env_mode $JAR_NAME > /dev/null 2>&1 &
sleep 3
