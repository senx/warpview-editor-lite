
var WarpViewEditorLiteComponent = /** @class **/ (function() {
  function WarpViewEditorLite() {
  }
  WarpViewEditorLite.is = 'warp-view-editor-lite';
  WarpViewEditorLite.getModule = function(opts) {
    
    return import('./ybunkydt.js').then(function(m) {
        return m.WarpViewEditorLite;
      });

  }
});

export {
  
  WarpViewEditorLite,
};
  