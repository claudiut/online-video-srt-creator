import { ReactElement } from "react";
import { previewedTranslation$ } from "./AppState/Observables";
import useObservedValue from "./hooks/useObservedValue";

const TranslationPreview = (): ReactElement => {
    const previewedTr = useObservedValue(previewedTranslation$);

    return (
        <>
            {
                previewedTr && (
                    <div className="tc pa2 f4">
                        <span className="pre">{previewedTr.getContent()}</span>
                    </div>
                )
            }
        </>
    );
}

export default TranslationPreview;