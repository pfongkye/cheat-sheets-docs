#!/bin/sh -l

echo "Hello $1"
pipenv run python -m src.index
time=$(date)
echo ::set-output name=time::$time
