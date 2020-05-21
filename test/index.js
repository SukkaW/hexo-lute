/* eslint-disable indent */
'use strict';

require('chai').should();
const Hexo = require('hexo');
const { escapeHTML, encodeURL } = require('hexo-util');

describe('Marked renderer', () => {
  const hexo = new Hexo(__dirname, {silent: true});

  const r = require('../lib/renderer').bind(hexo);

  it('default', () => {
    const code = 'console.log("Hello world");';

    const text = [
      '# Hello world',
      '',
      '```',
      code,
      '```',
      '',
      '## Hello world',
      '',
      '### Hello world',
      '',
      'hello'
    ].join('\n');

    const result = r({ text });

    result.should.eql([
        '<h1 id="Hello-world">Hello world</h1>',
        '<pre><code>' + escapeHTML(code),
        '</code></pre>',
        '<h2 id="Hello-world-">Hello world</h2>',
        '<h3 id="Hello-world--">Hello world</h3>',
        '<p>hello</p>'
      ].join('\n') + '\n');
  });

  it('should render headings with links', () => {
    const text = [
      '## [hexo-server]',
      '',
      '[hexo-server]: https://github.com/hexojs/hexo-server'
    ].join('\n');

    const result = r({ text });

    result.should.eql('<h2 id="hexo-server"><a href="https://github.com/hexojs/hexo-server">hexo-server</a></h2>\n');
  });

  it('should render headings with links - parentheses', () => {
    const text = '## [hexo-server](https://github.com/hexojs/hexo-server)';

    const result = r({ text });

    result.should.eql('<h2 id="hexo-server"><a href="https://github.com/hexojs/hexo-server">hexo-server</a></h2>\n');
  });

  it('should handle duplicate headings properly', () => {
    const text = [
      '## foo',
      '## foo',
      '### bar',
      '#### bar',
      '## foo'
    ].join('\n');

    const result = r({ text });

    result.should.eql([
      '<h2 id="foo">foo</h2>',
      '<h2 id="foo-">foo</h2>',
      '<h3 id="bar">bar</h3>',
      '<h4 id="bar-">bar</h4>',
      '<h2 id="foo--">foo</h2>'
    ].join('\n') + '\n');
  });

  it('should handle chinese headers properly', () => {
    const text = '# 中文';
    const result = r({ text });

    result.should.eql('<h1 id="中文">中文</h1>\n');
  });

  it('should encode URL properly', () => {
    const urlA = '/foo/bár.jpg';
    const urlB = 'http://fóo.com/bar.jpg';

    const body = [
      `[foo](${urlA})`,
      `[bar](${urlB})`
    ].join('\n');

    const result = r({text: body});

    result.should.eql([
      `<p><a href="${encodeURL(urlA)}">foo</a><br />`,
      '<a href="http://f%C3%B3o.com/bar.jpg">bar</a></p>\n'
    ].join('\n'));
  });

  it('auto link', () => {
    const text = [
      'Great website http://hexo.io',
      '',
      '[Hexo](http://hexo.io)'
    ].join('\n');

    const result = r({ text });

    result.should.eql([
        '<p>Great website <a href="http://hexo.io">http://hexo.io</a></p>',
        '<p><a href="http://hexo.io">Hexo</a></p>'
      ].join('\n') + '\n');
  });

  it('should render link with title', () => {
    const text = [
      '[text](http://link.com/ "a-title")',
      '[a<b](http://link.com/ "b>a")'
    ].join('\n');
    const result = r({ text });

    result.should.eql([
      '<p><a href="http://link.com/" title="a-title">text</a><br />',
      '<a href="http://link.com/" title="b&gt;a">a&lt;b</a></p>\n'
    ].join('\n'));
  });

  it('should encode image url', () => {
    const urlA = '/foo/bár.jpg';
    const urlB = 'http://fóo.com/bar.jpg';

    const text = [
      `![](${urlA})`,
      `![](${urlB})`
    ].join('\n');

    const result = r({ text });

    result.should.eql([
      `<p><img src="${encodeURL(urlA)}" alt="" /><br />`,
      '<img src="http://f%C3%B3o.com/bar.jpg" alt="" /></p>\n'
    ].join('\n'));
  });

  it('should include image caption & title', () => {
    const text = [
      '![caption](http://foo.com/a.jpg)',
      '![caption](http://bar.com/b.jpg "a-title")',
      '![a"b](http://bar.com/b.jpg "c>d")'
    ].join('\n');

    const result = r({ text });

    result.should.eql([
      '<p><img src="http://foo.com/a.jpg" alt="caption" /><br />',
      '<img src="http://bar.com/b.jpg" alt="caption" title="a-title" /><br />',
      '<img src="http://bar.com/b.jpg" alt="a&quot;b" title="c&gt;d" /></p>\n'
    ].join('\n'));
  });
});

describe('Benchmark', () => {
  const hexo = new Hexo(__dirname, {silent: true});

  const fixture = require('./fixture');
  let text = '';

  for (let i = 0; i < 15; i++) {
    text = text + '\n' + fixture;
  }

  const r = require('../lib/renderer').bind(hexo);
  const r2 = require('hexo-renderer-marked/lib/renderer').bind(hexo);

  it('hexo-lute - normal snippet', () => {
    r({ text: fixture });
    r({ text: fixture });
    r({ text: fixture });
    r({ text: fixture });
    r({ text: fixture });
    r({ text: fixture });
    r({ text: fixture });
    r({ text: fixture });
    r({ text: fixture });
    r({ text: fixture });
  });

  it('hexo-renderer-marked - normal snippet', () => {
    r2({ text: fixture });
    r2({ text: fixture });
    r2({ text: fixture });
    r2({ text: fixture });
    r2({ text: fixture });
    r2({ text: fixture });
    r2({ text: fixture });
    r2({ text: fixture });
    r2({ text: fixture });
    r2({ text: fixture });
  });

  it('hexo-lute - large snippet', () => {
    r({ text });
  });

  it('hexo-renderer-marked - large snippet', () => {
    r2({ text });
  });
});
