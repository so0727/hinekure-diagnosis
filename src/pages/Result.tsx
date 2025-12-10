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

    const h = getParam(location.search, 'h');
    const c = getParam(location.search, 'c');
    const o = getParam(location.search, 'o');
    const i = getParam(location.search, 'i');
    const p = getParam(location.search, 'p');
    const l = getParam(location.search, 'l');
    const k = getParam(location.search, 'k');
    const s = getParam(location.search, 's');

    // Note: Using location.search in shareUrl ensures people clicking the link see the same stats? 
    // Fix for HashRouter: content is inside the hash
    // We need to construct: origin + pathname + '#' + react_router_pathname + react_router_search
    // Or simpler: just use window.location.href (but that might include unrelated junk if not careful, though usually fine)
    // Let's be explicit to avoid "sharing the home page"
    const shareUrl = `${window.location.origin}${window.location.pathname}#${location.pathname}${location.search}`;

    const shareText = `私は【${result.title}】タイプでした。\n` +
        `取扱注意：${result.traits.join(' / ')}\n\n` +
        `📊 パラメータ\n` +
        `直情${h}% : 冷徹${c}%\n` +
        `他責${o}% : 自責${i}%\n` +
        `圧力${p}% : 理屈${l}%\n` +
        `王様${k}% : 単独${s}%\n\n` +
        `#ひねくれタイプ診断`;

    const handleShare = () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank');
    };

    const [generatedImage, setGeneratedImage] = React.useState<string | null>(null);

    const handleSaveImage = async () => {
        if (!captureRef.current) return;

        try {
            const canvas = await html2canvas(captureRef.current, {
                backgroundColor: '#ffffff',
                scale: 2,
                logging: false,
                useCORS: true,
            });

            const image = canvas.toDataURL("image/png");

            // Check if mobile (simple check)
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            if (isMobile) {
                // Show modal for mobile users
                setGeneratedImage(image);
            } else {
                // PC: Auto download
                const link = document.createElement('a');
                link.href = image;
                link.download = `hinekure_result_${result.id}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

        } catch (error) {
            console.error("Capture failed:", error);
            alert("画像の保存に失敗しました。");
        }
    };

    return (
        <Layout>
            {/* Modal for Mobile Image Save */}
            {generatedImage && (
                <div
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '20px'
                    }}
                    onClick={() => setGeneratedImage(null)}
                >
                    <p style={{ color: 'white', marginBottom: '10px', fontWeight: 'bold' }}>画像を長押しして保存してください</p>
                    <img src={generatedImage} alt="Result" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px' }} />
                    <button
                        style={{ marginTop: '20px', padding: '10px 20px', background: 'white', border: 'none', borderRadius: '20px', fontWeight: 'bold' }}
                        onClick={() => setGeneratedImage(null)}
                    >
                        閉じる
                    </button>
                </div>
            )}

            <SEO
                title={`${result.title}タイプの診断結果 | ひねくれタイプ診断`}
                description={`私は【${result.title}】タイプでした。取扱注意：${result.traits.join('・')}`}
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
                            <h3>▼ 取扱注意ポイント</h3>
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


                {/* Compatibility Section */}
                <div className={styles.relationshipArea}>
                    <h3 className={styles.relationshipTitle}>▼ 人間関係の傾向</h3>
                    <div className={styles.relationshipGrid}>
                        {/* Best Match */}
                        <div className={`${styles.relationCard} ${styles.bestMatch}`}>
                            <div className={styles.relationLabel}>最高の相性</div>
                            <div className={styles.relationContent} onClick={() => navigate(`/result/${result.bestMatch}`)}>
                                <div className={styles.relationIcon}>
                                    <img src={RESULTS[result.bestMatch].image || '/images/no_image.png'} alt={RESULTS[result.bestMatch].title} />
                                </div>
                                <div className={styles.relationText}>
                                    <div className={styles.relationType}>{RESULTS[result.bestMatch].title}</div>
                                    <div className={styles.relationName}>{RESULTS[result.bestMatch].name}</div>
                                </div>
                            </div>
                        </div>

                        {/* Worst Match */}
                        <div className={`${styles.relationCard} ${styles.worstMatch}`}>
                            <div className={styles.relationLabel}>最悪の相性</div>
                            <div className={styles.relationContent} onClick={() => navigate(`/result/${result.worstMatch}`)}>
                                <div className={styles.relationIcon}>
                                    <img src={RESULTS[result.worstMatch].image || '/images/no_image.png'} alt={RESULTS[result.worstMatch].title} />
                                </div>
                                <div className={styles.relationText}>
                                    <div className={styles.relationType}>{RESULTS[result.worstMatch].title}</div>
                                    <div className={styles.relationName}>{RESULTS[result.worstMatch].name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button onClick={handleSaveImage} fullWidth variant="primary">
                        画像を保存する
                    </Button>

                    <div className={styles.shareRow}>
                        <Button onClick={handleShare} className={styles.shareBtnX}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'middle' }}>
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                            </svg>
                        </Button>
                        <Button onClick={() => window.open(`https://line.me/R/share?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`, '_blank')} className={styles.shareBtnLine}>
                            LINE
                        </Button>
                        <Button onClick={() => window.open('https://instagram.com', '_blank')} className={styles.shareBtnInsta}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" style={{ verticalAlign: 'middle' }}>
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                            </svg>
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
