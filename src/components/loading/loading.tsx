import styles from "./loading.module.css";

export default function Loading({ children }: { children: string }) {
    return (
        <div className={`${styles.loading} text text_type_main-large`}>
            {children}
        </div>
    );
}
