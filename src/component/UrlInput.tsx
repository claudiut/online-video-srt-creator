import { TextField } from '@mui/material';
import React, { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';

import { setUrl } from '../AppState/Actions';

interface Props {
    url?: string;
};

const UrlInput = ({ url = '' }: Props) => {
    const navigate = useNavigate();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const url = (e.target.value || '').trim();
        setUrl(url);
        navigate('?' + new URLSearchParams({ url }));
    }

    return (
        <TextField
            placeholder="Video URL"
            className="w-100"
            onChange={handleChange}
            value={url}
        />
    );
}

export default UrlInput;