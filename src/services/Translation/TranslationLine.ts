export type TranslationObject = {
  content: string;
  startTime?: number;
  endTime?: number;
}

export default class TranslationLine {
  private _startTime?: number;
  private _endTime?: number;

  constructor(private _content: string = '') {}

  setContent(content: string): void {
    this._content = content;
  }

  getContent(): string {
    return this._content;
  }

  setStartTime(startTime: number): void {
    this._startTime = startTime;
  }

  getStartTime(): number | undefined {
    return this._startTime;
  }

  setEndTime(endTime: number): void {
    this._endTime = endTime;
  }

  getEndTime(): number | undefined {
    return this._endTime;
  }

  isTimed(): boolean {
    return !!(this._startTime && this._endTime);
  }

  isTimedFor(time: number): boolean {
    return this.isTimed() && (this._startTime as number) <= time && (this._endTime as number) > time;
  }

  toObject(): TranslationObject {
    return {
      content: this._content,
      startTime: this._startTime,
      endTime: this._endTime,
    };
  }

  fromObject(object: TranslationObject): void {
    this._content = object.content;
    this._startTime = object.startTime;
    this._endTime = object.endTime;
  }
}