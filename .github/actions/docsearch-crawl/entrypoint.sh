#!/bin/sh -l

cd /root
echo "Hello $1"
time=$(date)
echo ::set-output name=time::$time
pipenv install requests
pipenv run python -m src.index
