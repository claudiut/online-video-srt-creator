import TranslationLine from "../services/Translation/TranslationLine";
import './Translations.scss';

type Props = {
    translations: TranslationLine[];
    onRemove: (t: TranslationLine) => void;
    onUpdate: (t: TranslationLine) => void;
}

const TranslationList = ({ translations, onRemove, onUpdate }: Props) => {
    const handleResetTime = (t: TranslationLine, resetStart: boolean = true) => {
        resetStart ? t.removeStartTime() : t.removeEndTime();
        onUpdate(t);
    };

    return (
        <div>
            <div className="flex">
                <div className="w-25"><strong>Start</strong></div>
                <div className="w-25"><strong>End</strong></div>
                <div className="w-50"><strong>Subtitle</strong></div>
            </div>
            {
                translations.map((t, index) => (
                    <div className="translation-line flex" key={index}>
                        <div className="flex w-100 pb2 mb1">
                            <div className="w-25">{t.getStartTime() || '-'}</div>
                            <div className="w-25">{t.getEndTime() || '-'}</div>
                            <div className="w-50"><span className="pre">{t.getContent()}</span></div>
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => handleResetTime(t)}>ResetStart</button>
                            <button onClick={() => handleResetTime(t, false)}>ResetEnd</button>
                            <button onClick={() => onRemove(t)}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TranslationList;