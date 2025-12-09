import React from 'react';
import { Header } from './Header';
import styles from './Layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.background} />
            <main className={styles.container}>
                {children}
            </main>
        </div>
    );
};
