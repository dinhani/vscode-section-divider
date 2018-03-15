import * as assert from "assert";
import { MultipleLineBlockRenderer, SingleLineBlockRenderer, TwoLineBlockRenderer } from "../../src/renderers/blockRenderers";
import { LineCommentRenderer } from "../../src/renderers/commentRenderers";

suite("Block Renderers", () => {
    let commentRenderer = new LineCommentRenderer("//");

    test("SingleLineBlockRenderer render", () => {
        let renderer = new SingleLineBlockRenderer(commentRenderer, 0, 80, "=");
        let comment = renderer.render();
        assert.equal(comment, "// =============================================================================");
        assert.equal(comment.length, 80);
    });
    test("TwoLineBlockRenderer render", () => {
        let renderer = new TwoLineBlockRenderer(commentRenderer, 0,  80, "=");
        let comment = renderer.render();
        assert.equal(comment, "// =============================================================================\n// =============================================================================");
        assert.equal(comment.length, 161);
    });
    test("MultipleLineBlockRenderer render", () => {
        let renderer = new MultipleLineBlockRenderer(commentRenderer, 0, 80, "=");
        renderer.lines = 3;

        let comment = renderer.render();
        assert.equal(comment, "// =============================================================================\n// \n// =============================================================================");
        assert.equal(comment.length, 165);
    });
    test("SingleLineBlockRenderer configure", () => {
        let renderer = new SingleLineBlockRenderer(commentRenderer, 10, 60, "#");
        let comment = renderer.render();
        assert.equal(comment, "// ###############################################");
        assert.equal(comment.length, 50);
    });
});
