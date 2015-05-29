#!/bin/bash

if [ -z "$1" ] ; then
  echo "Enter a database name"
  exit 1
fi

mongoimport --jsonArray --drop --db $1 --collection users --file ../db/users.json
# mongoimport --jsonArray --drop --db auction-test --collection users --file ../db/users.json
mongoimport --jsonArray --drop --db $1 --collection clients --file ../db/clients.json
# mongoimport --jsonArray --drop --db auction-dev --collection clients --file ../db/clients.json
mongoimport --jsonArray --drop --db $1 --collection auctions --file ../db/auctions.json
# mongoimport --jsonArray --drop --db auction-test --collection auctions --file ../db/auctions.json
mongoimport --jsonArray --drop --db $1 --collection items --file ../db/items.json
# mongoimport --jsonArray --drop --db auction-dev --collection items --file ../db/items.json
