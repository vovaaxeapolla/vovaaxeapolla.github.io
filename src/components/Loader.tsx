import styles from '@styles/Loader.module.sass';

export function Loader() {
    return (
        <div className={styles.loader}>
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div>
    );
}