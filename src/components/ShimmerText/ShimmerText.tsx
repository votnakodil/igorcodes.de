import styles from "./ShimmerText.module.css";

type ShimmerTextProps = {
    children: string;
    className?: string;
    cadence?: "default" | "relaxed";
};

export function ShimmerText({ children, className = "", cadence = "default" }: ShimmerTextProps) {
    return (
        <span
            className={`${styles.text} ${cadence === "relaxed" ? styles.relaxed : ""} ${className}`}
            data-text={children}
        >
            {children}
        </span>
    );
}
