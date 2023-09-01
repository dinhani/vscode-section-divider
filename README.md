# Section Divider

This extension inserts horizontal section dividers using language comments.

![Section Divider example](https://raw.githubusercontent.com/dinhani/vscode-section-divider/master/images/vscode-divider-example.gif)

# Usage

| Command | Shortcut | Description |
|---------|----------|-------------|
| Divider: Add H1 Divider| Alt+D | insert a level 1 divider with the configured number of lines|
| Divider: Add H2 Divider| Ctrl+Alt+D | insert a level 2 divider with the configured number of lines|
| Divider: Add H1 Divider - One Line| | insert a level 1 divider with only one line|
| Divider: Add H2 Divider - One Line| | insert a level 2 divider with only one line|


# Configuration

```javascript
// Text that will be used to fill the level 1 (H1) section divider lines.
"divider.text.level1": "=",

// Text that will be used to fill the level 2 (H2) section divider lines.
"divider.text.level2": "-",

// Last character column the section divider will reach.
"divider.endColumn": 80,

// Number of lines the section divider will have.
"divider.lines": 3

// Overrides language default comment characters with custom characters.
"divider.overrides {
    "java": ["/*", "*/"]
}
```

# Feedback

Request features and report bugs using [GitHub](https://github.com/dinhani/vscode-section-divider).