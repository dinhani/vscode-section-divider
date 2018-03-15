import * as assert from "assert";
import { BlockCommentRenderer, CommentRendererFactory, LineCommentRenderer } from "../../src/renderers/commentRenderers";

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
});
