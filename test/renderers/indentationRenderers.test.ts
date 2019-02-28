import * as assert from "assert";
import { IndentationRenderer } from "../../src/renderers/indentationRenderer";

suite("Indentation Renderer", () => {
    const indentationRenderer = new IndentationRenderer();

    test("Render tabs from tabs", () => {
        const identation = indentationRenderer.render("\t\t\t");
        assert.equal(identation, "\t\t\t");
    });
    test("Render spaces from spaces", () => {
        const identation = indentationRenderer.render("    ");
        assert.equal(identation, "    ");
    });
    test("Render spaces from all characters that are not tabs", () => {
        const identation = indentationRenderer.render("renato 123{}!?");
        assert.equal(identation, "              ");
    });
    test("Render tabs and spaces mixed", () => {
        const identation = indentationRenderer.render("\t \t renato\t");
        assert.equal(identation, "\t \t       \t");
    });
});
