PARCEL="./node_modules/.bin/parcel"

echo "Fetch lib sizes"
node ./nodeFetchSizes.js

echo "Clear dist folders"
rm -rf ./dist-ru/**
rm -rf ./dist-en/**

# run build
echo "build ru"
NODE_ENV=production LANG=ru $PARCEL build ./src/index.html --out-dir ./dist-ru --no-cache --detailed-report
echo "build en"
NODE_ENV=production LANG=en $PARCEL build ./src/index.html --out-dir ./dist-en --no-cache --detailed-report

# check for cached env
echo "check env cached in build"
grep -q 'https://localhost:1234' ./dist-en/index.html && exit 1
grep -q 'https://localhost:1234' ./dist-ru/index.html && exit 1
