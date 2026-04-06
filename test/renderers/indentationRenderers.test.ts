import * as assert from "assert";
import { IndentationRenderer } from "../../src/renderers/indentationRenderer";

suite("Indentation Renderer", () => {
    const indentationRenderer = new IndentationRenderer();

    test("Render tabs from tabs", () => {
        const indentation = indentationRenderer.render("\t\t\t", 4);
        assert.strictEqual(indentation.text, "\t\t\t");
        assert.strictEqual(indentation.whitespaceWidth, 12);
    });
    test("Render spaces from spaces", () => {
        const indentation = indentationRenderer.render("    ", 4);
        assert.strictEqual(indentation.text, "    ");
        assert.strictEqual(indentation.whitespaceWidth, 4);
    });
    test("Render spaces from all characters that are not tabs", () => {
        const indentation = indentationRenderer.render("renato 123{}!?", 4);
        assert.strictEqual(indentation.text, "              ");
        assert.strictEqual(indentation.whitespaceWidth, 14);
    });
    test("Render tabs and spaces mixed", () => {
        const indentation = indentationRenderer.render("\t \t renato\t", 4);
        assert.strictEqual(indentation.text, "\t \t       \t");
        assert.strictEqual(indentation.whitespaceWidth, 20);
    });
});
