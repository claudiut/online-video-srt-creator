import React from "react";

import TranslationLine from "../services/Translation/TranslationLine";
import TranslationFooter, { OnAddTranslation } from "./TranslationFooter";
import TranslationHeader from "./TranslationHeader";
import TranslationList from "./TranslationList";

type Props = {
    translations: TranslationLine[];
    onAddTranslation: OnAddTranslation;
    onRemoveTranslation: (t: TranslationLine) => void;
    onUpdateTranslation: (t: TranslationLine) => void;
}

const Translations = ({ translations, onAddTranslation, onRemoveTranslation, onUpdateTranslation }: Props) => {
    return (
        <div className="flex flex-column w-100">
            <TranslationHeader />
            <TranslationList
                translations={translations}
                onRemove={onRemoveTranslation}
                onUpdate={onUpdateTranslation}
            />
            <TranslationFooter translations={translations} onAddTranslation={onAddTranslation} />
        </div>
    )
};

export default Translations;