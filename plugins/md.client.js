import { defineNuxtPlugin } from '#app';
// import hljs  from 'highlight.js';
import Mdit from 'markdown-it';

import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';
import def from 'markdown-it-deflist';
import ins from 'markdown-it-ins';
import container from 'markdown-it-container';

export default defineNuxtPlugin(nuxtApp => {
  
  const markdownit = new Mdit({
    html:         true,
    xhtmlOut:     false,
    breaks:       false,
    langPrefix:   'language-',
    linkify:      true,
    typographer:  true,
    quotes: '“”‘’'
  })
  .use(sub)
  .use(sup)
  .use(def)
  .use(ins)
  .use(container,'codeblock',{marker:'@'});
  
  markdownit.linkify.set({ fuzzyEmail: false }); 

  nuxtApp.provide('mdit',markdownit);
});