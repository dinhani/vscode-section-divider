import * as assert from "assert";
import { DividerLineRenderer, EmptyLineRenderer } from "../../src/renderers/lineRenderers";

suite("Line Renderers", () => {
    test("LineCommentRenderer render", () => {
        let renderer = new DividerLineRenderer();
        let comment = renderer.render();
        assert.equal(comment, "// =============================================================================");
        assert.equal(comment.length, 80);
    });
    test("BlockCommentRenderer render", () => {
        let renderer = new EmptyLineRenderer();
        let comment = renderer.render();
        assert.equal(comment, "// ");
        assert.equal(comment.length, 3);
    });
});
