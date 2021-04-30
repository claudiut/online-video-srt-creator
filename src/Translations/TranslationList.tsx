import { setTranslations } from "../AppState/Actions";
import TranslationLine from "../services/Translation/TranslationLine";
import './Translations.scss';

type Props = {
    translations: TranslationLine[];
}

const formatTranslationTime = (time?: number) => time ? Math.trunc(time * 10000) / 10000 : '-'

const TranslationList = ({ translations }: Props) => {
    const handleResetTime = (t: TranslationLine, resetStart: boolean = true) => {
        resetStart ? t.removeStartTime() : t.removeEndTime();
        setTranslations(translations.map(tr => tr === t ? t : tr));
    };

    const handleRemove = (t: TranslationLine) => {
        setTranslations(translations.filter(tr => tr !== t));
    };

    return (
        <div id="translations" className={`overflow-y-auto pa1 ${translations.length > 0 ? 'has-translations' : ''}`}>
            {
                translations.map((t, index) => (
                    <div className="w-100 flex translation-line items-center" key={index}>
                        <div className="w-third flex">
                            <div className="w-50">{formatTranslationTime(t.getStartTime())}</div>
                            <div className="w-50">{formatTranslationTime(t.getEndTime())}</div>
                        </div>
                        <div className="w-third">
                            <span className="pre">{t.getContent()}</span>
                        </div>
                        <div className="w-third flex">
                            <button onClick={() => handleResetTime(t)}>ResetStart</button>
                            <button onClick={() => handleResetTime(t, false)}>ResetEnd</button>
                            <button onClick={() => handleRemove(t)}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TranslationList;