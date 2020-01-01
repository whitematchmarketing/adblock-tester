#!/bin/bash

if [[ "$#" == 2 ]];
then
  BUMP="npm version "$2" --force -m 'Major version %s' --no-git-tag-version";
  echo $BUMP;
  eval $BUMP;
  yarn build;
  git add .;
  git commit -m "New version: $1"
  git push;
else
  echo "";
  echo "You must pass version and type, example: \`./deploy.sh 2.0.3 patch\` or run \`yarn deploy patch\`";
  echo "";
  exit 1;
fi
