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
}