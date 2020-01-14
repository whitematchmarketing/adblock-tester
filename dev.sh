PARCEL="./node_modules/.bin/parcel"

mkdir -p ./dev-$1
cp -r ./static/* ./dev-$1
cp -r ./static-$1/* ./dev-$1
NODE_ENV=development LANG=$1 $PARCEL serve ./src/index.html --no-cache --out-dir ./dev-$1
