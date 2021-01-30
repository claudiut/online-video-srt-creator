import { useEffect, useState } from "react";
import { getLatestTranslationForTime } from "./services/helper";
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
            const subscription = player.currentTime$.subscribe({
                next(currentTime: number) {
                    const crtTranslation = getLatestTranslationForTime(translations, currentTime);
                    setPreviewedTranslation(crtTranslation);
                }
            });

            return () => {
                subscription.unsubscribe();
            }
        }
    }, [player, translations])

    return (
        <div className="tc pa2 f4">
            <span className="pre">{previewedTranslation?.getContent()}</span>
        </div>
    );
};

export default TranslationPreview;