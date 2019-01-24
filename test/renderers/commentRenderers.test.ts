import * as assert from "assert";
import { BlockCommentRenderer, CommentRenderer, CommentRendererFactory, LineCommentRenderer } from "../../src/renderers/commentRenderers";

suite("Comment Renderers", () => {
    test("LineCommentRenderer render", () => {
        let renderer = new LineCommentRenderer("//");
        let comment = renderer.render("test");
        assert.equal(comment, "// test");
    });
    test("BlockCommentRenderer render", () => {
        let renderer = new BlockCommentRenderer("/*", "*/");
        let comment = renderer.render("test");
        assert.equal(comment, "/* test */");
    });
    test("CommentRendererFactory create", () => {
        // ruby
        let rubyRenderer: CommentRenderer = CommentRendererFactory.create("  RuBy  ");
        assert.equal(rubyRenderer.render("test"), "# test");

        // java
        let javaRenderer: CommentRenderer = CommentRendererFactory.create("   JAVa   ");
        assert.equal(javaRenderer.render("test"), "// test");

        // missing
        let missingRendered: CommentRenderer = CommentRendererFactory.create(undefined);
        assert.equal(missingRendered.render("test"), "// test");
    });
});
