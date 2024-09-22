import {LintSource, linter} from '@codemirror/lint';
import {lint, graphqlLanguageSupport, completion, jump, stateExtensions} from 'cm6-graphql';
import {Extension} from '@uiw/react-codemirror';
import {EditorView} from '@codemirror/view';

/**
 * Function to set up GraphQL support in a CodeMirror editor.
 * @param {...Parameters<typeof stateExtensions>} params - Parameters for state extensions.
 * @returns {Extension[]} - An array of extensions for GraphQL support.
 */
export function graphql(...params: Parameters<typeof stateExtensions>): Extension[] {
  return [
    graphqlLanguageSupport(),
    completion,
    linter(createLintSource, {
      delay: 400,
    }),
    jump,
    stateExtensions(...params),
  ];
}

/**
 * Creates a lint source that checks the editor's document state.
 * @param {EditorView} view - The editor view instance.
 * @returns {LintResult[]} - An array of linting results.
 */
const createLintSource: LintSource = (view: EditorView) => {
  const docContent = view.state.doc.toString().trim();
  if (docContent === '') {
    return [];
  }
  return lintSource(view);
};

const lintSource = (lint as [{value: {source: LintSource}}] & Extension)[0].value.source;
