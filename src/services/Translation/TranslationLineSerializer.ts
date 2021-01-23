import TranslationLine from './TranslationLine';
import TranslationLineDto from './TranslationLineDto';

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
    const oneHourInSec = 60 * 3600;
    const hours = Math.floor(value / oneHourInSec);
    const minutes = Math.floor((value - hours * oneHourInSec) / 60);
    const seconds = Math.floor(value - hours * oneHourInSec - minutes * 60);
    const miliseconds = Math.floor((value - seconds) * 1000);

    return `${hours}:${minutes}:${seconds},${miliseconds}`;
  }

  static toSrt(translations: TranslationLine[]): string {
    return translations
      .filter(t => t.isTimed())
      .map((t, index) => (
        `${index + 1}
${this.secondsWithMsToSrtTimeString(t.getStartTime() as number)} --> ${this.secondsWithMsToSrtTimeString(t.getEndTime() as number)}
${t.getContent()}`
      ))
      .join('\n\n')
  }
}