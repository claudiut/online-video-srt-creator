import { replaceWrongCharacters } from "../helper";

export default class TranslationLine {
  private content: string = '';
  private startTime?: number;
  private endTime?: number;

  constructor(content: string = '') {
    this.setContent(content);
  }

  setContent(content: string): void {
    this.content = replaceWrongCharacters(content);
  }

  getContent(): string {
    return this.content;
  }

  setStartTime(startTime: number): void {
    this.startTime = startTime;
  }

  getStartTime(): number | undefined {
    return this.startTime;
  }

  setEndTime(endTime: number): void {
    this.endTime = endTime;
  }

  removeTime(): void {
    this.startTime = undefined;
    this.endTime = undefined;
  }

  getEndTime(): number | undefined {
    return this.endTime;
  }

  isTimed(): boolean {
    return !!(this.startTime && this.endTime);
  }

  isTimedFor(time: number): boolean {
    return this.isTimed() && time >= (this.startTime as number) && time < (this.endTime as number);
  }
}