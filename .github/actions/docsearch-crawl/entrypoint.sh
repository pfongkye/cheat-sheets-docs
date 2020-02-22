#!/bin/sh -l

echo "Hello $1"
cd /root
pipenv install requests
pipenv run python -m src.index
