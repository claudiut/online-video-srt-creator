import TranslationLine from "../Translation/TranslationLine";
import TranslationLineDto from "../Translation/TranslationLineDto";
import TranslationLineSerializer from "../Translation/TranslationLineSerializer";
import IStorage from "./IStorage";

const STORAGE_KEY = 'translation';

export default class LocalStorage implements IStorage {
  set(translations: TranslationLine[]): void {
    const object = translations.map((t) => TranslationLineSerializer.toDto(t))
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(object));
  }

  get(): TranslationLine[] {
    const json = sessionStorage.getItem(STORAGE_KEY) || JSON.stringify([]);

    return JSON.parse(json).map(
      (dto: TranslationLineDto) => TranslationLineSerializer.fromDto(dto)
    );
  }
}