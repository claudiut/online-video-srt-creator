import { ChangeEvent, FormEvent, forwardRef, Ref, useState } from "react";
import { BYPASS_SHORTCUTS_CLASS, SPLIT_CONTENT_TYPES } from "../services/helper";

type Props = {
    onSave: (content: string, splitType: string) => void
    onCancel: () => void
}

const TranslationForm = forwardRef(
    ({ onSave, onCancel }: Props, inputRef: Ref<HTMLTextAreaElement>) => {
        const [content, setContent] = useState<string>('');
        const [splitType, setSplitType] = useState<string>(SPLIT_CONTENT_TYPES.NONE);

        const handleSubmit = (event: FormEvent) => {
            event.preventDefault();
            if (!content) {
                return;
            }
            onSave(content, splitType);
            setContent('');
        }

        const handleSelectSplitType = (event: ChangeEvent<HTMLSelectElement>) => {
            setSplitType(event.target.value);
        }

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        rows={30}
                        value={content}
                        className={`w-100 ${BYPASS_SHORTCUTS_CLASS}`}
                        onChange={({ target: { value }} )=> setContent(value)}
                        ref={inputRef}
                    ></textarea>
                </div>
                <div className="flex justify-between">
                    <div>
                        <button type="reset" onClick={onCancel}>Cancel</button>
                    </div>
                    <div>
                        Split by
                        <select value={splitType} onChange={handleSelectSplitType}>
                        {
                            Object.values(SPLIT_CONTENT_TYPES).map(v => (
                                <option key={v} value={v}>{v}</option>
                            ))
                        }
                        </select>
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        );
    }
)

export default TranslationForm;