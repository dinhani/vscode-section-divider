import { CommentRendererFactory } from './commentRenderers';

export abstract class LineRenderer {

    // DATA
    documentLanguage: string = "";
    dividerStartColumn: number = 0;
    dividerEndColumn: number = 80;
    dividerText: string = "=";

    // RENDER
    abstract render(): string;
}

export class DividerLineRenderer extends LineRenderer {

    // RENDER
    render(): string {
        let commentRenderer = CommentRendererFactory.create(this.documentLanguage);

        let dividerTextLength = (this.dividerEndColumn - this.dividerStartColumn - commentRenderer.getMinimumSize());
        let dividerText = this.dividerText.repeat(dividerTextLength).substring(0, dividerTextLength);

        return commentRenderer.render(dividerText)
    }
}

export class EmptyLineRenderer extends LineRenderer {

    // RENDER
    render(): string {
        let commentRenderer = CommentRendererFactory.create(this.documentLanguage);
        return commentRenderer.render("");
    }
}