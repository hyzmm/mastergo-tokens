import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import json from "highlight.js/lib/languages/json";
import "highlight.js/styles/arta.css";

hljs.registerLanguage("json", json);

interface HighlightProps {
    children: string;
}

export default function JsonHighlight(props: HighlightProps) {
    const el = useRef<HTMLElement>(null);

    useEffect(() => {
        hljs.highlightElement(el.current!);
    }, []);

    return (
        <pre>
            <code className="language-json" ref={el}>{props.children}</code>
        </pre>
    );
}
