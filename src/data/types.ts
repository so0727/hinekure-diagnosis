export type AxisValues = 'H' | 'C' | 'O' | 'I' | 'P' | 'L' | 'K' | 'S';

export interface Question {
    id: number;
    text: string;
    axisA: AxisValues; // e.g. 'H'
    axisB: AxisValues; // e.g. 'C'
    // If user agrees, score goes to AxisA? We need to define the logic clearly.
    // Simplified: "Yes" implies AxisA, "No" implies AxisB.
}

export interface CharacterType {
    id: string; // e.g., 'HOLS'
    name: string; // e.g., 'The Debater'
    title: string; // e.g., '論破厨'
    catchphrase: string;
    description: string;
    traits: string[];
    color: string; // Hex for the type card
    image?: string; // Path to character illustration
}
