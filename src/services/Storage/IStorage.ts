import TranslationLine from "../Translation/TranslationLine";

export default interface IStorage {
  set: (translations: TranslationLine[]) => void;
  get: () => TranslationLine[];
}