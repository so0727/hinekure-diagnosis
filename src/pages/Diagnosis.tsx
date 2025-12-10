import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const currentQuestion = QUESTIONS[currentIndex];
    const totalQuestions = QUESTIONS.length;

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
        const { id, scores } = calculateResult(finalAnswers, QUESTIONS);
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
