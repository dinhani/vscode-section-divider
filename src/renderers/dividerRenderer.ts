import { BlockRenderer, BlockRendererFactory } from "./blockRenderers";
import { CommentRenderer } from "./commentRenderers";

export class DividerRenderer {

    // SERVICES
    private readonly blockRenderer: BlockRenderer;
    private readonly indentation: string;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer, numberOfLines: number, indentation: string) {
        this.blockRenderer = BlockRendererFactory.create(numberOfLines, commentRenderer);
        this.indentation = indentation;
    }

    // =========================================================================
    // GETTERS
    // =========================================================================
    getLineToSetCursor(): number {
        return this.blockRenderer.getLineToSetCursor();
    }

    // =========================================================================
    // RENDER
    // =========================================================================
    render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string {
        // render divider
        let divider = this.blockRenderer.render(dividerStartColumn, dividerEndColumn, dividerText);

        // add necessary indentation to the left
        let dividerWithIndentation = this.addIndentationSpace(divider, dividerStartColumn);

        return dividerWithIndentation;
    }

    private addIndentationSpace(divider: string, dividerStartColumn: number): string {
        // split lines to append whitespace and set line-breaks according to editor
        const lines = divider.split("\n");

        let dividerWithIndentation = "";
        for (let index = 0; index < lines.length; index++) {
            let line = lines[index];

            // append whitespace if not first line
            if (index !== 0) {
                line = this.indentation + line;
            }

            // append line to the new divider
            dividerWithIndentation += line;

            // append line-break if not last line
            if (index !== lines.length - 1) {
                dividerWithIndentation += "\n";
            }
        }
        return dividerWithIndentation;
    }
}
