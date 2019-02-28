import * as assert from "assert";
import { IdentationRenderer } from "../../src/renderers/identationRenderer";

suite("Identation Renderer", () => {
    const identationRenderer = new IdentationRenderer();

    test("Render tabs from tabs", () => {
        const identation = identationRenderer.render("\t\t\t");
        assert.equal(identation, "\t\t\t");
    });
    test("Render spaces from spaces", () => {
        const identation = identationRenderer.render("    ");
        assert.equal(identation, "    ");
    });
    test("Render spaces from all characters that are not tabs", () => {
        const identation = identationRenderer.render("renato 123{}!?");
        assert.equal(identation, "              ");
    });
    test("Render tabs and spaces mixed", () => {
        const identation = identationRenderer.render("\t \t renato\t");
        assert.equal(identation, "\t \t       \t");
    });
});
