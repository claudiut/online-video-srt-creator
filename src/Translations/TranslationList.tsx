import TranslationLine from "../services/Translation/TranslationLine";

type Props = {
    translations: TranslationLine[]
}

const TranslationList = ({ translations }: Props) => {
    return (
        <>
            <div className="flex">
                <div className="w-25">Start</div>
                <div className="w-25">End</div>
                <div className="w-50">Subtitle</div>
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