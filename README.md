# Section Divider

This extension inserts horizontal section dividers using language comments.

![Section Divider example](https://raw.githubusercontent.com/dinhani/vscode-section-divider/master/images/vscode-divider-example.gif)

# Usage

| Command | Shortcut | Description |
|---------|----------|-------------|
| Divider: Add Divider - Level 1| Alt+D | insert a level 1 divider with the configured number of lines from cursor position up to the configured end column|
| Divider: Add Divider - Level 2| Ctrl+Alt+D | insert a level 2 divider with the configured number of lines from cursor position up to the configured end column|
| Divider: Add Divider - Level 1 - One Line| | insert a level 1 divider with only 1 line from cursor position up to the configured end column|
| Divider: Add Divider - Level 2 - One Line| | insert a level 2 divider with only 1 line from cursor position up to the configured end column|


# Configuration

```javascript
// Text that will be used to fill the level 1 section divider lines.
"divider.text.level1": "=",

// Text that will be used to fill the level 2 section divider lines.
"divider.text.level2": "-",

// Last character column the section divider will reach.
"divider.endColumn": 80,

// Number of lines the section divider will have.
"divider.lines": 3
```

# Feedback

Request features and report bugs using [GitHub](https://github.com/dinhani/vscode-section-divider).