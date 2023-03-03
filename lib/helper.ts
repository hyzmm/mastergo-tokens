export function traverse(node: SceneNode, cb: (node: BaseNode) => void) {
    cb(node);
    if ("children" in node) {
        if (node.type === "INSTANCE") {
            cb(node);
        }
        for (const child of node.children) {
            traverse(child, cb);
        }
    }
}

export function convertTokenNameToTheme(tokenName: string, themeName: string) : string{
    return tokenName.replace(/^\w+\//, `${themeName}/`);
}