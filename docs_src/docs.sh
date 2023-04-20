npx jsdoc --readme ./docs_src/gettingStarted.md src/modules/restful/blvt.js
node ./docs_src/generateDoc.js
rm -R out
