import { CommentRenderer } from "./commentRenderers";

export abstract class LineRenderer {

    // SERVICES
    protected readonly commentRenderer: CommentRenderer;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer) {
        this.commentRenderer = commentRenderer;
    }

    // RENDER
    abstract render(): string;
}

export class FullLineRenderer extends LineRenderer {

    // DATA
    private dividerStartColumn: number = 0;
    private dividerEndColumn: number = 80;
    private dividerText: string = "=";

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer, dividerStartColumn: number, dividerEndColumn: number, dividerText: string) {
        super(commentRenderer);
        this.dividerStartColumn = dividerStartColumn;
        this.dividerEndColumn = dividerEndColumn;
        this.dividerText = dividerText;
    }

    // RENDER
    render(): string {
        let lineLength = (this.dividerEndColumn - this.dividerStartColumn - this.commentRenderer.getMinimumSize());
        let lineText = this.dividerText.repeat(lineLength).substring(0, lineLength);

        return this.commentRenderer.render(lineText);
    }
}

export class EmptyLineRenderer extends LineRenderer {

    // RENDER
    render(): string {
        return this.commentRenderer.render("");
    }
}
