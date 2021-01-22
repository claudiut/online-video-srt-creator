import { FormEvent, forwardRef, Ref, useState } from "react";

type Props = {
    onSave: (content: string, multiple?: boolean) => void
    onCancel: () => void
}

const TranslationForm = forwardRef(
    ({ onSave, onCancel }: Props, inputRef: Ref<HTMLTextAreaElement>) => {
        const [content, setContent] = useState<string>('');

        const save = (content: string, multiple = false) => {
            if (!content) {
                return;
            }
            onSave(content, multiple);
            setContent('');
        };

        const handleSubmit = (event: FormEvent) => {
            event.preventDefault();
            save(content);
        }

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        value={content}
                        className="w-100"
                        onChange={({ target: { value }} )=> setContent(value)}
                        ref={inputRef}
                        rows={3}
                    ></textarea>
                </div>
                <div className="flex justify-between">
                    <div>
                        <button type="reset" onClick={onCancel}>Cancel</button>
                    </div>
                    <div>
                        <button type="button" onClick={() => save(content, true)}>Save multiple</button>
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        );
    }
)

export default TranslationForm;