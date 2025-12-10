import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QUESTIONS } from '../data/questions';
import { calculateResult } from '../utils/logic';
import type { AnswerValue } from '../utils/logic';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import styles from './Diagnosis.module.css';

export const Diagnosis: React.FC = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});

    const location = useLocation();
    const isSimple = new URLSearchParams(location.search).get('mode') === 'simple';

    // Simple mode: Select 5 questions from each 12-question block (Total 20)
    // Structure assumed: 12 H/C, 12 O/I, 12 P/L, 12 K/S in order.
    const questions = React.useMemo(() => {
        if (!isSimple) return QUESTIONS;
        const q1 = QUESTIONS.slice(0, 5);
        const q2 = QUESTIONS.slice(12, 17);
        const q3 = QUESTIONS.slice(24, 29);
        const q4 = QUESTIONS.slice(36, 41);
        return [...q1, ...q2, ...q3, ...q4];
    }, [isSimple]);

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;

    const handleAnswer = (value: AnswerValue) => {
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);

        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Start analysis animation instead of immediate finish
            setIsAnalyzing(true);
            setTimeout(() => {
                finishDiagnosis(newAnswers);
            }, 3000);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const finishDiagnosis = (finalAnswers: Record<number, AnswerValue>) => {
        const { id, scores } = calculateResult(finalAnswers, questions);
        // Create query string: ?h=60&o=70&p=20&k=90
        // We only need one side of each pair to know the balance, 
        // but passing all might be easier for reading.
        // Let's pass the dominant ones or just A-side (H, O, P, K).
        const query = new URLSearchParams({
            h: scores.H.toString(),
            c: scores.C.toString(),
            o: scores.O.toString(),
            i: scores.I.toString(),
            p: scores.P.toString(),
            l: scores.L.toString(),
            k: scores.K.toString(),
            s: scores.S.toString(),
        }).toString();

        navigate(`/result/${id}?${query}`);
    };

    if (isAnalyzing) {
        return (
            <Layout>
                <div className={styles.analyzingContainer}>
                    <div className={styles.spinner}></div>
                    <h2 className={styles.analyzingText}>性格の歪みを測定中...</h2>
                    <p className={styles.analyzingSubtext}>あなたの心の闇を覗いています</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className={styles.header}>
                <ProgressBar
                    current={currentIndex + 1}
                    total={totalQuestions}
                    onBack={currentIndex > 0 ? handleBack : undefined}
                />
            </div>

            <div className={styles.card}>
                <h2 className={styles.questionText}>{currentQuestion.text}</h2>

                <div className={styles.options}>
                    <Button onClick={() => handleAnswer('strongly_agree')} fullWidth className={styles.optionBtn}>
                        超あてはまる
                    </Button>
                    <Button onClick={() => handleAnswer('agree')} fullWidth className={styles.optionBtn} variant="secondary">
                        あてはまる
                    </Button>
                    <Button onClick={() => handleAnswer('disagree')} fullWidth className={styles.optionBtn} variant="secondary">
                        あてはまらない
                    </Button>
                    <Button onClick={() => handleAnswer('strongly_disagree')} fullWidth className={styles.optionBtn}>
                        全然ちがう
                    </Button>
                </div>
            </div>
        </Layout>
    );
};
