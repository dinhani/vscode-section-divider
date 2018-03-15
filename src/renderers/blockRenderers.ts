import { CommentRenderer } from "./commentRenderers";
import { EmptyLineRenderer, FullLineRenderer, LineRenderer } from "./lineRenderers";

export abstract class BlockRenderer {

    // SERVICES
    protected readonly emptyLineRenderer: EmptyLineRenderer;
    protected readonly fullLineRenderer: FullLineRenderer;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer, dividerStartColumn: number, dividerEndColumn: number, dividerText: string){
        this.emptyLineRenderer = new EmptyLineRenderer(commentRenderer);
        this.fullLineRenderer = new FullLineRenderer(commentRenderer, dividerStartColumn, dividerEndColumn, dividerText);
    }

    // INTERFACE
    abstract render(): string;
    abstract getLineToSerCursor(): number;
}

export class SingleLineBlockRenderer extends BlockRenderer {
    // METADATA
    getLineToSerCursor(): number {
        return 2;
    }

    // RENDER
    render(): string {
        return this.fullLineRenderer.render();
    }
}

export class TwoLineBlockRenderer extends BlockRenderer {
    // METADATA
    getLineToSerCursor(): number {
        return 3;
    }

    // RENDER
    render(): string {
        let block = `${this.fullLineRenderer.render()}\n`;
        block += this.fullLineRenderer.render();

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
    render(): string {
        let emptyLines = this.lines - 2;
        let block = `${this.fullLineRenderer.render()}\n`;
        for (let emptyLine = 0; emptyLine < emptyLines; emptyLine++) {
            block += `${this.emptyLineRenderer.render()}\n`;
        }
        block += this.fullLineRenderer.render();

        return block;
    }
}

// =============================================================================
// FACTORY
// =============================================================================
export class BlockRendererFactory {

    static create(numberOfLines: number, commentRenderer: CommentRenderer, dividerStartColumn: number, dividerEndColumn: number, dividerText: string): BlockRenderer {
        let renderer = null;
        if (numberOfLines <= 1) {
            renderer = new SingleLineBlockRenderer(commentRenderer, dividerStartColumn, dividerEndColumn, dividerText);
        } else if (numberOfLines === 2) {
            renderer = new TwoLineBlockRenderer(commentRenderer, dividerStartColumn, dividerEndColumn, dividerText);
        } else {
            renderer = new MultipleLineBlockRenderer(commentRenderer, dividerStartColumn, dividerEndColumn, dividerText);
            renderer.lines = numberOfLines;
        }
        return renderer;
    }
}
