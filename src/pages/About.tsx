import React from 'react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import styles from './About.module.css';
import { useNavigate } from 'react-router-dom';

export const About: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <SEO
                title="ひねくれタイプ診断とは | 4つの軸で暴く性格"
                description="ひねくれタイプ診断の仕組みと、4つの軸（感情・因果・戦術・生存）について解説します。"
            />
            <div className={styles.container}>
                <h1 className={styles.title}>ひねくれタイプ診断とは</h1>

                <section className={styles.section}>
                    <p className={styles.description}>
                        一般的な性格診断では語られない、あなたの心の奥底にある
                        <strong>「性格の歪み」</strong>や<strong>「扱いにくさ」</strong>を
                        4つの軸・16タイプから徹底的に分析する診断です。
                    </p>
                    <p className={styles.description}>
                        いい子ぶるのは終わりです。
                        自分の「ひねくれ」を受け入れた時、新しい生存戦略が見えてくるかもしれません。
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4つの歪み軸</h2>

                    <div className={styles.axisContainer}>
                        <div className={styles.axisHeader} style={{ background: '#FFB7B2' }}>
                            <span>H (Hot/直情)</span> - <span>C (Cold/冷徹)</span>
                        </div>
                        <h3 className={styles.axisName}>感情の歪み (Mind)</h3>
                        <p className={styles.axisDesc}>
                            感情が沸騰しやすいか、凍りついているか。<br />
                            直情は怒りや喜びを爆発させ、冷徹は感情を切り離して物事を見ます。
                        </p>
                    </div>

                    <div className={styles.axisContainer}>
                        <div className={styles.axisHeader} style={{ background: '#C7CEEA' }}>
                            <span>O (Out/他責)</span> - <span>I (In/自責)</span>
                        </div>
                        <h3 className={styles.axisName}>因果の歪み (Nature)</h3>
                        <p className={styles.axisDesc}>
                            物事がうまくいかない時、誰のせいにするか。<br />
                            他責は「環境やあいつが悪い」と考え、自責は「私がダメなんだ」と内罰的になります。
                        </p>
                    </div>

                    <div className={styles.axisContainer}>
                        <div className={styles.axisHeader} style={{ background: '#B5EAD7' }}>
                            <span>P (Power/圧力)</span> - <span>L (Logic/理屈)</span>
                        </div>
                        <h3 className={styles.axisName}>戦術の歪み (Tactics)</h3>
                        <p className={styles.axisDesc}>
                            他人をどうやってコントロールしようとするか。<br />
                            圧力は威圧感や勢いで押し切り、理屈は正論や屁理屈で相手を追い詰めます。
                        </p>
                    </div>

                    <div className={styles.axisContainer}>
                        <div className={styles.axisHeader} style={{ background: '#E2F0CB' }}>
                            <span>K (King/王様)</span> - <span>S (Solo/単独)</span>
                        </div>
                        <h3 className={styles.axisName}>生存の歪み (Strategy)</h3>
                        <p className={styles.axisDesc}>
                            集団の中でどう振る舞うか。<br />
                            王様は周りを従えて中心にいたがり、単独は群れを嫌い孤高を貫こうとします。
                        </p>
                    </div>
                </section>

                <section className={styles.action}>
                    <Button onClick={() => navigate('/diagnosis')} variant="primary" fullWidth>
                        診断を始める
                    </Button>
                </section>
            </div>
        </Layout>
    );
};
