import { CommentRenderer } from "./commentRenderers";

export class FullLineRenderer {

    // SERVICES
    private readonly commentRenderer: CommentRenderer;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer) {
        this.commentRenderer = commentRenderer;
    }

    // RENDER
    render(dividerStartColumn: number, dividerEndColumn: number, dividerText: string): string {
        let lineLength = (dividerEndColumn - dividerStartColumn - this.commentRenderer.getMinimumSize());
        let lineText = dividerText.repeat(lineLength).substring(0, lineLength);

        return this.commentRenderer.render(lineText);
    }
}

export class EmptyLineRenderer {

    // SERVICES
    private commentRenderer: CommentRenderer;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer) {
        this.commentRenderer = commentRenderer;
    }

    // RENDER
    render(): string {
        return this.commentRenderer.render("");
    }
}
