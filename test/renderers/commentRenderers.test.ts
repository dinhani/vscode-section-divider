import * as assert from "assert";
import {
    BlockCommentRenderer,
    CommentRenderer,
    CommentRendererFactory,
    LineCommentRenderer,
} from "../../src/renderers/commentRenderers";

suite("Comment Renderers", () => {
    test("LineCommentRenderer render", () => {
        const renderer = new LineCommentRenderer("//");
        const comment = renderer.render("test");
        assert.equal(comment, "// test");
    });
    test("BlockCommentRenderer render", () => {
        const renderer = new BlockCommentRenderer("/*", "*/");
        const comment = renderer.render("test");
        assert.equal(comment, "/* test */");
    });
    test("CommentRendererFactory create", () => {
        // ruby
        const rubyRenderer: CommentRenderer = CommentRendererFactory.create(
            "  RuBy  ",
            {}
        );
        assert.equal(rubyRenderer.render("test"), "# test");

        // java
        const javaRenderer: CommentRenderer = CommentRendererFactory.create(
            "   JAVa   ",
            {}
        );
        assert.equal(javaRenderer.render("test"), "// test");

        // missing
        const missingRendered: CommentRenderer = CommentRendererFactory.create(
            undefined,
            {}
        );
        assert.equal(missingRendered.render("test"), "// test");
    });
    test("CommentRendererFactory create with overrides", () => {
        let configWithString = CommentRendererFactory.create("java", {
            java: "#",
        });
        assert.strictEqual(configWithString.render("test"), "# test");

        let configWithArray1 = CommentRendererFactory.create("java", {
            java: ["#"],
        });
        assert.strictEqual(configWithArray1.render("test"), "# test");

        let configWithArray2 = CommentRendererFactory.create("java", {
            java: ["/*", "*/"],
        });
        assert.strictEqual(configWithArray2.render("test"), "/* test */");

        let configWithArray3 = CommentRendererFactory.create("java", {
            java: ["/*", "*/", "aaa"],
        });
        assert.strictEqual(configWithArray3.render("test"), "/* test */");

        let configWithDifferentLanguage = CommentRendererFactory.create(
            "java",
            { node: "#" }
        );
        assert.strictEqual(
            configWithDifferentLanguage.render("test"),
            "// test"
        );
    });
});
