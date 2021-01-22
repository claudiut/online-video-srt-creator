import { useEffect, useState } from "react";
import { getTranslationForTime } from "./services/helper";
import TranslationLine from "./services/Translation/TranslationLine";
import IVideoPlayer from "./services/VideoPlayer/IVideoPlayer";

type Props = {
    player: IVideoPlayer | null;
    translations: TranslationLine[];
}

const TranslationPreview = ({ player, translations }: Props) => {
    const [previewedTranslation, setPreviewedTranslation] = useState<TranslationLine|undefined>(undefined);

    useEffect(() => {
        if (player) {
            // TODO: unsub the previous observer
            player.onTimeUpdate((currentTime) => {
                const crtTranslation = getTranslationForTime(translations, currentTime);
                setPreviewedTranslation(crtTranslation);
            });
        }
    }, [player, translations])

    return <div>{previewedTranslation?.getContent()}</div>
};

export default TranslationPreview;