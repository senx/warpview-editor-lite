import '../../stencil.core';
import { EventEmitter } from "../../stencil.core";
export declare class WarpViewEditorLite {
    el: HTMLStencilElement;
    theme: string;
    warpscript: string;
    config: any;
    widthPx: number;
    heightLine: number;
    heightPx: number;
    warpViewEditorWarpscriptChanged: EventEmitter;
    warpViewEditorLoaded: EventEmitter;
    loading: boolean;
    private WARPSCRIPT_LANGUAGE;
    private ed;
    private edUid;
    private monacoTheme;
    private _innerCode;
    private _config;
    /**
     *
     * @param {string} newValue
     * @param {string} _oldValue
     */
    themeHandler(newValue: string, _oldValue: string): void;
    warpscriptHandler(newValue: string, _oldValue: string): void;
    /**
     *
     */
    componentWillLoad(): void;
    /**
     *
     */
    componentDidUnload(): void;
    /**
     *
     */
    componentDidLoad(): void;
    /**
     *
     * @param {UIEvent} _event
     * @param {string} theme
     */
    setTheme(_event: UIEvent, theme: string): void;
    render(): JSX.Element;
}
