#!/bin/sh -l

echo "Hello $1"
cd /root
ls -list
pipenv run python -m src.index
