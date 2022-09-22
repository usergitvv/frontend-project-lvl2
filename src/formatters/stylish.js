import _ from 'lodash';

const makeIndent = (size, correction) => ' '.repeat(size - correction);

const getObjectString = (object, spaceLength) => {
  const iter = (obj, length) => {
    const objInfo = Object.entries(obj);
    const result = objInfo.map((item) => {
      if (_.isPlainObject(item[1])) {
        return `${makeIndent(length, -4)}${item[0]}: {\n${iter(item[1], length + 4)}\n${makeIndent(length, -4)}}`;
      }
      return `${makeIndent(length, -4)}${item[0]}: ${item[1]}`;
    }).join('\n');
    return result;
  };
  return `{\n${iter(object, spaceLength)}\n${makeIndent(spaceLength, 0)}}`;
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
  const iter = (workpiece, depth) => {
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
          return [`${makeIndent(spaceLength, 2)}- ${obj.name}: ${stringify(obj.value1, spaceLength)}`,
            `${makeIndent(spaceLength, 2)}+ ${obj.name}: ${stringify(obj.value2, spaceLength)}`].join('\n');
        case 'nested':
          return `${makeIndent(spaceLength, 0)}${obj.name}: {\n${iter(obj.children, depth + 1)}\n${makeIndent(spaceLength, 2)}  }`;
        default:
          throw new Error(`Unknown order state: '${obj.type}'!`);
      }
    }).join('\n');
    return result;
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
