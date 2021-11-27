import TranslationLine from "../services/Translation/TranslationLine";
import { removeTranslation, replaceTranslation } from "../AppState/Actions";
import IVideoPlayer from "../services/VideoPlayer/IVideoPlayer";
import { TableCell, TableRow, TableCellProps } from "@mui/material";
import { getPaddedTimeComponents } from '../services/helper';
import { forwardRef, MouseEvent, useState } from "react";
import TranslationForm from "./TranslationForm";

const formatTranslationTime = (time?: number): string => {
    if (!time && typeof (time) !== 'number') {
        return '-';
    }

    const [paddedH, paddedM, paddedS, paddedMs] = getPaddedTimeComponents(time);
    return `${paddedH}:${paddedM}:${paddedS}.${paddedMs}`;
}

interface ItemColumnUiAdapterProps extends TableCellProps {
    fullWidth?: boolean
}
export const ItemColumnUiAdapter = ({ fullWidth = false, ...rest }: ItemColumnUiAdapterProps) => {
    const customProps = { colSpan: fullWidth ? 99 : undefined };
    return <TableCell {...rest} {...customProps} />;
};

export const ItemUiAdapter = TableRow;

interface Props {
    translation: TranslationLine;
    translationIndex: number;
    isCurrentlyPreviewed: boolean;
    player?: IVideoPlayer;
};

const TranslationListItem = forwardRef(
    ({ translation, isCurrentlyPreviewed = false, player, translationIndex }: Props, ref) => {
        const [showAddForm, setShowAddForm] = useState(false);
        const handleCloseAddForm = setShowAddForm.bind(null, false);

        const startTime = translation.getStartTime();

        const handleResetTime = (resetStart: boolean = true) => {
            resetStart ? translation.removeStartTime() : translation.removeEndTime();
            replaceTranslation(translation);
        };

        const handleRemove = () => {
            removeTranslation(translation);
        };

        const handleClick = () => {
            if (player && startTime) {
                player.setCurrentTime(startTime);
            }
        };

        const handleRowButtonClick = (handler: () => void) => (e: MouseEvent) => {
            e.stopPropagation();
            document.body.focus();
            handler();
        }

        const rowProps = { onClick: handleClick };

        return (
            <>
                <ItemUiAdapter
                    className={
                        `translation-line
                    ${isCurrentlyPreviewed ? 'previewing' : ''}
                    ${startTime ? 'scheduled' : ''}`
                    }
                >
                    <ItemColumnUiAdapter {...rowProps} ref={ref}>
                        <span className="pre">
                            {translation.getContent()}
                        </span>
                    </ItemColumnUiAdapter>
                    <ItemColumnUiAdapter {...rowProps}>
                        {formatTranslationTime(startTime)}
                    </ItemColumnUiAdapter>
                    <ItemColumnUiAdapter {...rowProps}>
                        {formatTranslationTime(translation.getEndTime())}
                    </ItemColumnUiAdapter>
                    <ItemColumnUiAdapter {...rowProps}>
                        <button onClick={handleRowButtonClick(handleResetTime)}>
                            ResetStart
                        </button>
                        <button onClick={handleRowButtonClick(() => handleResetTime(false))}>
                            ResetEnd
                        </button>
                        <button onClick={handleRowButtonClick(() => setShowAddForm(true))}>
                            Add after
                        </button>
                        <button onClick={handleRowButtonClick(handleRemove)}>
                            Delete
                        </button>
                    </ItemColumnUiAdapter>
                </ItemUiAdapter>
                {showAddForm && <ItemUiAdapter>
                    <ItemColumnUiAdapter fullWidth>
                        <TranslationForm
                            insertAfterIndex={translationIndex}
                            onCancel={handleCloseAddForm}
                            onSave={handleCloseAddForm}
                        />
                    </ItemColumnUiAdapter>
                </ItemUiAdapter>}
            </>
        )
    }
);

export default TranslationListItem;