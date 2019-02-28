export class IndentationRenderer {

    render(identationText: string): string {
        return identationText
            .split("")
            .map(c => c === "\t" ? "\t" : " ")
            .join("");
    }
}