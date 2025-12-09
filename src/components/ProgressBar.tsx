import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
    current: number;
    total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const progress = Math.min(100, (current / total) * 100);

    return (
        <div className={styles.container}>
            <div className={styles.label}>
                Q.{current} <span className={styles.total}>/ {total}</span>
            </div>
            <div className={styles.track}>
                <div
                    className={styles.fill}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};
