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
            case "apex":
            case "c":
            case "carbon":
            case "ceylon":
            case "cpp":
            case "csharp":
            case "cuda":
            case "d":
            case "dart":
            case "fsharp":
            case "gleam":
            case "glsl":
            case "go":
            case "groovy":
            case "haxe":
            case "hlsl":
            case "java":
            case "javascript":
            case "javascriptreact":
            case "jsonc":
            case "kotlin":
            case "objective-c":
            case "objective-cpp":
            case "odin":
            case "pascal":
            case "php":
            case "proto":
            case "proto3":
            case "reason":
            case "rust":
            case "scala":
            case "solidity":
            case "stylus":
            case "swift":
            case "typescript":
            case "typescriptreact":
            case "v":
            case "zig":
                return new LineCommentRenderer("//");
            // //-
            case "jade":
            case "pug":
                return new LineCommentRenderer("//-");
            // #
            case "cmake":
            case "coffeescript":
            case "crystal":
            case "dockercompose":
            case "dockerfile":
            case "elixir":
            case "fish":
            case "gemfile":
            case "graphql":
            case "hcl":
            case "ini":
            case "julia":
            case "just":
            case "makefile":
            case "mojo":
            case "nim":
            case "nix":
            case "perl":
            case "perl6":
            case "powershell":
            case "properties":
            case "puppet":
            case "python":
            case "r":
            case "raku":
            case "ruby":
            case "shellscript":
            case "starlark":
            case "tcl":
            case "terraform":
            case "toml":
            case "yaml":
                return new LineCommentRenderer("#");
            // --
            case "ada":
            case "applescript":
            case "elm":
            case "haskell":
            case "lua":
            case "plpgsql":
            case "sql":
            case "vhdl":
                return new LineCommentRenderer("--");
            // ;
            case "ahk":
            case "asm":
            case "nasm":
                return new LineCommentRenderer(";");
            // ;;
            case "clojure":
            case "fennel":
            case "lisp":
            case "racket":
            case "scheme":
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
            case "postscript":
            case "prolog":
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
            case "handlebars":
            case "html":
            case "html (eex)":
            case "jinja":
            case "markdown":
            case "razor":
            case "svelte":
            case "twig":
            case "vue":
            case "xml":
            case "xsl":
                return new BlockCommentRenderer("<!--", "-->");
            case "mathematica":
            case "ocaml":
            case "wolfram":
                return new BlockCommentRenderer("(*", "*)");
            default:
                return new LineCommentRenderer("//");
        }
    }
}
