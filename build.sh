PARCEL="./node_modules/.bin/parcel"

echo "Fetch lib sizes"
node ./nodeFetchSizes.js

echo "Create folders if they aren't exist"
mkdir -p ./dist-ru
mkdir -p ./dist-en

echo "Clear dist folders"
rm -rf ./dist-ru/**
rm -rf ./dist-en/**

echo "Copy static files"
cp -r ./static/* ./dist-ru
cp -r ./static/* ./dist-en
cp -r ./static-ru/* ./dist-ru
cp -r ./static-en/* ./dist-en

echo "Build ru"
NODE_ENV=production LANG=ru $PARCEL build ./src/index.html --out-dir ./dist-ru --no-cache --detailed-report
# echo "Build en"
# NODE_ENV=production LANG=en $PARCEL build ./src/index.html --out-dir ./dist-en --no-cache --detailed-report

echo "Check env cached in build"
grep -q 'https://localhost:1234' ./dist-en/index.html && exit 1
grep -q 'https://localhost:1234' ./dist-ru/index.html && exit 1
