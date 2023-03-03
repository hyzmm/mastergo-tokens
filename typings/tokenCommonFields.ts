export type Token = TextStyle | PaintStyle | EffectStyle;

export interface ThemeApplyData {
    newTheme: string;
    applyScope: ThemeApplyScope;
}

export enum ThemeApplyScope {
    page = "页面",
    // document = "文档",
    selection = "当前选择",
}

export enum LocalStorageKeys {
    themes = "themes",
    applyScope = "applyScope",
}