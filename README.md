# hexo-lute

[![npm version](https://img.shields.io/npm/v/hexo-lute?style=flat-square)](https://www.npmjs.com/package/hexo-lute)
[![MIT license](https://img.shields.io/npm/l/hexo-lute?style=flat-square)](./LICENSE)
[![travis](https://img.shields.io/travis/com/sukkaw/hexo-renderer-lute?style=flat-square)](https://travis-ci.com/github/SukkaW/hexo-lute/)
![code size](https://img.shields.io/github/languages/code-size/sukkaw/hexo-lute?style=flat-square)

A markdown renderer for [Hexo](https://hexo.io) based on [Lute](https://github.com/88250/lute).

## Installations

Make sure you have existed markdown renderer uninstalled:

- `hexo-renderer-marked` - The default markdown renderer shipped with Hexo.
- `hexo-renderer-markdown-it` - Another official markdown renderer made by Hexo.

Then install `hexo-lute` with following command:

```bash
$ npm i hexo-lute --save
# yarn add hexo-lute # if you prefer yarn
```

## Configuration

The default behavior of `hexo-lute` is nearly the same as `hexo-renderer-marked` with default configuration.

You can configure this plugin in `_config.yml` to enable extra features.

```yaml
lute:
  gfm: true # Enabled by default
  breaks: true # Enabled by default
  header_id: true # Enabled by default
  autolink: true # Enabled by default
  emoji: false # Disabled by default
  prepend_root: false # Disabled by default
  sanitize: false # Disabled by default
  lazyload: false # Disabled by default
  lazyload_src: ''
  github_todo_list: false # Disabled by default
  github_todo_list_class: 'task-list'
  fix_term_typo: false # Disabled by default
  auto_space: false # Disabled by default
  chinese_punct: false # Disabled by default
```

- `gfm`: [GitHub flavored markdown](https://help.github.com/en/github/writing-on-github)
- `breaks`: Treats soft break as a hard break, just like GitHub Issues.
- `header_id`: Insert header id, e.g. `<h1 id="text">text</h1>`. Useful for inserting anchor link to each paragraph with a heading.
- `autolink`: Enable autolink for URLs. E.g. `https://hexo.io` will become `<a href="https://hexo.io">https://hexo.io</a>`.
- `emoji`: Emoji support. E.g. `:heart:` will become `❤️`.
- `prepend_root`: Prepend `config.root` value to internal image url & relative link.
- `sanitize`: Basic XSS filter based on [bluemonday](https://github.com/microcosm-cc/bluemonday). Please just don't rely on it.
- `lazyload`: Enable lazyload for image. The original `src` will then become `data-src`.
- `lazyload_src`: Set a new `src` after original `src` became `data-src`. Useful for a placeholder (small "loading" gif things).
  - If `lazyload` is set to `true` and `lazyload_src` is unset or empty, `data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==` will be use then.
- `github_todo_list`: GFM Todo List support.
- `github_todo_list_class`: The class name for GFM Todo List support, useful for styling.
- `fix_term_typo`: Enable some coding term correction (e.g. `Github => GitHub`, `jquery => jQuery`, etc.)
- `auto_space`: Add a space between CJK character and other characters.
- `chinese_punct`: Replace the English punctuation to Chinese punctuation (punctuation between Chinese words only).

## Performance

```
  Benchmark
    ✓ hexo-lute (324ms)
    ✓ hexo-renderer-marked (41ms)
```

It shows that `hexo-lute` is 7x slower than `hexo-renderer-marked`. But `hexo-lute` could be faster under specific circumstances (shorter & simpler posts).

## License

[MIT License](./LICENSE)

## Maintainer

**hexo-lute** © [Sukka](https://github.com/SukkaW), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by [Sukka](https://github.com/SukkaW) with help from contributors ([list](https://github.com/SukkaW/hexo-lute/contributors)).

> [Personal Website](https://skk.moe) · [Blog](https://blog.skk.moe) · GitHub [@SukkaW](https://github.com/SukkaW) · Telegram Channel [@SukkaChannel](https://t.me/SukkaChannel) · Twitter [@isukkaw](https://twitter.com/isukkaw) · Keybase [@sukka](https://keybase.io/sukka)
