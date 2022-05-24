import { defineNuxtPlugin } from '#app';

import VMdEditor from '@kangc/v-md-editor';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';
// highlightjs
// import hljs from 'highlight.js';

export default defineNuxtPlugin(nuxtApp => {

  if ( process.client) {
    const MarkdownEditor = VMdEditor.use(githubTheme);
    
    MarkdownEditor.lang.use('en-US', enUS);

    nuxtApp.vueApp.use(MarkdownEditor);
  }
});
