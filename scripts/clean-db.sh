#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

mongoimport --jsonArray --drop --db $1 --collection users --file ../db/users.json
# mongoimport --jsonArray --drop --db auction-dev --collection users --file ../db/users.json
mongoimport --jsonArray --drop --db $1 --collection profiles --file ../db/clients.json
# mongoimport --jsonArray --drop --db auction-dev --collection clients --file ../db/clients.json
mongoimport --jsonArray --drop --db $1 --collection profiles --file ../db/clients.json
# mongoimport --jsonArray --drop --db auction-dev --collection auctions --file ../db/auctions.json