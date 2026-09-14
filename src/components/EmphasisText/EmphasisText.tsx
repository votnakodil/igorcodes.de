import { Fragment } from "react";

import styles from "./EmphasisText.module.css";

type EmphasisTextProps = {
    text: string;
};

const emphasisPattern = /(\[\[.*?\]\])/g;

export function EmphasisText({ text }: EmphasisTextProps) {
    return text.split(emphasisPattern).map((part, index) => {
        const isEmphasized = part.startsWith("[[") && part.endsWith("]]" );

        if (isEmphasized) {
            return <strong className={styles.emphasis} key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
        }

        return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
    });
}
