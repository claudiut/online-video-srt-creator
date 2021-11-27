import { Button, TextareaAutosize } from "@mui/material";
import { Field, FieldInputProps, FieldProps, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { insertTranslations } from "../AppState/Actions";
import { BYPASS_SHORTCUTS_CLASS, splitLines, splitParagraphs, SPLIT_CONTENT_TYPES } from "../services/helper";
import TranslationLine from "../services/Translation/TranslationLine";

const addTranslation = (content: string, splitType: string, insertAfterIndex: number) => {
    content = content.trim();

    if (splitType === SPLIT_CONTENT_TYPES.NONE) {
        insertTranslations([new TranslationLine(content)], insertAfterIndex);
        return;
    }

    const splitFn = splitType === SPLIT_CONTENT_TYPES.LINE ? splitLines : splitParagraphs;

    const trs = splitFn(content).map((trContent: string) => new TranslationLine(trContent));
    console.log('trs', trs);
    insertTranslations(trs, insertAfterIndex);
};

interface FormValues {
    content: string;
    splitType: string;
};

interface Props {
    insertAfterIndex: number;
    onSave?: () => void;
    onCancel?: () => void;
};

const TranslationForm = ({ insertAfterIndex, onSave = () => null, onCancel = () => null }: Props) => {
    const handleSubmit = async ({ content, splitType }: FormikValues, { resetForm }: FormikHelpers<FormValues>) => {
        console.log(content, splitType);
        addTranslation(content, splitType, insertAfterIndex);
        resetForm();
        onSave();
    }

    return (
        <Formik<FormValues> initialValues={{ content: '', splitType: SPLIT_CONTENT_TYPES.NONE }} onSubmit={handleSubmit}>
            <Form>
                <div>
                    <Field
                        name="content"
                        as={TextareaAutosize}
                        className={`w-100 ${BYPASS_SHORTCUTS_CLASS}`}
                        autoFocus
                        placeholder="Translation content"
                        aria-label="Translation line(s)"
                        minRows={2}
                    />
                </div>
                <div className="flex justify-between">
                    <div>
                        <Button type="reset" onClick={onCancel}>Cancel</Button>
                    </div>
                    <div>
                        Split by
                        <Field as="select" name="splitType">
                            {
                                Object.values(SPLIT_CONTENT_TYPES).map(v => (
                                    <option key={v} value={v}>{v}</option>
                                ))
                            }
                        </Field>
                        <Button type="submit">Save</Button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}


export default TranslationForm;