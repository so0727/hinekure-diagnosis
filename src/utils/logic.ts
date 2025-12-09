import type { Question } from '../data/types';
import { RESULTS } from '../data/results';

export type AnswerValue = 'strongly_agree' | 'agree' | 'disagree' | 'strongly_disagree';

export function calculateResult(answers: Record<number, AnswerValue>, questions: Question[]) {
    const scores: Record<string, number> = {
        H: 0, C: 0,
        O: 0, I: 0,
        P: 0, L: 0,
        K: 0, S: 0
    };

    questions.forEach(q => {
        const answer = answers[q.id];
        if (!answer) return;

        switch (answer) {
            case 'strongly_agree':
                scores[q.axisA] += 2;
                break;
            case 'agree':
                scores[q.axisA] += 1;
                break;
            case 'disagree':
                scores[q.axisB] += 1;
                break;
            case 'strongly_disagree':
                scores[q.axisB] += 2;
                break;
        }
    });

    const p1 = scores.H >= scores.C ? 'H' : 'C';
    const p2 = scores.O >= scores.I ? 'O' : 'I';
    const p3 = scores.P >= scores.L ? 'P' : 'L';
    const p4 = scores.K >= scores.S ? 'K' : 'S';

    const typeId = `${p1}${p2}${p3}${p4}`;

    // Calculate percentages
    // Max score per axis depends on question count.
    // Actually, we can just compare P vs L raw scores.
    // Percentage for Axis A = A / (A + B) * 100

    const calcPct = (a: number, b: number) => {
        const total = a + b;
        if (total === 0) return 50; // default
        return Math.round((a / total) * 100);
    };

    const pcts = {
        H: calcPct(scores.H, scores.C),
        C: calcPct(scores.C, scores.H),
        O: calcPct(scores.O, scores.I),
        I: calcPct(scores.I, scores.O),
        P: calcPct(scores.P, scores.L),
        L: calcPct(scores.L, scores.P),
        K: calcPct(scores.K, scores.S),
        S: calcPct(scores.S, scores.K),
    };

    return {
        id: typeId,
        type: RESULTS[typeId] || RESULTS['HOLS'],
        scores: pcts
    };
}
