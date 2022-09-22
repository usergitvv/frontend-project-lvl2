import _ from 'lodash';

const makeIndent = (size, correction) => ' '.repeat(size - correction);

const getObjectString = (object, spaceLength) => {
  const getString = (obj, length) => {
    const objInfo = Object.entries(obj);
    const result = objInfo.map((item) => {
      if (_.isPlainObject(item[1])) {
        return `${makeIndent(length, -4)}${item[0]}: {\n${getString(item[1], length + 4)}${makeIndent(length, -4)}}`;
      }
      return `${makeIndent(length, -4)}${item[0]}: ${item[1]}`;
    })
      .reduce((acc, elem) => {
        const newAcc = `${acc + elem}\n`;
        return newAcc;
      }, '');
    return result;
  };
  return `{\n${getString(object, spaceLength)}${makeIndent(spaceLength, 0)}}`;
};

const stringify = (value, indent) => {
  switch (typeof value) {
    case 'object':
      if (value === null) return null;
      return getObjectString(value, indent);
    case 'string':
    case 'boolean':
    case 'number':
      return value;
    default:
      throw new Error(`Unknown order state: '${value}'!`);
  }
};

const stylish = (tree) => {
  const spacesCount = 4;
  const getDiffInfo = (workpiece, depth) => {
    const spaceLength = spacesCount * depth;
    const result = workpiece.map((obj) => {
      switch (obj.type) {
        case 'unchanged':
          return `${makeIndent(spaceLength, 0)}${obj.name}: ${obj.value}`;
        case 'removed':
          return `${makeIndent(spaceLength, 2)}- ${obj.name}: ${stringify(obj.value, spaceLength)}`;
        case 'added':
          return `${makeIndent(spaceLength, 2)}+ ${obj.name}: ${stringify(obj.value, spaceLength)}`;
        case 'changed':
          return `${makeIndent(spaceLength, 2)}- ${obj.name}: ${stringify(obj.value1, spaceLength)}\n${makeIndent(spaceLength, 2)}+ ${obj.name}: ${stringify(obj.value2, spaceLength)}`;
        case 'nested':
          return `${makeIndent(spaceLength, 0)}${obj.name}: {\n${getDiffInfo(obj.children, depth + 1)}${makeIndent(spaceLength, 2)}  }`;
        default:
          throw new Error(`Unknown order state: '${obj.type}'!`);
      }
    }).reduce((accum, str) => {
      const newAccum = `${accum + str}\n`;
      return newAccum;
    }, '');
    return result;
  };
  return `{\n${getDiffInfo(tree, 1)}}`;
};

export default stylish;
