import { TableBody } from "@mui/material";
import { MutableRefObject } from "react";
import TranslationLine from "../services/Translation/TranslationLine";
import IVideoPlayer from "../services/VideoPlayer/IVideoPlayer";
import TranslationForm from "./TranslationForm";
import TranslationListItem, { ItemColumnUiAdapter, ItemUiAdapter } from "./TranslationListItem";
import './Translations.scss';

type Props = {
    translations: TranslationLine[];
    previewingTranslationRef: MutableRefObject<HTMLElement | undefined>;
    previewedTranslation?: TranslationLine;
    player?: IVideoPlayer;
}

const ContentUiAdapter = TableBody;

const TranslationList = ({ translations, previewingTranslationRef: previewingRef, previewedTranslation, player }: Props) => {
    return (
        <ContentUiAdapter
            id="translations"
            className={`overflow-y-auto pa1 ${translations.length > 0 ? 'has-translations' : ''}`}
        >
            {
                translations.length
                    ? translations.map((t, index) => {
                        const isCurrentlyPreviewed = t === previewedTranslation;

                        return (
                            <TranslationListItem
                                ref={isCurrentlyPreviewed ? previewingRef : undefined}
                                key={index}
                                translationIndex={index}
                                translation={t}
                                isCurrentlyPreviewed={isCurrentlyPreviewed}
                                player={player}
                            />
                        );
                    })
                    : (
                        <ItemUiAdapter>
                            <ItemColumnUiAdapter fullWidth>
                                <div className="tc">There are no translations yet. Import them or add a new one!</div>
                            </ItemColumnUiAdapter>
                        </ItemUiAdapter>
                    )
            }

            <ItemUiAdapter>
                <ItemColumnUiAdapter fullWidth>
                    <TranslationForm insertAfterIndex={translations.length - 1} />
                </ItemColumnUiAdapter>
            </ItemUiAdapter>
        </ContentUiAdapter>
    )
}

export default TranslationList;