import React from 'react';
import { SEO } from '../components/SEO';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';

import { RESULTS } from '../data/results';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import styles from './Result.module.css';

// Helper to get param (moved inside component or pass search string)
const getParam = (search: string, key: string) => {
    const params = new URLSearchParams(search);
    return parseInt(params.get(key) || '50', 10);
};

const StatsBar: React.FC<{ title: string, labelL: string, labelR: string, idL: string, idR: string, pctL: number, pctR: number, color: string }> = ({ title, labelL, labelR, idL, idR, pctL, pctR, color }) => {
    const isLeftDom = pctL >= pctR;

    return (
        <div className={styles.barRow}>
            <div className={styles.barTitle}>{title}</div>

            <div className={styles.barHeader}>
                <span className={isLeftDom ? styles.textActive : styles.textPassive} style={{ color: isLeftDom ? color : undefined }}>
                    {pctL}% {labelL} <span className={styles.axisId}>({idL})</span>
                </span>
                <span className={!isLeftDom ? styles.textActive : styles.textPassive} style={{ color: !isLeftDom ? color : undefined }}>
                    <span className={styles.axisId}>({idR})</span> {labelR} {pctR}%
                </span>
            </div>

            <div className={styles.barTrackWrapper}>
                <div className={styles.trackLine}></div>
                <div
                    className={styles.activeBar}
                    style={{
                        width: `${isLeftDom ? pctL : pctR}%`,
                        backgroundColor: color,
                        left: isLeftDom ? 0 : 'auto',
                        right: !isLeftDom ? 0 : 'auto'
                    }}
                />
            </div>
        </div>
    );
};

export const Result: React.FC = () => {
    const { typeId } = useParams<{ typeId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    // Ref for info capture
    const captureRef = React.useRef<HTMLDivElement>(null);

    const result = typeId ? RESULTS[typeId] : null;

    if (!result) {
        // ... (unchanged error handling)
        return (
            <Layout>
                <div className={styles.error}>
                    <p>診断結果が見つかりません。</p>
                    <Button onClick={() => navigate('/')}>トップへ戻る</Button>
                </div>
            </Layout>
        );
    }

    const shareUrl = window.location.origin + window.location.pathname + '#' + location.pathname;
    const shareText = `私は【${result.title}】タイプでした。\n性格の歪み：${result.traits.join(' / ')}\n#ひねくれタイプ診断 #性格診断`;

    const handleShare = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank');
    };

    const handleSaveImage = async () => {
        if (!captureRef.current) return;

        try {
            const canvas = await html2canvas(captureRef.current, {
                backgroundColor: '#ffffff',
                scale: 2, // Better resolution
                logging: false,
                useCORS: true, // For cross-origin images if any
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = `hinekure_result_${result.id}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Capture failed:", error);
            alert("画像の保存に失敗しました。");
        }
    };

    return (
        <Layout>
            <SEO
                title={`${result.title}タイプの診断結果 | ひねくれタイプ診断`}
                description={`私は【${result.title}】タイプでした。あなたの性格の歪みは「${result.traits.join('・')}」です。`}
                image={`/images/ogp_${result.id}.png`} /* Assuming we will create these cards later */
            />
            <div className={styles.container}>
                {/* Wrap capture target */}
                <div ref={captureRef} className={styles.captureArea}>
                    <div className={styles.header} style={{ backgroundColor: result.color }}>
                        <div className={styles.id}>{result.id}</div>
                        <h1 className={styles.title}>{result.title}</h1>
                    </div>

                    <div className={styles.body}>
                        <div className={styles.imageContainer}>
                            {result.image ? (
                                <img src={result.image} alt={result.name} className={styles.characterImage} />
                            ) : (
                                <div className={styles.noImage}>No Image</div>
                            )}
                        </div>

                        <div className={styles.description}>
                            {result.description}
                        </div>

                        <div className={styles.traits}>
                            <h3>▼ あなたの欠陥</h3>
                            <div className={styles.traitList}>
                                {result.traits.map(t => (
                                    <span key={t} className={styles.traitTag}>{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Percentage Bars */}
                        {location.search && (
                            <div className={styles.statsContainer}>
                                <StatsBar title="感情 (Mind)" labelL="直情" idL="H" labelR="冷徹" idR="C" pctL={getParam(location.search, 'h')} pctR={getParam(location.search, 'c')} color="#FFB7B2" />
                                <StatsBar title="因果 (Nature)" labelL="他責" idL="O" labelR="自責" idR="I" pctL={getParam(location.search, 'o')} pctR={getParam(location.search, 'i')} color="#C7CEEA" />
                                <StatsBar title="戦術 (Tactics)" labelL="圧力" idL="P" labelR="理屈" idR="L" pctL={getParam(location.search, 'p')} pctR={getParam(location.search, 'l')} color="#B5EAD7" />
                                <StatsBar title="生存 (Strategy)" labelL="王様" idL="K" labelR="単独" idR="S" pctL={getParam(location.search, 'k')} pctR={getParam(location.search, 's')} color="#E2F0CB" />
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button onClick={handleSaveImage} fullWidth variant="primary">
                        画像を保存する
                    </Button>

                    <div className={styles.shareRow}>
                        <Button onClick={handleShare} className={styles.shareBtnX}>
                            Xでシェア
                        </Button>
                        <Button onClick={() => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`, '_blank')} className={styles.shareBtnLine}>
                            LINE
                        </Button>
                        <Button onClick={() => { navigator.clipboard.writeText(shareUrl); alert('リンクをコピーしました！'); }} className={styles.shareBtnCopy}>
                            リンク
                        </Button>
                    </div>

                    <Button onClick={() => navigate('/diagnosis')} variant="secondary" fullWidth>
                        {/* If stats exist, they took the test. If not, maybe they just landed here. */}
                        {location.search ? 'もう一度診断する' : 'あなたも診断してみる'}
                    </Button>
                    <Button onClick={() => navigate('/characters')} variant="secondary" fullWidth>
                        他のタイプを見る
                    </Button>
                </div>
            </div>
        </Layout >
    );
};
