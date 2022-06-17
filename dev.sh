PARCEL="./node_modules/.bin/parcel"

NODE_ENV=development LANG=$1 $PARCEL serve ./src/index.html --no-cache
