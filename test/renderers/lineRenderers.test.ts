import * as assert from "assert";
import { LineCommentRenderer } from "../../src/renderers/commentRenderers";
import { EmptyLineRenderer, FullLineRenderer } from "../../src/renderers/lineRenderers";

suite("Line Renderers", () => {
    const commentRenderer = new LineCommentRenderer("//");

    test("LineCommentRenderer render", () => {
        const fullLineRenderer = new FullLineRenderer(commentRenderer);
        const comment = fullLineRenderer.render(0, 80, "=");
        assert.equal(comment, "// =============================================================================");
        assert.equal(comment.length, 80);
    });
    test("BlockCommentRenderer render", () => {
        const emptyLineRenderer = new EmptyLineRenderer(commentRenderer);
        const comment = emptyLineRenderer.render(0, 80, "=");
        assert.equal(comment, "// ");
        assert.equal(comment.length, 3);
    });
});
