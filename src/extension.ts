import * as vscode from "vscode";

import { CommentRendererFactory } from "./renderers/commentRenderers";
import { DividerRenderer } from "./renderers/dividerRenderer";
import { IndentationRenderer } from "./renderers/indentationRenderer";

// ============================================================================
// EXTENSION INTERFACE
// ============================================================================
export function activate(context: vscode.ExtensionContext): void {

    // ADD DIVIDER - LEVEL 1
    const addDividerLevel1 = vscode.commands.registerCommand("divider.addDividerLevel1", () => {
        const currentSelection = vscode.window.activeTextEditor.selection;
        insertDivider(currentSelection, 1);
    });
    context.subscriptions.push(addDividerLevel1);

    // ADD DIVIDER - LEVEL 2
    const addDividerLevel2 = vscode.commands.registerCommand("divider.addDividerLevel2", () => {
        const currentSelection = vscode.window.activeTextEditor.selection;
        insertDivider(currentSelection, 2);
    });
    context.subscriptions.push(addDividerLevel2);

    // ADD DIVIDER - LEVEL 1 - ONE LINE
    const addDividerLevel1WithOneLine = vscode.commands.registerCommand("divider.addDividerLevel1WithOneLine", () => {
        const currentSelection = vscode.window.activeTextEditor.selection;
        insertDivider(currentSelection, 1, 1);
    });
    context.subscriptions.push(addDividerLevel1WithOneLine);

    // ADD DIVIDER - LEVEL 2 - ONE LINE
    const addDividerLevel2WithOneLine = vscode.commands.registerCommand("divider.addDividerLevel2WithOneLine", () => {
        const currentSelection = vscode.window.activeTextEditor.selection;
        insertDivider(currentSelection, 2, 1);
    });
    context.subscriptions.push(addDividerLevel2WithOneLine);
}

export function deactivate(): void {
    // do nothing
}

// =============================================================================
// INSERT DIVIDER ENTRY POINT
// =============================================================================
function insertDivider(selection: vscode.Selection, level: number, numberOfLines?: number): void {
    // read divider config
    const dividerConfig = vscode.workspace.getConfiguration("divider");
    const dividerEndColumn = dividerConfig.get("endColumn", 80);
    const dividerText = dividerConfig.get(`text.level${level}`, "=");
    const dividerNumberOfLines = numberOfLines || dividerConfig.get("lines", 3);

    // configure identation
    const indentationSelection = new vscode.Selection(selection.end.line, 0, selection.end.line, selection.start.character);
    const indentationSelectionText = vscode.window.activeTextEditor.document.getText(indentationSelection);
    const indentationTabWidth = vscode.window.activeTextEditor.options.tabSize as number;
    const indentation = new IndentationRenderer().render(indentationSelectionText, indentationTabWidth);

    // configure divider renderer
    const commentRenderer = CommentRendererFactory.create(vscode.window.activeTextEditor.document.languageId);
    const dividerRenderer = new DividerRenderer(commentRenderer, dividerNumberOfLines, indentation.text);

    // render divider
    const dividerStartColumn = indentation.whitespaceWidth;
    const divider = dividerRenderer.render(dividerStartColumn, dividerEndColumn, dividerText);

    // insert divider
    const editor = vscode.window.activeTextEditor;
    editor.edit(edit => edit.replace(selection, divider));

    // position the cursor inside or after the divider
    const lineToSetCursor = selection.start.line + (dividerRenderer.getLineToSerCursor() - 1);
    let positionToSetCursor = new vscode.Position(lineToSetCursor, selection.start.character);
    if (dividerNumberOfLines >= 3) {
        positionToSetCursor = new vscode.Position(lineToSetCursor, selection.start.character + commentRenderer.startCommentText.length + 1);
    }
    const selectionToSetCursor = new vscode.Selection(positionToSetCursor, positionToSetCursor);
    vscode.window.activeTextEditor.selection = selectionToSetCursor;
}
