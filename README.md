# Section Divider

This extension inserts horizontal section dividers using language comments.

[![Installs](https://img.shields.io/visual-studio-marketplace/i/dinhani.divider?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=dinhani.divider&ssr=false)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/dinhani.divider?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=dinhani.divider&ssr=false#review-details)
[![Version](https://img.shields.io/visual-studio-marketplace/v/dinhani.divider?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=dinhani.divider&ssr=false#version-history)

## Example

![Section Divider example](https://raw.githubusercontent.com/dinhani/vscode-section-divider/master/images/vscode-divider-example.gif)
*Divider being added from the cursor position until the limit ruler.*


## Usage

| Command | Shortcut | Description |
|---------|----------|-------------|
| Divider: Add H1 Divider| Alt+D | insert a level 1 divider with the configured number of lines|
| Divider: Add H2 Divider| Ctrl+Alt+D | insert a level 2 divider with the configured number of lines|
| Divider: Add H1 Divider - One Line| | insert a level 1 divider with only one line|
| Divider: Add H2 Divider - One Line| | insert a level 2 divider with only one line|


## Configuration

```javascript
// Text that will be used to fill the level 1 (H1) section divider lines.
"divider.text.level1": "=",

// Text that will be used to fill the level 2 (H2) section divider lines.
"divider.text.level2": "-",

// Text that will be used to fill the level 3 (H3) section divider lines.
"divider.text.level3": ".",

// Last character column the section divider will reach.
"divider.endColumn": 80,

// Number of lines the section divider will have.
"divider.lines": 3

// Overrides language default comment characters with custom characters.
"divider.overrides {
    "java": ["/*", "*/"]
}
```

## Feedback

Request features and report bugs using [GitHub](https://github.com/dinhani/vscode-section-divider).