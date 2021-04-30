import TranslationLine from './TranslationLine';
import TranslationLineDto from './TranslationLineDto';

export const LINE_SEP = '\n\n';
export const NEWLINE_SEP = '\n';
export default class TranslationLineSerializer {
  static toDto(trLine: TranslationLine): TranslationLineDto {
    return {
      content: trLine.getContent(),
      startTime: trLine.getStartTime(),
      endTime: trLine.getEndTime(),
    }
  }

  static fromDto(dto: TranslationLineDto): TranslationLine {
    const translation = new TranslationLine(dto.content);
    if (dto.startTime) {
      translation.setStartTime(dto.startTime);
    }
    if (dto.endTime) {
      translation.setEndTime(dto.endTime);
    }
    return translation;
  }

  static numberWithZeroPadding(value: number, paddingLength: number = 2): string {
    return value.toString().padStart(paddingLength, '0');
  }

  static secondsWithMsToSrtTimeString(value: number): string {
    const oneHourInSec = 60 * 3600;
    const hours = Math.floor(value / oneHourInSec);
    const minutes = Math.floor((value - hours * oneHourInSec) / 60);
    const seconds = Math.floor(value - hours * oneHourInSec - minutes * 60);
    const miliseconds = Math.floor((value - hours * oneHourInSec - minutes * 60 - seconds) * 1000);

    const paddedH = this.numberWithZeroPadding(hours);
    const paddedM = this.numberWithZeroPadding(minutes);
    const paddedS = this.numberWithZeroPadding(seconds);
    const paddedMs = miliseconds ? miliseconds.toString() : '000';

    return `${paddedH}:${paddedM}:${paddedS},${paddedMs}`;
  }

  static toSrt(translations: TranslationLine[]): string {
    return translations
      .filter(t => t.isTimed())
      .map((t, index) => {
        const parts = [
          `${index + 1}`,
          `${this.secondsWithMsToSrtTimeString(t.getStartTime() as number)} --> ${this.secondsWithMsToSrtTimeString(t.getEndTime() as number)}`,
          t.getContent()
        ];
        return parts.join(NEWLINE_SEP);
      })
      .join(LINE_SEP)
  }

  // static parseSrt(srtContents: string): TranslationLine[] {

  // }
}