import React from "react";
import { translations$ } from "../services/BehaviourSubjects";

import Subscribe from "../Subscribe";
import TranslationFooter from "./TranslationFooter";
import TranslationHeader from "./TranslationHeader";
import TranslationList from "./TranslationList";

const Translations = () => {
    return (
        <div className="flex flex-column w-100">
            <TranslationHeader />
            <Subscribe observable$={translations$}>
                {
                    (translations = []) => (
                        <>
                            <TranslationList translations={translations} />
                            <TranslationFooter translations={translations} />
                        </>
                    )
                }
            </Subscribe>
        </div>
    )
};

export default Translations;