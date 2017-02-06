# Section Divider

This extension inserts horizontal section dividers using language comments.

![Section Divider example](https://raw.githubusercontent.com/dinhani/ext-section-divider/master/vscode/images/vscode-divider-example.gif)

# Usage

| Command | Shortcut | Description |
|-|-|-|
| Divider: Add From Cursor| Alt+D | insert a divider from cursor position up to the configured end column|
| Divider: Add From Line Start | | insert a divider from the start of the line up to the configued end column|

# Configuration

```javascript
// Text that will be used to fill the section divider lines.
"divider.text": "=",

// Last character column the section divider will reach.
"divider.endColumn": 80,

// Number of lines the section divider will have.
"divider.lines": 3
```

# Feedback

Request features and report bugs using [GitHub](https://github.com/dinhani/ext-section-divider).