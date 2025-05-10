import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function LinkPreview({ url }) {
    const [meta, setMeta] = useState(null);

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                const res = await axios.get(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
                setMeta(res.data.data);
            } catch (err) {
                console.error('Failed to fetch preview', err);
            }
        };
        fetchPreview();
    }, [url]);

    if (!meta) return <p>Loading preview...</p>;

    return (
        <div className="border p-4 rounded shadow max-w-md">
            <a href={url} target="_blank" rel="noopener noreferrer">
                <img src={meta.image?.url} alt="Preview" className="w-full h-40 object-cover mb-2" />
                <h2 className="text-lg font-bold">{meta.title}</h2>
                <p className="text-sm text-gray-600">{meta.description}</p>
                <p className="text-xs text-blue-500 mt-1">{meta.url}</p>
            </a>
        </div>
    );
}