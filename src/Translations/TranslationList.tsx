import TranslationLine from "../services/Translation/TranslationLine";

type Props = {
    translations: TranslationLine[]
}

const TranslationList = ({ translations }: Props) => {
    return (
        <>
            <div className="flex">
                <div className="w-25"><strong>Start</strong></div>
                <div className="w-25"><strong>End</strong></div>
                <div className="w-50"><strong>Subtitle</strong></div>
            </div>
            {
                translations.map((t, index) => (
                    <div className="flex" key={index}>
                        <div className="w-25">{t.getStartTime() || '-'}</div>
                        <div className="w-25">{t.getEndTime() || '-'}</div>
                        <div className="w-50">{t.getContent()}</div>
                    </div>
                ))
            }
        </>
    )
}

export default TranslationList;