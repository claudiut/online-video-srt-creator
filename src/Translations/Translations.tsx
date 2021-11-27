import { Paper, Table, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Theme } from "@mui/material";
import styled from "@mui/styled-engine";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Dropzone, { FileWithPath } from "react-dropzone";
import { setTranslations } from "../AppState/Actions";
import { player$, previewedTranslation$, translations$ } from "../AppState/Observables";
import useObservedValue from "../hooks/useObservedValue";
import { scrollIntoView } from "../services/helper";
import TranslationLine from "../services/Translation/TranslationLine";
import TranslationLineSerializer from "../services/Translation/TranslationLineSerializer";

import Subscribe from "../Subscribe";
import TranslationFooter from "./TranslationFooter";
import TranslationList from "./TranslationList";

const StyledTableCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'gray',
        color: 'white',
        paddingTop: '0.75em',
        paddingBottom: '0.75em',
    },
}));
const StyledTimeCell = styled(StyledTableCell)({
    width: '200px'
})

interface Props {
    children: React.ReactChild;
    scrolledElemRef: MutableRefObject<HTMLDivElement | null>;
}

const HeaderAndContentUiAdapter = ({ children, scrolledElemRef }: Props) => (
    <TableContainer component={Paper} ref={(elem: HTMLDivElement | null) => { if (elem) { scrolledElemRef.current = elem } }}>
        <Table stickyHeader size="small" aria-label="simple table">
            <TableHead>
                <TableRow>
                    <StyledTableCell component="th">Subtitle</StyledTableCell>
                    <StyledTimeCell component="th">Start</StyledTimeCell>
                    <StyledTimeCell component="th">End</StyledTimeCell>
                    <StyledTableCell component="th" width="100%">Actions</StyledTableCell>
                </TableRow>
            </TableHead>
            {children}
        </Table>
    </TableContainer>
);

const defaultTranslations: Array<TranslationLine> = [];

const Translations = () => {
    const previewedTranslation = useObservedValue(previewedTranslation$);
    const player = useObservedValue(player$);

    const previewingTranslationRef = useRef();
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const playerExistsAndIsPlaying = player && player.isPlaying();
    useEffect(() => scrollIntoView(previewingTranslationRef, wrapperRef), [
        previewedTranslation, playerExistsAndIsPlaying
    ]);

    const [dragging, setDragging] = useState(false);
    const highlightUploadZone = () => setDragging(true);
    const unhighlightUploadZone = () => setDragging(false);
    const onDropFiles = async (droppedFiles: FileWithPath[]) => {
        const importedTranslations = TranslationLineSerializer.parseSrt(await droppedFiles[0].text());
        setTranslations(importedTranslations);
    };

    return (
        <Dropzone
            onDrop={onDropFiles}
            onDragEnter={highlightUploadZone}
            onDragLeave={unhighlightUploadZone}
            onDropAccepted={unhighlightUploadZone}
            noClick
        >
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className={`flex flex-column w-100 dropzone ${dragging ? 'dragging' : ''}`}>
                    <input {...getInputProps()} multiple={false} />

                    <HeaderAndContentUiAdapter scrolledElemRef={wrapperRef}>
                        <Subscribe observable$={translations$}>
                            {(translations = defaultTranslations) => (
                                <TranslationList
                                    previewingTranslationRef={previewingTranslationRef}
                                    translations={translations}
                                    previewedTranslation={previewedTranslation}
                                    player={player}
                                />
                            )}
                        </Subscribe>
                    </HeaderAndContentUiAdapter>

                    <Subscribe observable$={translations$}>
                        {
                            (translations = defaultTranslations) => <TranslationFooter translations={translations} />
                        }
                    </Subscribe>
                </div>
            )}
        </Dropzone>
    )
};

export default Translations;