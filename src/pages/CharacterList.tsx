import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RESULTS } from '../data/results';
import { Layout } from '../components/Layout';
import styles from './CharacterList.module.css';

// Grouping logic:
// Group 1: Hot + Out (感情的発散) - The Aggressors (暴走族)
// Group 2: Hot + In (感情的内省) - The Dramatics (悲劇の主人公)
// Group 3: Cold + Out (論理的発散) - The Strategists (支配者層)
// Group 4: Cold + In (論理的内省) - The Hermits (悟り・虚無)

interface Group {
    id: string;
    name: string;
    description: string;
    color: string;
    chars: typeof RESULTS[string][];
}

export const CharacterList: React.FC = () => {
    const navigate = useNavigate();
    const allChars = Object.values(RESULTS);

    const groups: Group[] = [
        {
            id: 'HO',
            name: '暴走族 (Hot + Out)',
            description: '感情的で攻撃的。他人にストレスをぶつける厄介者たち。',
            color: '#FFB7B2',
            chars: allChars.filter(c => c.id.startsWith('HO'))
        },
        {
            id: 'HI',
            name: 'メンヘラ族 (Hot + In)',
            description: '感情豊かで内罰的。自分だけの世界でドラマを演じる人たち。',
            color: '#C7CEEA',
            chars: allChars.filter(c => c.id.startsWith('HI'))
        },
        {
            id: 'CO',
            name: '支配者族 (Cold + Out)',
            description: '冷徹で攻撃的。感情を排して他人を利用する恐ろしい人たち。',
            color: '#B5EAD7',
            chars: allChars.filter(c => c.id.startsWith('CO'))
        },
        {
            id: 'CI',
            name: '悟り族 (Cold + In)',
            description: '冷徹で内向的。世俗に関心がなく、人間味（感情）を捨てた人たち。',
            color: '#E2F0CB',
            chars: allChars.filter(c => c.id.startsWith('CI'))
        }
    ];

    return (
        <Layout>
            <div className={styles.container}>
                <h2 className={styles.pageTitle}>性格図鑑</h2>
                <p className={styles.subtitle}>全16種類のひねくれパターン</p>

                {groups.map(group => (
                    <div key={group.id} className={styles.groupSection}>
                        <div className={styles.groupHeader} style={{ backgroundColor: group.color }}>
                            <div className={styles.groupTitle}>{group.name}</div>
                            <div className={styles.groupDesc}>{group.description}</div>
                        </div>

                        <div className={styles.grid}>
                            {group.chars.map((char) => (
                                <div
                                    key={char.id}
                                    className={styles.card}
                                    // style={{ borderColor: group.color }} // Removed colorful border for cleaner look
                                    onClick={() => navigate(`/result/${char.id}`)}
                                >
                                    <div className={styles.cardImagePlaceholder} style={{ backgroundColor: char.color + '40' }}>
                                        {char.image ? (
                                            <img src={char.image} alt={char.name} className={styles.cardImage} />
                                        ) : (
                                            <div className={styles.noImageText}>No Image</div>
                                        )}
                                    </div>

                                    <div className={styles.cardBody}>
                                        <div className={styles.charTitle} style={{ color: group.color }}>{char.title}</div>
                                        <div className={styles.charId}>{char.id}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Axes Explanation (Moved to bottom or collapsed if needed, but keeping simplistic) */}

            </div>
        </Layout>
    );
};
