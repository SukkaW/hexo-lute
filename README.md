# hexo-lute

[![npm version](https://img.shields.io/npm/v/hexo-lute?style=flat-square)](https://www.npmjs.com/package/hexo-lute)
[![MIT license](https://img.shields.io/npm/l/hexo-lute?style=flat-square)](./LICENSE)
[![travis](https://img.shields.io/travis/com/sukkaw/hexo-renderer-lute?style=flat-square)](https://travis-ci.com/github/SukkaW/hexo-renderer-lute/)
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

There is no configuration. The behavior of `hexo-lute` is nearly the same as `hexo-renderer-marked` with default configuration.

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
