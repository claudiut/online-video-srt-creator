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
            <div className="w-100 flex pv1">
                <div className="w-20"><strong>Start</strong></div>
                <div className="w-20"><strong>End</strong></div>
                <div className="w-40"><strong>Subtitle</strong></div>
                <div className="w-20"><strong>Actions</strong></div>
            </div>
            {
                translations.map((t, index) => (
                    <div className="w-100 flex translation-line items-center" key={index}>
                        <div className="w-20">{t.getStartTime() || '-'}</div>
                        <div className="w-20">{t.getEndTime() || '-'}</div>
                        <div className="w-40"><span className="pre">{t.getContent()}</span></div>
                        <div className="w-20 flex">
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