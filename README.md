# Warp View Editor lite

This [web components](https://fr.wikipedia.org/wiki/Composants_web) embed a WarpScript editor dedicated to [Warp 10™](https://www.warp10.io).

- [licence Apache 2](./LICENSE.md)
- [Contribute](./CONTRIBUTING.md)

## Usage

    npm i @senx/warpview-editor-lite --save
    
    yarn add @senx/warpview-editor-lite
    
    bower install senx-warpview-editor-lite --save


```html
<html>
<head>
  <title>Test</title>
  <script src="https://unpkg.com/@senx/warpview-editor-lite@x.x.x/dist/warpview-editor-lite.js"></script>
</head>
<body>
  <warp-view-editor-lite height-line=18 width-px=600 theme="dark">
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
| widthPx | `number` | | Fixed width |
| heightPx | `number` | | Fixed height |
| heightLine | `number` | | Fixed number of lines |


