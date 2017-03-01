import { BlockRendererFactory, BlockRenderer } from './blockRenderers';

export class DividerRenderer {

    // DOCUMENT DATA
    documentLanguage: string = "";
    documentLineBreak = "\n";

    // DIVIDER DATA
    dividerNumberOfLines: number = 3;
    dividerStartColumn: number = 0;
    dividerEndColumn: number = 80;
    dividerText: string = "=";

    // =========================================================================
    // GETTERS
    // =========================================================================
    getLineToSerCursor(): number {
        let blockRenderer = BlockRendererFactory.create(this.dividerNumberOfLines);
        return blockRenderer.getLineToSerCursor();
    }

    // =========================================================================
    // RENDER
    // =========================================================================
    render(): string {
        // configure block renderer
        let blockRenderer = BlockRendererFactory.create(this.dividerNumberOfLines);
        blockRenderer.documentLanguage = this.documentLanguage;
        blockRenderer.dividerStartColumn = this.dividerStartColumn
        blockRenderer.dividerEndColumn = this.dividerEndColumn;
        blockRenderer.dividerText = this.dividerText;

        // render divider
        let divider = blockRenderer.render();

        // add necessary identatino to the left
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
            if (index != 0) {
                line = whitespace + line;
            }

            // append line to the new divider
            dividerWithIdentation += line

            // append line-break if not last line
            if (index != lines.length - 1) {
                dividerWithIdentation += this.documentLineBreak;
            }
        }
        return dividerWithIdentation;
    }
}