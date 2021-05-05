import { player$, previewedTranslation$ } from "../AppState/Observables";
import useObservedValue from "../hooks/useObservedValue";
import TranslationLine from "../services/Translation/TranslationLine";
import TranslationListItem from "./TranslationListItem";
import './Translations.scss';

type Props = {
    translations: TranslationLine[];
}

const TranslationList = ({ translations }: Props) => {
    const previewedTranslation = useObservedValue(previewedTranslation$);
    const player = useObservedValue(player$);

    return (
        <div id="translations" className={`overflow-y-auto pa1 ${translations.length > 0 ? 'has-translations' : ''}`}>
            {
                translations.map((t, index) => (
                    <TranslationListItem
                        key={index}
                        translation={t}
                        isCurrentlyPreviewed={t === previewedTranslation}
                        player={player}
                    />
                ))
            }
        </div>
    )
}

export default TranslationList;