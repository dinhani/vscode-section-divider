'use strict';

import * as vscode from 'vscode';

import { DividerRenderer } from './renderers/dividerRenderer';
import { CommentRendererFactory } from './renderers/commentRenderers';

// ============================================================================
// EXTENSION INTERFACE
// ============================================================================
export function activate(context: vscode.ExtensionContext) {

    let fromCursor = vscode.commands.registerCommand('divider.addFromCursor', () => {
        // prepare selection
        let currentSelection = vscode.window.activeTextEditor.selection;

        // insert
        insertDivider(currentSelection);
    });
    context.subscriptions.push(fromCursor);

    let fromLineStart = vscode.commands.registerCommand('divider.addFromLineStart', () => {
        // prepare selection
        let currentSelection = vscode.window.activeTextEditor.selection;
        let startPositionAtStartOfLine = new vscode.Position(currentSelection.start.line, 0);
        let selectionAtStartOfLine = new vscode.Selection(startPositionAtStartOfLine, currentSelection.end);

        // insert
        insertDivider(selectionAtStartOfLine);
    });
    context.subscriptions.push(fromLineStart);
}

export function deactivate() {
}

function insertDivider(selection: vscode.Selection) {
    // read config
    let config = vscode.workspace.getConfiguration("divider");
    let configNumberOfLines = config.get("lines", 3);
    let configEndColumn = config.get("endColumn", 80);
    let configText = config.get("text", "=");
    let language = vscode.window.activeTextEditor.document.languageId;

    // configure renderer
    let renderer = new DividerRenderer();
    renderer.documentLanguage = language;
    renderer.dividerNumberOfLines = configNumberOfLines;
    renderer.dividerStartColumn = selection.start.character;
    renderer.dividerEndColumn = configEndColumn;
    renderer.dividerText = configText;

    // render
    let divider = renderer.render();

    // insert
    let editor = vscode.window.activeTextEditor;
    editor.edit((editor) => { editor.replace(selection, divider); });

    // position cursor if necessary
    if (renderer.getRelativeLineToSetCursor() >= 0) {
        // generate the selection to set cursor
        let lineToSetCursor = selection.start.line + renderer.getRelativeLineToSetCursor();
        let positionToSetCursor = new vscode.Position(lineToSetCursor, selection.start.character + CommentRendererFactory.create(language).startCommentText.length + 1);
        let selectionToSetCursor = new vscode.Selection(positionToSetCursor, positionToSetCursor);

        // set the cursor
        vscode.window.activeTextEditor.selection = selectionToSetCursor;
    }
}