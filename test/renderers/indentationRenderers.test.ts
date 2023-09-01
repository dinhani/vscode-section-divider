import * as assert from "assert";
import { IndentationRenderer } from "../../src/renderers/indentationRenderer";

suite("Indentation Renderer", () => {
    const indentationRenderer = new IndentationRenderer();

    test("Render tabs from tabs", () => {
        const identation = indentationRenderer.render("\t\t\t", 4);
        assert.strictEqual(identation.text, "\t\t\t");
        assert.strictEqual(identation.whitespaceWidth, 12);
    });
    test("Render spaces from spaces", () => {
        const identation = indentationRenderer.render("    ", 4);
        assert.strictEqual(identation.text, "    ");
        assert.strictEqual(identation.whitespaceWidth, 4);
    });
    test("Render spaces from all characters that are not tabs", () => {
        const identation = indentationRenderer.render("renato 123{}!?", 4);
        assert.strictEqual(identation.text, "              ");
        assert.strictEqual(identation.whitespaceWidth, 14);
    });
    test("Render tabs and spaces mixed", () => {
        const identation = indentationRenderer.render("\t \t renato\t", 4);
        assert.strictEqual(identation.text, "\t \t       \t");
        assert.strictEqual(identation.whitespaceWidth, 20);
    });
});
