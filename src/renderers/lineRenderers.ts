import { CommentRenderer } from "./commentRenderers";

export abstract class LineRenderer {

    // SERVICES
    protected readonly commentRenderer: CommentRenderer;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer) {
        this.commentRenderer = commentRenderer;
    }

    // ABSTRACT
    abstract render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string;
}

export class FullLineRenderer extends LineRenderer {

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer) {
        super(commentRenderer);
    }

    // RENDER
    render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string {
        let lineLength = (dividerEndColumn - dividerStartColumn - this.commentRenderer.getMinimumSize());
        let lineText = dividerText.repeat(lineLength).substring(0, lineLength);

        return this.commentRenderer.render(lineText);
    }
}

export class EmptyLineRenderer extends LineRenderer {

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer) {
        super(commentRenderer);
    }

    // RENDER
    render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string {
        return this.commentRenderer.render("");
    }
}
