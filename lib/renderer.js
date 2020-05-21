'use strict';

require('./lute.min.js');

const { Lute } = global;

// eslint-disable-next-line new-cap
const lute = Lute.New();

module.exports = function({ text }) {
  // eslint-disable-next-line new-cap
  const result = lute.MarkdownStr('', text);

  return result;
};
