import { CommentRenderer } from "./commentRenderers";

export abstract class LineRenderer {

    // DATA
    dividerStartColumn: number = 0;
    dividerEndColumn: number = 80;
    dividerText: string = "=";

    protected readonly commentRenderer: CommentRenderer;

    // CONSTRUCTOR
    constructor(commentRenderer: CommentRenderer){
        this.commentRenderer = commentRenderer;
    }

    // RENDER
    abstract render(): string;
}

export class FullLineRenderer extends LineRenderer {

    // RENDER
    render(): string {
        let dividerTextLength = (this.dividerEndColumn - this.dividerStartColumn - this.commentRenderer.getMinimumSize());
        let dividerText = this.dividerText.repeat(dividerTextLength).substring(0, dividerTextLength);

        return this.commentRenderer.render(dividerText);
    }
}

export class EmptyLineRenderer extends LineRenderer {

    // RENDER
    render(): string {
        return this.commentRenderer.render("");
    }
}
