'use strict';

require('chai').should();
const Hexo = require('hexo');
const { escapeHTML, encodeURL } = require('hexo-util');

describe('Marked renderer', () => {
  const hexo = new Hexo(__dirname, {silent: true});
  const ctx = Object.assign(hexo, {
    config: {
      lute: {}
    }
  });

  const r = require('../lib/renderer').bind(ctx);

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

describe('Lute features', () => {
  const hexo = new Hexo(__dirname, {silent: true});
  let ctx = Object.assign(hexo, {
    config: {
      lute: {}
    }
  });

  const r = require('../lib/renderer').bind(ctx);

  afterEach(() => {
    ctx = Object.assign(hexo, {
      config: {
        lute: {}
      }
    });
  });

  it('header_id: enabled by default', () => {});

  it('header_id: disabled', () => {
    const text = [
      '## foo',
      '## foo',
      '### bar',
      '#### bar',
      '## foo'
    ].join('\n');

    ctx.config.lute.header_id = false;

    const result = r({ text });

    result.should.eql([
      '<h2>foo</h2>',
      '<h2>foo</h2>',
      '<h3>bar</h3>',
      '<h4>bar</h4>',
      '<h2>foo</h2>'
    ].join('\n') + '\n');
  });

  it('autolink: enabled by default', () => {
    const text = [
      'Great website https://hexo.io'
    ].join('\n');

    const result = r({ text });

    result.should.eql('<p>Great website <a href="https://hexo.io">https://hexo.io</a></p>\n');
  });

  it('autolink: disabled', () => {
    const text = [
      'Great website https://hexo.io'
    ].join('\n');

    ctx.config.lute.autolink = false;

    const result = r({ text });

    result.should.eql('<p>Great website https://hexo.io</p>\n');
  });

  it('emoji: disabled by default', () => {
    const text = 'Follow My Heart :heart:';

    const result = r({ text });

    result.should.eql('<p>Follow My Heart :heart:</p>\n');
  });

  it('emoji: enabled', () => {
    const text = 'Follow My Heart :heart:';

    ctx.config.lute.emoji = true;
    const result = r({ text });

    result.should.eql('<p>Follow My Heart ❤️</p>\n');
  });

  it('prepend_root: disabled by default', () => {
    const text = [
      '[Hexo](https://hexo.io)',
      '[About Me](/about.html)'
    ].join('\n');

    ctx.config.root = '/blog/';

    const result = r({ text });

    result.should.eql('<p><a href="https://hexo.io">Hexo</a><br />\n<a href="/about.html">About Me</a></p>\n');
  });

  it('prepend_root: enabled by default', () => {
    const text = [
      '[Hexo](https://hexo.io)',
      '[About Me](about.html)'
    ].join('\n');

    ctx.config.root = '/blog/';
    ctx.config.lute.prepend_root = true;

    const result = r({ text });

    result.should.eql('<p><a href="https://hexo.io">Hexo</a><br />\n<a href="/blog/about.html">About Me</a></p>\n');
  });

  it('lazyload: disabled by default', () => {
    const text = [
      '![](https://example.com/image.png)'
    ].join('\n');

    const result = r({ text });

    result.should.eql('<p><img src="https://example.com/image.png" alt="" /></p>\n');
  });

  it('lazyload: enabled', () => {
    const text = [
      '![](https://example.com/image.png)'
    ].join('\n');

    ctx.config.lute.lazyload = true;

    const result = r({ text });

    result.should.eql('<p><img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://example.com/image.png" alt="" /></p>\n');
  });

  it('lazyload: lazyload_src is empty', () => {
    const text = [
      '![](https://example.com/image.png)'
    ].join('\n');

    ctx.config.lute.lazyload = true;
    ctx.config.lute.lazyload_src = '';

    const result = r({ text });

    result.should.eql('<p><img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://example.com/image.png" alt="" /></p>\n');
  });

  it('lazyload: lazyload_src is not empty', () => {
    const text = [
      '![](https://example.com/image.png)'
    ].join('\n');

    ctx.config.lute.lazyload = true;
    ctx.config.lute.lazyload_src = 'https://placehold.it';

    const result = r({ text });

    result.should.eql('<p><img src="https://placehold.it" data-src="https://example.com/image.png" alt="" /></p>\n');
  });

  it('fix_term_typo: disabled by default', () => {
    const text = [
      '## jquery'
    ].join('\n');

    const result = r({ text });

    result.should.eql('<h2 id="jquery">jquery</h2>\n');
  });

  it('fix_term_typo: enabled', () => {
    const text = [
      '## jquery'
    ].join('\n');

    ctx.config.lute.fix_term_typo = true;

    const result = r({ text });

    result.should.eql('<h2 id="jquery">jQuery</h2>\n');
  });

  it('auto_space: disabled by default', () => {
    const text = [
      '你好Hexo'
    ].join('\n');

    const result = r({ text });

    result.should.eql('<p>你好Hexo</p>\n');
  });

  it('auto_space: enabled', () => {
    const text = [
      '你好Hexo'
    ].join('\n');

    ctx.config.lute.auto_space = true;

    const result = r({ text });

    result.should.eql('<p>你好 Hexo</p>\n');
  });

  it('chinese_punct: disabled by default', () => {
    const text = [
      'Hello, world.',
      '你好,世界.'
    ].join('\n');

    const result = r({ text });

    result.should.eql('<p>Hello, world.<br />\n你好,世界.</p>\n');
  });

  it('chinese_punct: enabled', () => {
    const text = [
      'Hello, world.',
      '你好,世界.'
    ].join('\n');

    ctx.config.lute.chinese_punct = true;

    const result = r({ text });

    result.should.eql('<p>Hello, world.<br />\n你好，世界。</p>\n');
  });
});

describe('Benchmark', () => {
  const hexo = new Hexo(__dirname, {silent: true});

  const fixture = require('./fixture');
  let text = '';

  for (let i = 0; i < 50; i++) {
    text = text + '\n\n' + fixture;
  }

  const defaultCfg = JSON.parse(JSON.stringify(Object.assign(hexo.config, {
    marked: {}
  })));

  beforeEach(() => {
    hexo.config = JSON.parse(JSON.stringify(defaultCfg));
  });

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
