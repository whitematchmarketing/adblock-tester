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
