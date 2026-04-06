# List available tasks
default:
    @just --list --unsorted

# Run extension in VSCode
[group('dev')]
run:
    rm -rf out
    npm run compile
    code --extensionDevelopmentPath={{justfile_directory()}}

# Watch for changes
[group('dev')]
watch:
    npm run watch

# Run tests
[group('quality')]
test:
    npm test

# Lint code
[group('quality')]
lint:
    npx tsc -p . --noEmit

# Package extension as .vsix
[group('release')]
package:
    rm -rf out
    npm run compile
    npx vsce package

# Install extension in VSCode
[group('release')]
install: package
    code --install-extension *.vsix
