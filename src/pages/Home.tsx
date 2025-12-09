import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import styles from './Home.module.css';

import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <SEO />
            <div className={styles.heroWrapper}>
                <section className={styles.heroSection}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            “性格の悪さ”<br />
                            見抜きます。
                        </h1>
                        <p className={styles.heroDescription}>
                            あなたの心に潜む「歪み」や「闇」を<br />
                            たった5分で徹底的に暴き出す。<br />
                            ガラスのハートお断りの、辛口性格診断テストです。
                        </p>
                        <div className={styles.heroAction}>
                            <Button onClick={() => navigate('/diagnosis')} size="lg" className={styles.startBtn}>
                                診断テストをする &gt;
                            </Button>
                        </div>
                    </div>
                    {/* Hero Illustration (Space for character visuals later) */}
                    <div className={styles.heroVisual}>
                        <div className={styles.visualPlaceholder}>
                            Visual Area
                        </div>
                    </div>
                </section>

                {/* Features / Info Section (16P usually has 3 columns below) */}
                <section className={styles.infoSection}>
                    <div className={styles.infoColumn}>
                        <h3>辛口でリアル</h3>
                        <p>美辞麗句は一切なし。あなたの欠点、矛盾、そして隠したい本性を容赦なく言語化します。</p>
                    </div>
                    <div className={styles.infoColumn}>
                        <h3>16の歪みタイプ</h3>
                        <p>暴走族、メンヘラ、支配者、悟り...。独自に分類された16種類の「ひねくれ」タイプで診断します。</p>
                    </div>
                    <div className={styles.infoColumn}>
                        <h3>シェアで盛り上がる</h3>
                        <p>結果は画像として保存可能。自分の取扱説明書としてSNSで晒してみませんか？</p>
                    </div>
                </section>
            </div>
        </Layout>
    );
};
