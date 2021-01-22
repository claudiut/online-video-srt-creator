import TranslationLine from "./Translation/TranslationLine";

export const splitMultipleLines = (content: string): string[] => {
  return content.split(/[\n\r]+/);
}

export const getTranslationForTime = (translations: TranslationLine[], time: number): TranslationLine | undefined => {
  return translations.find((t) => t.isTimedFor(time))
}