/* eslint-disable new-cap */
'use strict';

require('./lute.min.js');

const { Lute } = global;
const lute = Lute.New();

function luteSetConfig({ config }) {
  const options = Object.assign({
    gfm: true,
    breaks: true,
    header_id: true,
    autolink: true,
    emoji: false,
    prepend_root: false,
    sanitize: false,
    lazyload: false,
    lazyload_src: '',
    github_todo_list: false,
    github_todo_list_class: 'task-list',
    fix_term_typo: false,
    auto_space: false,
    chinese_punct: false
  }, config.lute);

  const isGFMEnabled = options.gfm;

  lute.SetGFMTable(isGFMEnabled);
  lute.SetGFMTaskListItem(options.github_todo_list);
  lute.SetGFMTaskListItemClass(options.github_todo_list_class);
  lute.SetGFMStrikethrough(isGFMEnabled);
  lute.SetGFMAutoLink(options.autolink);
  lute.SetSoftBreak2HardBreak(options.breaks);
  lute.SetHeadingID(options.header_id);
  lute.SetFixTermTypo(options.fix_term_typo);
  lute.SetAutoSpace(options.auto_space);
  lute.SetChinesePunct(options.chinese_punct);
  lute.SetEmoji(options.emoji);

  if (options.prepend_root && typeof config.root !== 'undefined') {
    lute.SetLinkBase(config.root);
  }

  if (options.lazyload) {
    const lazyloadPlaceholder = String(options.lazyload_src);
    if (lazyloadPlaceholder && lazyloadPlaceholder.trim() !== '') {
      lute.SetImageLazyLoading(lazyloadPlaceholder);
    } else {
      lute.SetImageLazyLoading('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
    }
  }
}

module.exports = function({ text }) {
  luteSetConfig(this);

  return lute.MarkdownStr('', text);
};
