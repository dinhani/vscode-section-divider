import { CommentRenderer } from "./commentRenderers";
import { EmptyLineRenderer, FullLineRenderer } from "./lineRenderers";

export abstract class BlockRenderer {

    // SERVICES
    protected readonly emptyLineRenderer: EmptyLineRenderer;
    protected readonly fullLineRenderer: FullLineRenderer;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer) {
        this.emptyLineRenderer = new EmptyLineRenderer(commentRenderer);
        this.fullLineRenderer = new FullLineRenderer(commentRenderer);
    }

    // INTERFACE
    abstract render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string;
    abstract getLineToSetCursor(): number;
}

export class SingleLineBlockRenderer extends BlockRenderer {
    // METADATA
    getLineToSetCursor(): number {
        return 2;
    }

    // RENDER
    render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string {
        return this.fullLineRenderer.render(dividerStartColumn, dividerEndColumn, dividerText);
    }
}

export class TwoLineBlockRenderer extends BlockRenderer {
    // METADATA
    getLineToSetCursor(): number {
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
    readonly lines: number;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer, lines: number) {
        super(commentRenderer);
        this.lines = lines;
    }

    // METADATA
    getLineToSetCursor(): number {
        return 2;
    }

    // RENDER
    render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string {
        const emptyLines = this.lines - 2;
        let block = `${this.fullLineRenderer.render(dividerStartColumn, dividerEndColumn, dividerText)}\n`;
        for (let emptyLine = 0; emptyLine < emptyLines; emptyLine++) {
            block += `${this.emptyLineRenderer.render(dividerStartColumn, dividerEndColumn, dividerText)}\n`;
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
        if (numberOfLines <= 1) {
            return new SingleLineBlockRenderer(commentRenderer);
        } else if (numberOfLines === 2) {
            return new TwoLineBlockRenderer(commentRenderer);
        } else {
            return new MultipleLineBlockRenderer(commentRenderer, numberOfLines);
        }
    }
}
