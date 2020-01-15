PARCEL="./node_modules/.bin/parcel"

echo "Fetch lib sizes"
node ./nodeFetchSizes.js

echo "Clear dist folders"
rm -rf ./dist-ru/**
rm -rf ./dist-en/**

echo "Build ru"
NODE_ENV=production LANG=ru $PARCEL build ./src/index.html --out-dir ./dist-ru --no-cache --detailed-report
echo "Build en"
NODE_ENV=production LANG=en $PARCEL build ./src/index.html --out-dir ./dist-en --no-cache --detailed-report

echo "Check env cached in build"
ENGREP=$(grep -q 'localhost:1234' ./dist-en/index.html)
RUGREP=$(grep -q 'localhost:1234' ./dist-ru/index.html)

if [ "$ENGREP" != "" ] | [ "$RUGREP" != "" ]
then
  echo "String 'localhost:1234' was found in builds, that's parcel env error. You have to rebuild again and hope that everything will be ok next time."
  exit 1;
else
  echo "Build was done successfully"
fi
