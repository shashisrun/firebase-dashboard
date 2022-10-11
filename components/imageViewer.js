import React from "react";
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import { getFile } from "../config/firebase";
export default function ImageViewer(props) {
    const { src, ...attributes } = props;
    const [url, setUrl] = React.useState();

    React.useEffect(() => {
        const getUrl = async () => {
            const file = await getFile(src);
            if (file) {
                setUrl(file);
            } else {
                setUrl(src);
            }
        }
        getUrl();
    }, [src])

    if (!url) return <CircularProgress />

    return <Image src={url} {...attributes} />
}