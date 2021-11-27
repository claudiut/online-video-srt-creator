import { Button, Stack } from "@mui/material";
import PublishIcon from '@mui/icons-material/Publish';
import DownloadIcon from '@mui/icons-material/Download';
import React, { ChangeEvent, useState } from "react";
import { setTranslations } from "../AppState/Actions";
import TranslationLine from "../services/Translation/TranslationLine";

import TranslationLineSerializer from "../services/Translation/TranslationLineSerializer";
import TranslationForm from "./TranslationForm";
import SpacedChildren from "../component/styled/SpacedChildren";

interface Props {
    translations: TranslationLine[],
}

const TranslationFooter = ({ translations }: Props) => {
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const handleClickAddTranslation = () => {
        setShowAddForm(!showAddForm);
    };

    const handleSave = (content: string, splitType: string) => {
        // addTranslation(content, splitType, translations);
        setShowAddForm(false);
    };

    const handleDownload = () => {
        const elem = document.createElement('a');
        const srt = TranslationLineSerializer.toSrt(translations);
        elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(srt));
        const filename = `${translations[0].getContent().split('\n')[0]}.srt`;
        elem.setAttribute('download', filename);
        elem.style.display = 'none';
        document.body.appendChild(elem);

        elem.click();
        document.body.removeChild(elem);
    }

    const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            if (!e.target) {
                return;
            }

            const importedTranslations = TranslationLineSerializer.parseSrt(e.target.result as string);
            setTranslations(importedTranslations);
        }
        reader.onerror = function (evt) {
            console.log('Error loading file', evt);
        }
        reader.readAsText(event.target.files[0], "UTF-8");
    }

    return (
        <div className="pv2">
            <div>
                <div className="pv3">
                    <div>Help</div>
                    <ol>
                        <li>Press Space to play/pause the video and left/right arrow to jump back/forward</li>
                        <li>Press Enter to set the start/end time of translation to current video position</li>
                    </ol>
                </div>
                <SpacedChildren className="flex">
                    <Button
                        variant="contained"
                        onClick={handleClickAddTranslation}
                        style={{ visibility: showAddForm ? 'hidden' : 'visible' }}
                    >
                        Import Text / Lyrics
                    </Button>

                    <label htmlFor="srt-file-input">
                        <input onChange={handleImport} accept=".srt" id="srt-file-input" multiple={false} type="file" style={{ display: 'none' }} />
                        <Button variant="contained" component="span" startIcon={<PublishIcon />}>
                            Import .srt file
                        </Button>
                    </label>

                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            component="span"
                            aria-label="download subtitle"
                            color="primary"
                            disabled={!translations.length}
                            onClick={handleDownload}
                        >
                            Download
                        </Button>
                    </Stack>
                </SpacedChildren>
            </div>
        </div>
    )
};

export default TranslationFooter;