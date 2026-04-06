# List available tasks
default:
    @just --list --unsorted

# Run extension in VSCode
[group('dev')]
run:
    @echo "Running extension in VSCode..."
    rm -rf out
    npm run compile
    code --extensionDevelopmentPath={{justfile_directory()}}

# Watch for changes
[group('dev')]
watch:
    @echo "Watching for changes..."
    npm run watch

# Run tests
[group('quality')]
test:
    @echo "Running tests..."
    npm test

# Lint code
[group('quality')]
lint:
    @echo "Linting code..."
    npx tsc -p . --noEmit

# Package extension as .vsix
[group('release')]
package:
    @echo "Packaging extension..."
    rm -rf out *.vsix
    npm run compile
    npx vsce package

# Install extension in VSCode
[group('release')]
install: package
    @echo "Installing extension..."
    code --install-extension *.vsix
