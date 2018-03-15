import { CommentRenderer } from "./commentRenderers";
import { EmptyLineRenderer, FullLineRenderer, LineRenderer } from "./lineRenderers";

export abstract class BlockRenderer {

    // DATA
    dividerStartColumn: number = 0;
    dividerEndColumn: number = 80;
    dividerText: string = "=";

    protected readonly commentRenderer: CommentRenderer;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer){
        this.commentRenderer = commentRenderer;
    }

    // INTERFACE
    abstract render(): string;
    abstract getLineToSerCursor(): number;

    protected configureRenderer(renderer: LineRenderer): void {
        renderer.dividerStartColumn = this.dividerStartColumn;
        renderer.dividerEndColumn = this.dividerEndColumn;
        renderer.dividerText = this.dividerText;
    }
}

export class SingleLineBlockRenderer extends BlockRenderer {
    // METADATA
    getLineToSerCursor(): number {
        return 2;
    }

    // RENDER
    render(): string {
        // prepare
        let dividerRenderer = new FullLineRenderer(this.commentRenderer);
        this.configureRenderer(dividerRenderer);

        // render
        return dividerRenderer.render();
    }
}

export class TwoLineBlockRenderer extends BlockRenderer {
    // METADATA
    getLineToSerCursor(): number {
        return 3;
    }

    // RENDER
    render(): string {
        // prepare
        let dividerRenderer = new FullLineRenderer(this.commentRenderer);
        this.configureRenderer(dividerRenderer);

        // render
        let block = `${dividerRenderer.render()}\n`;
        block += dividerRenderer.render();

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
        // prepare
        let dividerRenderer = new FullLineRenderer(this.commentRenderer);
        this.configureRenderer(dividerRenderer);

        let emptyRenderer = new EmptyLineRenderer(this.commentRenderer);
        this.configureRenderer(emptyRenderer);

        // render
        let emptyLines = this.lines - 2;
        let block = `${dividerRenderer.render()}\n`;
        for (let emptyLine = 0; emptyLine < emptyLines; emptyLine++) {
            block += `${emptyRenderer.render()}\n`;
        }
        block += dividerRenderer.render();

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
