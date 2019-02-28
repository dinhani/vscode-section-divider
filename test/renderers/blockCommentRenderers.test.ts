import * as assert from "assert";
import { MultipleLineBlockRenderer, SingleLineBlockRenderer, TwoLineBlockRenderer } from "../../src/renderers/blockRenderers";
import { LineCommentRenderer } from "../../src/renderers/commentRenderers";

suite("Block Renderers", () => {
    const commentRenderer = new LineCommentRenderer("//");

    test("SingleLineBlockRenderer render", () => {
        const renderer = new SingleLineBlockRenderer(commentRenderer);
        const comment = renderer.render(0, 80, "=");
        assert.equal(comment, "// =============================================================================");
        assert.equal(comment.length, 80);
    });
    test("TwoLineBlockRenderer render", () => {
        const renderer = new TwoLineBlockRenderer(commentRenderer);
        const comment = renderer.render(0, 80, "=");
        assert.equal(comment, "// =============================================================================\n// =============================================================================");
        assert.equal(comment.length, 161);
    });
    test("MultipleLineBlockRenderer render", () => {
        const renderer = new MultipleLineBlockRenderer(commentRenderer, 3);
        const comment = renderer.render(0, 80, "=");
        assert.equal(comment, "// =============================================================================\n// \n// =============================================================================");
        assert.equal(comment.length, 165);
    });
    test("SingleLineBlockRenderer configure", () => {
        const renderer = new SingleLineBlockRenderer(commentRenderer);
        const comment = renderer.render(10, 60, "#");
        assert.equal(comment, "// ###############################################");
        assert.equal(comment.length, 50);
    });
});
