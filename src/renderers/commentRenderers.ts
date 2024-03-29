export abstract class CommentRenderer {

    // DATA
    readonly startCommentText: string;

    // CONSTRUCTOR
    constructor(startCommentText: string) {
        this.startCommentText = startCommentText;
    }

    // ABSTRACT
    abstract render(text: string): string;
    abstract getMinimumSize(): number;
}

export class LineCommentRenderer extends CommentRenderer {

    // CONSTRUCTOR
    constructor(startCommentText: string) {
        super(startCommentText);
    }

    // METADATA
    getMinimumSize(): number {
        return this.startCommentText.length + 1;
    }

    // RENDER
    render(text: string): string {
        return `${this.startCommentText} ${text}`;
    }
}

export class BlockCommentRenderer extends CommentRenderer {

    // DATA
    readonly endCommentText: string;

    // CONSTRUCTOR
    constructor(startCommentText: string, endCommentText: string) {
        super(startCommentText);
        this.endCommentText = endCommentText;
    }

    // METADATA
    getMinimumSize(): number {
        return this.startCommentText.length + this.endCommentText.length + 2;
    }

    // RENDER
    render(text: string): string {
        return `${this.startCommentText} ${text} ${this.endCommentText}`;
    }
}

// =============================================================================
// FACTORY
// =============================================================================
export class CommentRendererFactory {

    static create(language: string, overrides: object): CommentRenderer {
        // check no language parameter present
        if (!language) {
            return new LineCommentRenderer("//");
        }

        // prepare language parameter
        const languageNormalized = language.toLowerCase().trim();

        // check language custom configuration
        const languageOverrides = overrides[languageNormalized];
        if (typeof languageOverrides === "string") {
            return new LineCommentRenderer(languageOverrides);
        }
        if (Array.isArray(languageOverrides) && languageOverrides.length === 1) {
            return new LineCommentRenderer(languageOverrides[0]);
        }
        if (Array.isArray(languageOverrides) && languageOverrides.length >= 2) {
            return new BlockCommentRenderer(languageOverrides[0], languageOverrides[1]);
        }

        // check language
        switch (languageNormalized) {
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
            case "stylus":
            case "swift":
            case "typescript":
                return new LineCommentRenderer("//");
            // //-
            case "jade":
            case "pug":
                return new LineCommentRenderer("//-");
            // #
            case "coffeescript":
            case "crystal":
            case "dockercompose":
            case "dockerfile":
            case "elixir":
            case "gemfile":
            case "graphql":
            case "julia":
            case "makefile":
            case "perl":
            case "perl6":
            case "powershell":
            case "properties":
            case "python":
            case "r":
            case "ruby":
            case "shellscript":
            case "tcl":
            case "toml":
            case "yaml":
                return new LineCommentRenderer("#");
            // --
            case "ada":
            case "elm":
            case "haskell":
            case "lua":
            case "sql":
                return new LineCommentRenderer("--");
            // ;
            case "ahk":
                return new LineCommentRenderer(";");
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
            // *
            case "abap":
            case "cobol":
            case "sas":
            case "spss":
            case "stata":
                return new LineCommentRenderer("*");
            case "bat":
                return new LineCommentRenderer("REM");
            // /* */
            case "css":
            case "less":
            case "scss":
                return new BlockCommentRenderer("/*", "*/");
            // <!-- -->
            case "coldfusion":
            case "erb":
            case "html":
            case "html (eex)":
            case "markdown":
            case "vue":
            case "xml":
            case "xsl":
                return new BlockCommentRenderer("<!--", "-->");
            case "mathematica":
            case "wolfram":
                return new BlockCommentRenderer("(*", "*)");
            default:
                return new LineCommentRenderer("//");
        }
    }
}
