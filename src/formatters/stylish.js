import _ from 'lodash';

const spacesCount = 0;

const getObjectString = (object, spaceLength) => {
  const getString = (obj, length) => {
    const objInfo = Object.entries(obj);
    const result = objInfo.map((item) => {
      if (_.isObject(item[1])) {
        return `${' '.repeat(length + 8)}${item[0]}: {\n${getString(item[1], length + 4)}${' '.repeat(length + 8)}}`;
      }
      return `${' '.repeat(length + 8)}${item[0]}: ${item[1]}`;
    })
      .reduce((acc, elem) => {
        const newAcc = `${acc + elem}\n`;
        return newAcc;
      }, '');
    return result;
  };
  return `{\n${getString(object, spaceLength)}${' '.repeat(spaceLength + 4)}}`;
};

const stylish = (tree) => {
  if (tree === null) {
    return `📣 Error, it is working with .json, .yml (.yaml) formats only!
    Also, both of files must to have same format.`;
  }
  const getDiffInfo = (workpiece, spaceLength) => {
    const result = workpiece.map((obj) => {
      switch (obj.type) {
        case 'equal':
          return `${' '.repeat(spaceLength)}    ${obj.name}: ${obj.value}`;
        case 'removed':
          if (_.has(obj, 'children')) {
            return `${' '.repeat(spaceLength)}  - ${obj.name}: ${getObjectString(obj.children[0], spaceLength)}`;
          }
          return `${' '.repeat(spaceLength)}  - ${obj.name}: ${obj.value}`;
        case 'added':
          if (_.has(obj, 'children')) {
            return `${' '.repeat(spaceLength)}  + ${obj.name}: ${getObjectString(obj.children[0], spaceLength)}`;
          }
          return `${' '.repeat(spaceLength)}  + ${obj.name}: ${obj.value}`;
        case 'changed':
          if (_.isObject(obj.value1)) {
            return `${' '.repeat(spaceLength)}  - ${obj.name}: ${getObjectString(obj.value1, spaceLength)}\n${' '.repeat(spaceLength)}  + ${obj.name}: ${obj.value2}`;
          }
          if (_.isObject(obj.value2)) {
            return `${' '.repeat(spaceLength)}  - ${obj.name}: ${obj.value1}\n${' '.repeat(spaceLength)}  + ${obj.name}: ${getObjectString(obj.value2, spaceLength)}`;
          }
          return `${' '.repeat(spaceLength)}  - ${obj.name}: ${obj.value1}\n${' '.repeat(spaceLength)}  + ${obj.name}: ${obj.value2}`;
        case 'nested':
          return `${' '.repeat(spaceLength)}    ${obj.name}: {\n${getDiffInfo(obj.children, spaceLength + 4)}${' '.repeat(spaceLength + 2)}  }`;
        default:
          throw new Error(`Unknown order state: '${obj.type}'!`);
      }
    }).reduce((accum, str) => {
      const newAccum = `${accum + str}\n`;
      return newAccum;
    }, '');
    return result;
  };
  return `{\n${getDiffInfo(tree, spacesCount)}}`;
};

export default stylish;
