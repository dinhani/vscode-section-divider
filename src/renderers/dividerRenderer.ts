import { BlockRenderer, BlockRendererFactory } from "./blockRenderers";
import { CommentRenderer } from "./commentRenderers";

export class DividerRenderer {

    // SERVICES
    private readonly blockRenderer: BlockRenderer;
    private readonly identation: string;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer, numberOfLines: number, identation: string) {
        this.blockRenderer = BlockRendererFactory.create(numberOfLines, commentRenderer);
        this.identation = identation;
    }

    // =========================================================================
    // GETTERS
    // =========================================================================
    getLineToSerCursor(): number {
        return this.blockRenderer.getLineToSetCursor();
    }

    // =========================================================================
    // RENDER
    // =========================================================================
    render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string {
        // render divider
        let divider = this.blockRenderer.render(dividerStartColumn, dividerEndColumn, dividerText);

        // add necessary identation to the left
        let dividerWithIdentation = this.addIdentationSpace(divider, dividerStartColumn);

        return dividerWithIdentation;
    }

    private addIdentationSpace(divider: string, dividerStartColumn: number): string {
        // split lines to append whitespace and set line-breaks according to editor
        const lines = divider.split("\n");

        let dividerWithIdentation = "";
        for (let index = 0; index < lines.length; index++) {
            let line = lines[index];

            // append whitespace if not first line
            if (index !== 0) {
                line = this.identation + line;
            }

            // append line to the new divider
            dividerWithIdentation += line;

            // append line-break if not last line
            if (index !== lines.length - 1) {
                dividerWithIdentation += "\n";
            }
        }
        return dividerWithIdentation;
    }
}
