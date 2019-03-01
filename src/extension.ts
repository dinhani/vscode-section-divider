import * as vscode from "vscode";

import { CommentRendererFactory } from "./renderers/commentRenderers";
import { DividerRenderer } from "./renderers/dividerRenderer";
import { IndentationRenderer } from "./renderers/indentationRenderer";

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
    const indentationRenderer = new IndentationRenderer();
    const indentationSelection = new vscode.Selection(selection.end.line, 0, selection.end.line, selection.start.character);
    const indentationSelectionText = vscode.window.activeTextEditor.document.getText(indentationSelection);
    const indentation = indentationRenderer.render(indentationSelectionText);

    // configure divider renderer
    const commentRenderer = CommentRendererFactory.create(vscode.window.activeTextEditor.document.languageId);
    const dividerRenderer = new DividerRenderer(commentRenderer, configNumberOfLines, indentation);

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
