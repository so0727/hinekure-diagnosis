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
                            “性格の悪さ”<br className={styles.mobileBr} />見抜きます。
                        </h1>
                        <p className={styles.heroDescription}>
                            あなたの心に潜む「歪み」や「闇」を<br />
                            たった5分で徹底的に暴き出す。<br />
                            ガラスのハートお断りの、辛口性格診断テストです。
                        </p>
                        <div className={styles.actionArea}>
                            <Button onClick={() => navigate('/diagnosis')} size="lg" className={styles.startBtn} variant="primary">
                                診断テストをする
                            </Button>
                            <p className={styles.note} style={{ marginTop: '8px' }}>※完全無料・登録不要</p>

                            <Button onClick={() => navigate('/diagnosis?mode=simple')} size="sm" variant="text" style={{ textDecoration: 'underline', color: '#666', fontSize: '0.9rem', marginTop: '16px' }}>
                                時間がない方はこちら（20問・簡易版）
                            </Button>
                        </div>
                    </div>
                    <div className={styles.heroVisual}>
                        <img src="/images/main_visual.png" alt="ひねくれタイプ診断メインビジュアル" className={styles.mainImage} />
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
