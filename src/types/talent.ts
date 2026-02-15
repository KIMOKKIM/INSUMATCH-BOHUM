export interface Talent {
  id: string;
  name: string; // Masked name e.g. "김*수"
  age: number;
  gender: '남' | '여';
  career: string; // "신입", "1년", "3년 이상"
  desiredJob: string; // "FC", "TMR", "총무"
  desiredLocation: string;
  title: string; // Resume title
  registeredAt: string;
  tags?: string[];
}
