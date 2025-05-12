import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

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

    if (!meta) return <div className="flex w-full justify-center items-center"><Loading /></div>;

    return (
        <div className="border p-4 rounded shadow max-w-full">
            <a href={url} target="_blank" rel="noopener noreferrer">
                <div className='flex' >
                    <div className='w-[60%]' >
                        <img src={meta.image?.url} alt="Preview" className="w-[100%] h-40 object-cover mb-2" />
                    </div>
                    <div className='w-[50%] p-2 flex flex-wrap' >
                        <h2 className="text-md  font-bold">{meta.title}</h2>
                        <p className="text-sm text-gray-600">{meta.description}</p>
                    </div>
                </div>
            </a>
        </div>
    );
}