#!/bin/sh -l

echo "Hello $1"
pipenv run python -m src.index
