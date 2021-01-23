import TranslationLine from "../Translation/TranslationLine";

export default interface IStorage {
  set: (url: string, translations: TranslationLine[]) => void;
  get: (url: string) => TranslationLine[];
}