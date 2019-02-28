export class IdentationRenderer {

    getIdentation(identationText: string): string {
        return identationText
            .split("")
            .map(c => c === "\t" ? "\t" : " ")
            .join("");
    }
}