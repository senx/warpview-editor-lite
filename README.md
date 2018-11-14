# Warp View Editor lite

This [web components](https://fr.wikipedia.org/wiki/Composants_web) embed a WarpScript editor dedicated to [Warp 10™](https://www.warp10.io).

- [licence Apache 2](./LICENSE.md)
- [Contribute](./CONTRIBUTING.md)

## Usage

```html
<html>
<head>
  <title>Test</title>
  <script src="warp-view-editor-lite.js"></script>
</head>
<body>
  <warp-view-editor-lite height-line=18 width-px=600 theme="dark" id="editor" 
    >
      2 2 +
    </warp-view-editor-lite>
</body>
</html>
```

## Integrations

[See here](https://stenciljs.com/docs/framework-integration)


## CSS vars

## Attributes

| Name | Type | Default | Description |
|------|------|---------|-------------|
| theme | `string` | 'light' | Editor theme (`light` or `dark`) |
| warpscript | `string` | '' | WarpScript to edit (optional, could be inside HTML tag) |
| config | `object` | default config | Configuration |
| widthPx | `number` | | Fixed width |
| heightPx | `number` | | Fixed height |
| heightLine | `number` | | Fixed number of lines |

## Data format

### Default config

```json
{
  "execButton": {
    "class": "",
    "label": "Execute"
  },
  "datavizButton": {
    "class": "",
    "label": "Visualize"
  },
  "editor": {
    "quickSuggestionsDelay": 10,
    "quickSuggestions": true
  }
}
```

## Events

### warpViewEditorStatusEvent

String execution status :

```text
Your script execution took 527.749 ms serverside, fetched 138156 datapoints and performed 21 WarpScript operations.
```

### warpViewEditorErrorEvent

String execution error :

```text
ERROR line #4 in section '[TOP]': Unknown symbol 'TOKEN2'
```

### warpViewEditorWarpscriptChanged

String representation of the WarpScript typed in the editor.

### warpViewEditorWarpscriptResult

Json of the the WarpScript execution result triggered by a click on the execute button.

### warpViewEditorDatavizRequested

Json of the the WarpScript execution result triggered by a click on the dataViz button

