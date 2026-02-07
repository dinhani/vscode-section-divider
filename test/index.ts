import Mocha from "mocha";
import { readdirSync } from "fs";
import * as path from "path";

export function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: "tdd",
        color: true,
        timeout: 10000
    });

    const testsRoot = __dirname;

    return new Promise((c, e) => {
        try {
            // Walk through test subdirectories
            const renderersDir = path.join(testsRoot, "renderers");
            const testFiles = readdirSync(renderersDir).filter(
                file => file.endsWith(".test.js")
            );

            // Add files to the test suite
            testFiles.forEach(f => {
                mocha.addFile(path.resolve(renderersDir, f));
            });

            // Run the mocha test
            mocha.run((failures: number) => {
                if (failures > 0) {
                    e(new Error(`${failures} tests failed.`));
                } else {
                    c();
                }
            });
        } catch (err) {
            e(err);
        }
    });
}

// Run tests if executed directly
if (require.main === module) {
    run().catch(err => {
        console.error(err);
        process.exit(1);
    });
}
