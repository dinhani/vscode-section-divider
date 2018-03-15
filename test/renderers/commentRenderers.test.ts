import * as assert from "assert";
import { CommentRendererFactory, LineCommentRenderer, BlockCommentRenderer } from "../../src/renderers/commentRenderers";

suite("Comment Renderers", () => {
    test("LineCommentRenderer render", () => {
        let renderer = new LineCommentRenderer("//");
        let comment = renderer.render("test");
        assert.equal(comment, "// test");
    });
    test("LineCommentRenderer properties", () => {
        let renderer = new LineCommentRenderer("//");
        renderer.startCommentText = "#";
        let comment = renderer.render("test");
        assert.equal(comment, "# test");
    });
    test("BlockCommentRenderer render", () => {
        let renderer = new BlockCommentRenderer("/*", "*/");
        let comment = renderer.render("test");
        assert.equal(comment, "/* test */");
    });
    test("BlockCommentRenderer properties", () => {
        let renderer = new BlockCommentRenderer("/*", "*/");
        renderer.startCommentText = "<!--";
        renderer.endCommentText = "-->";
        let comment = renderer.render("test");
        assert.equal(comment, "<!-- test -->");
    });
});
