import * as assert from "assert";
import { LineCommentRenderer } from "../../src/renderers/commentRenderers";
import { EmptyLineRenderer, FullLineRenderer } from "../../src/renderers/lineRenderers";

suite("Line Renderers", () => {
    let commentRenderer = new LineCommentRenderer("//");

    test("LineCommentRenderer render", () => {
        let fullLineRenderer = new FullLineRenderer(commentRenderer);
        let comment = fullLineRenderer.render(0, 80, "=");
        assert.equal(comment, "// =============================================================================");
        assert.equal(comment.length, 80);
    });
    test("BlockCommentRenderer render", () => {
        let emptyLineRenderer = new EmptyLineRenderer(commentRenderer);
        let comment = emptyLineRenderer.render(0, 80, "=");
        assert.equal(comment, "// ");
        assert.equal(comment.length, 3);
    });
});
