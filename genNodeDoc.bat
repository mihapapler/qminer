node makedoc.js src/nodejs/ht/ht_nodejs.h src/nodejs/scripts/ht.js nodedoc/htdoc.js ./src/nodejs/ht/htDocHead.js ./src/nodejs/ht/StrStrDocData.js ./src/nodejs/ht/StrIntDocData.js ./src/nodejs/ht/StrFltDocData.js ./src/nodejs/ht/IntStrDocData.js ./src/nodejs/ht/IntIntDocData.js ./src/nodejs/ht/IntFltDocData.js

node makedoc.js src/nodejs/fs/fs_nodejs.h "" nodedoc/fsdoc.js
node makedoc.js src/nodejs/analytics/analytics.h src/nodejs/scripts/analytics.js nodedoc/analytics.js
jsdoc nodedoc/htdoc.js nodedoc/fsdoc.js nodedoc/analytics.js -d nodedoc