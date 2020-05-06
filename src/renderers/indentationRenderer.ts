export class IndentationRenderer {

    render(indentationText: string, editorTabSize: number): IndentationRendered {
        const text = indentationText
            .split("")
            .map(c => c === "\t" ? "\t" : " ")
            .join("");

        const whitespaceWidth = text
            .split("")
            .map(c => c === "\t" ? editorTabSize : 1)
            .reduce((total, n) => total + n, 0);

        return {
            text: text,
            whitespaceWidth: whitespaceWidth
        }
    }
}

export class IndentationRendered {
    text: string;
    whitespaceWidth: number;
}