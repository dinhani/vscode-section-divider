import { CommentRenderer } from "./commentRenderers";
import { EmptyLineRenderer, FullLineRenderer } from "./lineRenderers";

export abstract class BlockRenderer {

    // SERVICES
    protected readonly emptyLineRenderer: EmptyLineRenderer;
    protected readonly fullLineRenderer: FullLineRenderer;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer){
        this.emptyLineRenderer = new EmptyLineRenderer(commentRenderer);
        this.fullLineRenderer = new FullLineRenderer(commentRenderer);
    }

    // INTERFACE
    abstract render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string;
    abstract getLineToSerCursor(): number;
}

export class SingleLineBlockRenderer extends BlockRenderer {
    // METADATA
    getLineToSerCursor(): number {
        return 2;
    }

    // RENDER
    render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string {
        return this.fullLineRenderer.render(dividerStartColumn, dividerEndColumn, dividerText);
    }
}

export class TwoLineBlockRenderer extends BlockRenderer {
    // METADATA
    getLineToSerCursor(): number {
        return 3;
    }

    // RENDER
    render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string {
        let block = `${this.fullLineRenderer.render(dividerStartColumn, dividerEndColumn, dividerText)}\n`;
        block += this.fullLineRenderer.render(dividerStartColumn, dividerEndColumn, dividerText);

        return block;
    }
}

export class MultipleLineBlockRenderer extends BlockRenderer {
    // DATA
    lines: number = 3;

    // METADATA
    getLineToSerCursor(): number {
        return 2;
    }

    // RENDER
    render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string {
        let emptyLines = this.lines - 2;
        let block = `${this.fullLineRenderer.render(dividerStartColumn, dividerEndColumn, dividerText)}\n`;
        for (let emptyLine = 0; emptyLine < emptyLines; emptyLine++) {
            block += `${this.emptyLineRenderer.render()}\n`;
        }
        block += this.fullLineRenderer.render(dividerStartColumn, dividerEndColumn, dividerText);

        return block;
    }
}

// =============================================================================
// FACTORY
// =============================================================================
export class BlockRendererFactory {

    static create(numberOfLines: number, commentRenderer: CommentRenderer): BlockRenderer {
        let renderer = null;
        if (numberOfLines <= 1) {
            renderer = new SingleLineBlockRenderer(commentRenderer);
        } else if (numberOfLines === 2) {
            renderer = new TwoLineBlockRenderer(commentRenderer);
        } else {
            renderer = new MultipleLineBlockRenderer(commentRenderer);
            renderer.lines = numberOfLines;
        }
        return renderer;
    }
}
