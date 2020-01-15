PARCEL="./node_modules/.bin/parcel"

echo "Fetch lib sizes"
node ./nodeFetchSizes.js

echo "Clear dist folders"
rm -rf ./checkadblock.ru/**
rm -rf ./adblock-tester.com/**

echo "Build ru"
NODE_ENV=production LANG=ru $PARCEL build ./src/index.html --out-dir ./checkadblock.ru --no-cache --detailed-report
echo "Build en"
NODE_ENV=production LANG=en $PARCEL build ./src/index.html --out-dir ./adblock-tester.com --no-cache --detailed-report

echo "Check env cached in build"
RUGREP=$(grep -q 'localhost:1234' ./checkadblock.ru/index.html)
ENGREP=$(grep -q 'localhost:1234' ./adblock-tester.com/index.html)

if [ "$ENGREP" != "" ] | [ "$RUGREP" != "" ]
then
  echo "String 'localhost:1234' was found in builds, that's parcel env error. You have to rebuild again and hope that everything will be ok next time."
  exit 1;
else
  echo "Build was done successfully"
fi
