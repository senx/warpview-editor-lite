import monaco from '@timkendrick/monaco-editor';
import { Monarch } from '../../monarch';
import { GTSLib } from "../../gts.lib";
import merge from 'deepmerge';
export class WarpViewEditorLite {
    constructor() {
        this.theme = 'light';
        this.config = {};
        this.loading = false;
        this.WARPSCRIPT_LANGUAGE = 'warpscript';
        this.monacoTheme = 'vs';
        this._config = {};
    }
    /**
     *
     * @param {string} newValue
     * @param {string} _oldValue
     */
    themeHandler(newValue, _oldValue) {
        console.log('[WarpViewEditorLite] - The new value of theme is: ', newValue, _oldValue);
        if ('dark' === newValue) {
            this.monacoTheme = 'vs-dark';
        }
        else {
            this.monacoTheme = 'vs';
        }
        console.log('[WarpViewEditorLite] - The new value of theme is: ', this.monacoTheme);
        monaco.editor.setTheme(this.monacoTheme);
    }
    warpscriptHandler(newValue, _oldValue) {
        console.log('[WarpViewEditorLite] - The new value of warpscript is: ', newValue, _oldValue);
        this.ed.setValue(newValue);
    }
    /**
     *
     */
    componentWillLoad() {
        this._config = merge(this._config, this.config);
        console.log('[WarpViewEditorLite] - _config: ', this._config, this.config);
        this._innerCode = this.el.textContent;
        this.edUid = GTSLib.guid();
        if ('dark' === this.theme) {
            this.monacoTheme = 'vs-dark';
        }
        console.log('[WarpViewEditorLite] - componentWillLoad theme is: ', this.theme);
        if (!monaco.languages.getLanguages().find(l => l.id === this.WARPSCRIPT_LANGUAGE)) {
            monaco.languages.register({ id: this.WARPSCRIPT_LANGUAGE });
            console.log('[WarpViewEditorLite] - componentWillLoad register: ', this.WARPSCRIPT_LANGUAGE);
            monaco.languages.setMonarchTokensProvider(this.WARPSCRIPT_LANGUAGE, Monarch.rules);
            monaco.languages.setLanguageConfiguration(this.WARPSCRIPT_LANGUAGE, {
                wordPattern: /[^\s\t]+/,
                comments: {
                    lineComment: "//",
                    blockComment: ["/**", "*/"]
                },
                brackets: [
                    ["{", "}"],
                    ["[", "]"],
                    ["(", ")"],
                    ["<%", "%>"],
                    ["<'", "'>"],
                    ["[[", "]]"]
                ],
                autoClosingPairs: [
                    { open: "{", close: "}" },
                    { open: "[", close: "]" },
                    { open: "(", close: ")" },
                    { open: "<%", close: "%>" },
                    { open: "[[", close: "]]" },
                    { open: " '", close: "'", notIn: ["string", "comment"] },
                    { open: "<'", close: "'>" },
                    { open: "\"", close: "\"", notIn: ["string"] },
                    { open: "`", close: "`", notIn: ["string", "comment"] },
                    { open: "/**", close: " */", notIn: ["string"] }
                ],
                surroundingPairs: [
                    { open: "{", close: "}" },
                    { open: "[", close: "]" },
                    { open: "(", close: ")" },
                    { open: "[[", close: "]]" },
                    { open: "<%", close: "%>" },
                    { open: "<'", close: "'>" },
                    { open: "'", close: "'" },
                    { open: "\"", close: "\"" },
                    { open: "`", close: "`" }
                ],
                onEnterRules: [
                    {
                        // e.g. /** | */
                        beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
                        afterText: /^\s*\*\/$/,
                        action: { indentAction: monaco.languages.IndentAction.IndentOutdent, appendText: ' * ' }
                    },
                    {
                        // e.g. /** ...|
                        beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
                        action: { indentAction: monaco.languages.IndentAction.None, appendText: ' * ' }
                    },
                    {
                        // e.g.  * ...|
                        beforeText: /^(\t|( {2}))* \*( ([^*]|\*(?!\/))*)?$/,
                        action: { indentAction: monaco.languages.IndentAction.None, appendText: '* ' }
                    },
                    {
                        // e.g.  */|
                        beforeText: /^(\t|( {2}))* \*\/\s*$/,
                        action: { indentAction: monaco.languages.IndentAction.None, removeText: 1 }
                    }
                ],
            });
        }
    }
    /**
     *
     */
    componentDidUnload() {
        console.log('[WarpViewEditorLite] - Component removed from the DOM');
        if (this.ed) {
            this.ed.dispose();
        }
    }
    /**
     *
     */
    componentDidLoad() {
        try {
            console.log('[WarpViewEditorLite] - componentDidLoad - warpscript', this.warpscript);
            console.log('[WarpViewEditorLite] - componentDidLoad - inner: ', this._innerCode);
            console.log('[WarpViewEditorLite] - componentDidLoad - div: ', this.el.querySelector('#editor-' + this.edUid));
            const edOpts = {
                value: this.warpscript || this._innerCode,
                language: this.WARPSCRIPT_LANGUAGE, automaticLayout: true,
                theme: this.monacoTheme, hover: false, readOnly: true,
                folding: true, wordWrap: 'on', contextmenu: false
            };
            edOpts.value = edOpts.value.trim();
            this.ed = monaco.editor.create(this.el.querySelector('#editor-' + this.edUid), edOpts);
            let layout = this.el.querySelector('#layout-' + this.edUid);
            let editor = this.el.querySelector('#editor-' + this.edUid);
            layout.style.width = !!this.widthPx ? this.widthPx.toString() + "px" : "100%";
            layout.style.height = !!this.heightPx ? this.heightPx.toString() + "px" : "100%";
            layout.style.height = Math.max(layout.clientHeight, ((this.heightLine || this.ed.getModel().getLineCount()) * 19)).toString() + "px";
            editor.style.height = !!this.heightLine ? (19 * this.heightLine).toString() + "px" : !!this.heightPx ? this.heightPx.toString() + "px" : "100%";
            this.ed.layout();
            this.warpViewEditorLoaded.emit();
        }
        catch (e) {
            console.error('[WarpViewEditorLite] - componentDidLoad', e);
        }
    }
    /**
     *
     * @param {UIEvent} _event
     * @param {string} theme
     */
    setTheme(_event, theme) {
        this.theme = theme;
    }
    render() {
        const loading = !!this.loading ? (h("div", { class: "loader" },
            h("div", { class: "spinner" }))) : ('');
        return (h("div", null,
            h("div", { class: "warpscript" },
                h("slot", null)),
            h("style", null),
            h("div", { class: "clearfix" }),
            h("div", { id: 'layout-' + this.edUid, class: 'layout' },
                h("div", { id: 'editor-' + this.edUid }),
                h("div", { class: "clearfix" }),
                loading)));
    }
    static get is() { return "warp-view-editor-lite"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "el": {
            "elementRef": true
        },
        "heightLine": {
            "type": Number,
            "attr": "height-line"
        },
        "heightPx": {
            "type": Number,
            "attr": "height-px"
        },
        "loading": {
            "state": true
        },
        "theme": {
            "type": String,
            "attr": "theme",
            "watchCallbacks": ["themeHandler"]
        },
        "warpscript": {
            "type": String,
            "attr": "warpscript",
            "watchCallbacks": ["warpscriptHandler"]
        },
        "widthPx": {
            "type": Number,
            "attr": "width-px"
        }
    }; }
    static get events() { return [{
            "name": "warpViewEditorLoaded",
            "method": "warpViewEditorLoaded",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:warp-view-editor-lite:**/"; }
}
