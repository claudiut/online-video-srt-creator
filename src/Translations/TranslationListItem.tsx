import TranslationLine from "../services/Translation/TranslationLine";
import { removeTranslation, replaceTranslation } from "../AppState/Actions";
import IVideoPlayer from "../services/VideoPlayer/IVideoPlayer";

const formatTranslationTime = (time?: number) => time ? Math.trunc(time * 10000) / 10000 : '-'

interface Props {
    translation: TranslationLine,
    isCurrentlyPreviewed: boolean,
    player?: IVideoPlayer
};

const TranslationListItem = ({ translation, isCurrentlyPreviewed = false, player }: Props) => {
    const startTime = translation.getStartTime();

    const handleResetTime = (resetStart: boolean = true) => {
        resetStart ? translation.removeStartTime() : translation.removeEndTime();
        replaceTranslation(translation);
    };

    const handleRemove = () => {
        removeTranslation(translation);
    };

    const handleClick = () => {
        if(player && startTime) {
            player.setCurrentTime(startTime);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={
                `w-100 flex translation-line items-center
                ${isCurrentlyPreviewed ? 'previewing' : ''}
                ${startTime ? 'scheduled' : ''}
                `
            }
        >
            <div className="w-third flex">
                <div className="w-50">{formatTranslationTime(startTime)}</div>
                <div className="w-50">{formatTranslationTime(translation.getEndTime())}</div>
            </div>
            <div className="w-third">
                <span className="pre">{translation.getContent()}</span>
            </div>
            <div className="w-third flex">
                <button onClick={(e) => {e.stopPropagation(); handleResetTime(); document.body.focus();}}>ResetStart</button>
                <button onClick={(e) => {e.stopPropagation(); handleResetTime(false); document.body.focus();}}>ResetEnd</button>
                <button onClick={(e) => {e.stopPropagation(); handleRemove(); document.body.focus();}}>Delete</button>
            </div>
        </div>
    );
};

export default TranslationListItem;