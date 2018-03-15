import { BlockRenderer, BlockRendererFactory } from "./blockRenderers";
import { CommentRenderer } from "./commentRenderers";

export class DividerRenderer {

    // SERVICES
    private readonly blockRenderer: BlockRenderer;

    // DATA
    private dividerStartColumn: number;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer, numberOfLines: number, dividerStartColumn: number, dividerEndColumn: number, dividerText: string){
        this.dividerStartColumn = dividerStartColumn;
        this.blockRenderer = BlockRendererFactory.create(numberOfLines, commentRenderer, dividerStartColumn, dividerEndColumn, dividerText);
    }

    // =========================================================================
    // GETTERS
    // =========================================================================
    getLineToSerCursor(): number {
        return this.blockRenderer.getLineToSerCursor();
    }

    // =========================================================================
    // RENDER
    // =========================================================================
    render(): string {
        // render divider
        let divider = this.blockRenderer.render();

        // add necessary identation to the left
        let dividerWithIdentation = this.addIdentationSpace(divider);

        return dividerWithIdentation;
    }

    private addIdentationSpace(divider: string): string {
        // configure whitespace
        let whitespace = " ".repeat(this.dividerStartColumn);

        // split lines to append whitespace and set line-breaks according to editor
        let lines = divider.split("\n");

        let dividerWithIdentation = "";
        for (let index = 0; index < lines.length; index++) {
            let line = lines[index];

            // append whitespace if not first line
            if (index !== 0) {
                line = whitespace + line;
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
