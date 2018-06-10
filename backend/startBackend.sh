#!/bin/bash
if [ ! -f ./envfile ]; then
    echo "You need a envfile to run the backend, open envfile.example"
    exit 1
fi
. envfile
node App.js
