// for Monaco Editor
import 'monaco-editor/esm/vs/editor/editor.all.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js';
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Ref, unref, onMounted } from 'vue';

type editorOptions = monaco.editor.IStandaloneEditorConstructionOptions;

// 预置参数
const monacoOptions: editorOptions = {
  //   theme: 'vs-dark',
  value: '',
  language: 'ini',
  fontSize: 14,
  automaticLayout: true,
  hideCursorInOverviewRuler: true,
  overviewRulerBorder: false,
  renderLineHighlight: 'line',
  fontFamily:
    'Operator Mono Lig, Dank Mono, Microsoft YaHei Mono, Source_Code_Pro-YaHei Hybrid',
  lineHeight: 20,
  fontLigatures: true,
  detectIndentation: true,
  wordWrap: 'on',
  fixedOverflowWidgets: true,
  lineNumbersMinChars: 3,
  scrollBeyondLastColumn: 2,
  scrollBeyondLastLine: false,
  minimap: {
    enabled: false
  },
  smoothScrolling: true,
  contextmenu: false,
  autoIndent: 'keep'
  // formatOnPaste: true,
  // formatOnType: true,
};

// 生成 Monaco Editor
export default (target: Ref, onValueChange: Function) => {
  let editor: monaco.editor.IStandaloneCodeEditor | null = null;

  const init = () => {
    const el = unref(target);
    if (!el) return;
    editor = monaco.editor.create(el, monacoOptions);

    editor.getModel()?.onDidChangeContent(() => {
      onValueChange(editor!.getValue());
    });
  };

  !editor && init();

  const setContent = (content: string) => {
    if (editor) editor.setValue(content);
  };

  return { setContent, getEditor: () => editor };
};
