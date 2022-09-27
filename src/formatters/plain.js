import _ from 'lodash';

const stringify = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      if (value === null) return null;
      return '[complex value]';
    case 'boolean':
    case 'number':
      return value;
    default:
      throw new Error(`Unknown order state: '${value}'!`);
  }
};

const plain = (tree) => {
  const property = 'Property \'';
  const iter = (prop, workpiece) => {
    const billet = workpiece.map((node) => {
      switch (node.type) {
        case 'added':
          return `${prop}${node.name}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `${prop}${node.name}' was removed`;
        case 'changed':
          return `${prop}${node.name}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'nested': {
          return `${iter(`${prop}${[node.name]}.`, node.children)}`;
        }
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown order state: '${node.type}'!`);
      }
    });
    const result = _.compact(billet);
    return `${result.join('\n')}`;
  };
  return iter(property, tree);
};

export default plain;
