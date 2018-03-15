import * as assert from "assert";
import { MultipleLineBlockRenderer, SingleLineBlockRenderer, TwoLineBlockRenderer } from "../../src/renderers/blockRenderers";

suite("Block Renderers", () => {
    test("SingleLineBlockRenderer render", () => {
        let renderer = new SingleLineBlockRenderer();
        let comment = renderer.render();
        assert.equal(comment, "// =============================================================================");
        assert.equal(comment.length, 80);
    });
    test("TwoLineBlockRenderer render", () => {
        let renderer = new TwoLineBlockRenderer();
        let comment = renderer.render();
        assert.equal(comment, "// =============================================================================\n// =============================================================================");
        assert.equal(comment.length, 161);
    });
    test("MultipleLineBlockRenderer render", () => {
        let renderer = new MultipleLineBlockRenderer();
        renderer.lines = 3;

        let comment = renderer.render();
        assert.equal(comment, "// =============================================================================\n// \n// =============================================================================");
        assert.equal(comment.length, 165);
    });
    test("SingleLineBlockRenderer configure", () => {
        let renderer = new SingleLineBlockRenderer();
        renderer.dividerStartColumn = 10;
        renderer.dividerEndColumn = 60;
        renderer.dividerText = "#";
        let comment = renderer.render();
        assert.equal(comment, "// ###############################################");
        assert.equal(comment.length, 50);
    });
});
