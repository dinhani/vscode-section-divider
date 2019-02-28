import * as vscode from "vscode";

import { CommentRendererFactory } from "./renderers/commentRenderers";
import { DividerRenderer } from "./renderers/dividerRenderer";
import { IdentationRenderer } from "./renderers/identationRenderer";

// ============================================================================
// EXTENSION INTERFACE
// ============================================================================
export function activate(context: vscode.ExtensionContext): void {

    // FROM CURSOR
    const fromCursor = vscode.commands.registerCommand("divider.addFromCursor", () => {
        // prepare selection
        const currentSelection = vscode.window.activeTextEditor.selection;

        // insert
        insertDivider(currentSelection);
    });
    context.subscriptions.push(fromCursor);

    // FROM CURSOR WITH ONE LINE
    const fromCursorWithOneLine = vscode.commands.registerCommand("divider.addFromCursorWithOneLine", () => {
        // prepare selection
        const currentSelection = vscode.window.activeTextEditor.selection;

        // insert
        insertDivider(currentSelection, 1);
    });
    context.subscriptions.push(fromCursor);

    // FROM LINE START
    const fromLineStart = vscode.commands.registerCommand("divider.addFromLineStart", () => {
        // prepare selection
        const currentSelection = vscode.window.activeTextEditor.selection;
        const startPositionAtStartOfLine = new vscode.Position(currentSelection.start.line, 0);
        const selectionAtStartOfLine = new vscode.Selection(startPositionAtStartOfLine, currentSelection.end);

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
    const config = vscode.workspace.getConfiguration("divider");
    const configEndColumn = config.get("endColumn", 80);
    const configText = config.get("text", "=");
    let configNumberOfLines = config.get("lines", 3);
    if (numberOfLines) {
        configNumberOfLines = numberOfLines;
    }

    // configure identation
    const identationRenderer = new IdentationRenderer();
    const identationSelection = new vscode.Selection(selection.end.line, 0, selection.end.line, selection.end.character);
    const identationSelectionText = vscode.window.activeTextEditor.document.getText(identationSelection);
    const identation = identationRenderer.render(identationSelectionText);

    // configure divider renderer
    const commentRenderer = CommentRendererFactory.create(vscode.window.activeTextEditor.document.languageId);
    const dividerRenderer = new DividerRenderer(commentRenderer, configNumberOfLines, identation);

    // render divider
    const divider = dividerRenderer.render(selection.start.character, configEndColumn, configText);

    // insert divider
    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.replace(selection, divider));

    // position the cursor inside or after the divider
    const lineToSetCursor = selection.start.line + (dividerRenderer.getLineToSerCursor() - 1);
    let positionToSetCursor = new vscode.Position(lineToSetCursor, selection.start.character);
    if (configNumberOfLines >= 3) {
        positionToSetCursor = new vscode.Position(lineToSetCursor, selection.start.character + commentRenderer.startCommentText.length + 1);
    }
    const selectionToSetCursor = new vscode.Selection(positionToSetCursor, positionToSetCursor);
    vscode.window.activeTextEditor.selection = selectionToSetCursor;
}
