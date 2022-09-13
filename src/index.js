import getResult from './formatters/index.js';
import getTree from './buildTree.js';
import makeParsing from './parsers.js';

const genDiff = (paths, formatName) => {
  const tree = getTree(makeParsing(paths));
  return getResult(formatName, tree);
};

export default genDiff;
