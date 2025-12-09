import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export const Header: React.FC = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src="/images/banner.jpg" alt="ひねくれタイプ診断" className={styles.logoImage} />
                    </Link>
                </div>

                <button className={styles.hamburger} onClick={toggleMenu} aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
                    <Link to="/" className={location.pathname === '/' ? styles.active : ''} onClick={() => setIsOpen(false)}>
                        トップ
                    </Link>
                    <Link to="/diagnosis" className={location.pathname === '/diagnosis' ? styles.active : ''} onClick={() => setIsOpen(false)}>
                        診断する
                    </Link>
                    <Link to="/characters" className={location.pathname === '/characters' ? styles.active : ''} onClick={() => setIsOpen(false)}>
                        性格図鑑
                    </Link>
                    <Link to="/about" className={location.pathname === '/about' ? styles.active : ''} onClick={() => setIsOpen(false)}>
                        4つの軸
                    </Link>
                </nav>
            </div>
        </header>
    );
};
