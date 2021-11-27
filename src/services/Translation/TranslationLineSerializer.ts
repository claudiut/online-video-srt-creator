import { computeParsedToSeconds, removeLeftZeroPadding, getPaddedTimeComponents } from '../helper';
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

  static secondsWithMsToSrtTimeString(value: number): string {
    const [paddedH, paddedM, paddedS, paddedMs] = getPaddedTimeComponents(value);
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

  static parseSrt(srtContents: string): TranslationLine[] {
    const timeReg = '(\\d+):(\\d+):(\\d+),(\\d+)';
    const regexp = new RegExp(`(\\d+)${NEWLINE_SEP}${timeReg}\\s-->\\s${timeReg}${NEWLINE_SEP}(.+)(${LINE_SEP})?`, 'g');
    const match = srtContents.matchAll(regexp);
  
    const translations = [];

    for (const m of match) {
      const t = new TranslationLine(m[10]);

      const startH = parseInt(removeLeftZeroPadding(m[2]));
      const startM = parseInt(removeLeftZeroPadding(m[3]));
      const startS = parseInt(removeLeftZeroPadding(m[4]));
      const startMs = parseInt(removeLeftZeroPadding(m[5]));
      t.setStartTime(computeParsedToSeconds(startH, startM, startS, startMs));

      const endH = parseInt(removeLeftZeroPadding(m[6]));
      const endM = parseInt(removeLeftZeroPadding(m[7]));
      const endS = parseInt(removeLeftZeroPadding(m[8]));
      const endMs = parseInt(removeLeftZeroPadding(m[9]));
      t.setEndTime(computeParsedToSeconds(endH, endM, endS, endMs));

      translations.push(t);
    }

    return translations;
  }
}