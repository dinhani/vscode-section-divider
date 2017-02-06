export abstract class CommentRenderer {
    // DATA
    startCommentText: string

    abstract render(text: string): string;
    abstract getMinimumSize(): number;
}

export class LineCommentRenderer extends CommentRenderer {
    // CONSTRUCTOR
    constructor(startCommentText: string) {
        super();
        this.startCommentText = startCommentText;
    }

    // METADATA
    getMinimumSize(): number {
        return this.startCommentText.length + 1;
    }

    // RENDER
    render(startCommentText: string): string {
        return this.startCommentText + " " + startCommentText;
    }
}

export class BlockCommentRenderer extends CommentRenderer {
    // DATA
    endCommentText: string

    // CONSTRUCTOR
    constructor(startCommentText: string, endCommentText: string) {
        super()
        this.startCommentText = startCommentText;
        this.endCommentText = endCommentText;
    }

    // METADATA
    getMinimumSize(): number {
        return this.startCommentText.length + this.endCommentText.length + 2;
    }

    // RENDER
    render(text: string): string {
        return this.startCommentText + " " + text + " " + this.endCommentText;
    }
}

// =============================================================================
// FACTORY
// =============================================================================
export class CommentRendererFactory {

    static create(language: string): CommentRenderer {
        switch (language) {
            // //
            case "c":
            case "ceylon":
            case "cpp":
            case "csharp":
            case "d":
            case "dart":
            case "fsharp":
            case "go":
            case "groovy":
            case "haxe":
            case "java":
            case "javascript":
            case "kotlin":
            case "objective-c":
            case "pascal":
            case "php":
            case "rust":
            case "scala":
            case "swift":
            case "typescript":
                return new LineCommentRenderer("//");
            // #
            case "coffeescript":
            case "crystal":
            case "elixir":
            case "julia":
            case "perl":
            case "perl6":
            case "properties":
            case "python":
            case "r":
            case "ruby":
            case "yaml":
                return new LineCommentRenderer("#");
            // --
            case "elm":
            case "haskell":
            case "lua":
            case "sql":
                return new LineCommentRenderer("--");
            // ;;
            case "clojure":
            case "lisp":
            case "racket":
                return new LineCommentRenderer(";;");
            // '
            case "vb":
                return new LineCommentRenderer("'");
            // !
            case "fortran":
                return new LineCommentRenderer("!");
            // %
            case "erlang":
            case "latex":
            case "matlab":
                return new LineCommentRenderer("%");
            // \
            case "forth":
                return new LineCommentRenderer("\\");
            // /* */
            case "css":
            case "less":
            case "scss":
                return new BlockCommentRenderer("/*", "*/");
            // <!-- -->
            case "coldfusion":
            case "markdown":
            case "html":
            case "xml":
                return new BlockCommentRenderer("<!--", "-->");
            case "mathematica":
            case "wolfram":
                return new BlockCommentRenderer("(*", "*)");
            default:
                return new LineCommentRenderer("//");
        }
    }
}