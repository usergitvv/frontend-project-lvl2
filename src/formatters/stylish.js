import _ from 'lodash';

const makeIndent = (spaces, correction) => ' '.repeat(spaces - correction);

const indent = 4;

const getObjectString = (object, objindent) => {
  const iter = (obj, spaces) => {
    const objInfo = Object.entries(obj);
    const result = objInfo.map((item) => {
      if (_.isPlainObject(item[1])) {
        return [`${makeIndent(spaces, -indent)}${item[0]}: {\n${iter(item[1], spaces + indent)}`,
          `${makeIndent(spaces, -indent)}}`].join('\n');
      }
      return `${makeIndent(spaces, -indent)}${item[0]}: ${item[1]}`;
    }).join('\n');
    return result;
  };
  return `{\n${iter(object, objindent)}\n${makeIndent(objindent, 0)}}`;
};

const stringify = (value, spaces) => {
  switch (typeof value) {
    case 'object':
      if (value === null) return null;
      return getObjectString(value, spaces);
    case 'string':
    case 'boolean':
    case 'number':
      return value;
    default:
      throw new Error(`Unknown order state: '${value}'!`);
  }
};

const stylish = (tree) => {
  const iter = (workpiece, depth) => {
    const indentDepth = indent * depth;
    const result = workpiece.map((obj) => {
      switch (obj.type) {
        case 'unchanged':
          return `${makeIndent(indentDepth, 0)}${obj.name}: ${obj.value}`;
        case 'removed':
          return `${makeIndent(indentDepth, indent / 2)}- ${obj.name}: ${stringify(obj.value, indentDepth)}`;
        case 'added':
          return `${makeIndent(indentDepth, indent / 2)}+ ${obj.name}: ${stringify(obj.value, indentDepth)}`;
        case 'changed':
          return [`${makeIndent(indentDepth, indent / 2)}- ${obj.name}: ${stringify(obj.value1, indentDepth)}`,
            `${makeIndent(indentDepth, indent / 2)}+ ${obj.name}: ${stringify(obj.value2, indentDepth)}`].join('\n');
        case 'nested':
          return [`${makeIndent(indentDepth, 0)}${obj.name}: {\n${iter(obj.children, depth + 1)}`,
            `${makeIndent(indentDepth, indent / 2)}  }`].join('\n');
        default:
          throw new Error(`Unknown order state: '${obj.type}'!`);
      }
    }).join('\n');
    return result;
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
