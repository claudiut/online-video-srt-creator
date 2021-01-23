import TranslationLine from "../Translation/TranslationLine";
import TranslationLineDto from "../Translation/TranslationLineDto";
import TranslationLineSerializer from "../Translation/TranslationLineSerializer";
import IStorage from "./IStorage";

export default class LocalStorage implements IStorage {
  set(url: string, translations: TranslationLine[]): void {
    const object = translations.map((t) => TranslationLineSerializer.toDto(t))
    localStorage.setItem(encodeURI(url), JSON.stringify(object));
  }

  get(url: string): TranslationLine[] {
    const json = localStorage.getItem(encodeURI(url)) || JSON.stringify([]);

    return JSON.parse(json).map(
      (dto: TranslationLineDto) => TranslationLineSerializer.fromDto(dto)
    );
  }
}