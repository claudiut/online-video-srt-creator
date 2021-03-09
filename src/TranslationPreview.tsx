import { ReactElement } from "react";
import TranslationLine from "./services/Translation/TranslationLine";

type Props = {
    previewedTranslation: TranslationLine;
}

const TranslationPreview = ({ previewedTranslation }: Props): ReactElement => (
    <div className="tc pa2 f4">
        <span className="pre">{previewedTranslation.getContent()}</span>
    </div>
);

export default TranslationPreview;