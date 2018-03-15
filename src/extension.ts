import * as vscode from "vscode";

import { CommentRendererFactory } from "./renderers/commentRenderers";
import { DividerRenderer } from "./renderers/dividerRenderer";

// ============================================================================
// EXTENSION INTERFACE
// ============================================================================
export function activate(context: vscode.ExtensionContext): void {

    // FROM CURSOR
    let fromCursor = vscode.commands.registerCommand("divider.addFromCursor", () => {
        // prepare selection
        let currentSelection = vscode.window.activeTextEditor.selection;

        // insert
        insertDivider(currentSelection);
    });
    context.subscriptions.push(fromCursor);

    // FROM CURSOR WITH ONE LINE
    let fromCursorWithOneLine = vscode.commands.registerCommand("divider.addFromCursorWithOneLine", () => {
        // prepare selection
        let currentSelection = vscode.window.activeTextEditor.selection;

        // insert
        insertDivider(currentSelection, 1);
    });
    context.subscriptions.push(fromCursor);

    // FROM LINE START
    let fromLineStart = vscode.commands.registerCommand("divider.addFromLineStart", () => {
        // prepare selection
        let currentSelection = vscode.window.activeTextEditor.selection;
        let startPositionAtStartOfLine = new vscode.Position(currentSelection.start.line, 0);
        let selectionAtStartOfLine = new vscode.Selection(startPositionAtStartOfLine, currentSelection.end);

        // insert
        insertDivider(selectionAtStartOfLine);
    });
    context.subscriptions.push(fromLineStart);
}

export function deactivate(): void {
    // do nothing
}

// =============================================================================
// INSERT DIVIDER ENTRY POINT
// =============================================================================
function insertDivider(selection: vscode.Selection, numberOfLines?: number): void {
    // read config
    let config = vscode.workspace.getConfiguration("divider");

    let configNumberOfLines = config.get("lines", 3);
    let configEndColumn = config.get("endColumn", 80);
    let configText = config.get("text", "=");
    if (numberOfLines) {
        configNumberOfLines = numberOfLines;
    }

    // configure divider renderer
    let commentRenderer = CommentRendererFactory.create(vscode.window.activeTextEditor.document.languageId);
    let renderer = new DividerRenderer(commentRenderer, configNumberOfLines);

    // render divider
    let divider = renderer.render(selection.start.character, configEndColumn, configText);

    // insert divider
    let editor = vscode.window.activeTextEditor;
    editor.edit(editor => { editor.replace(selection, divider); });

    // position the cursor inside or after the divider
    let lineToSetCursor = selection.start.line + (renderer.getLineToSerCursor() - 1);
    let positionToSetCursor = new vscode.Position(lineToSetCursor, selection.start.character);
    if (configNumberOfLines >= 3) {
        positionToSetCursor = new vscode.Position(lineToSetCursor, selection.start.character + commentRenderer.startCommentText.length + 1);
    }
    let selectionToSetCursor = new vscode.Selection(positionToSetCursor, positionToSetCursor);
    vscode.window.activeTextEditor.selection = selectionToSetCursor;
}
