import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { uploadFile, getFile, deleteFile } from '../config/firebase';
import ImageViewer from './imageViewer';

export default function FileUploader({ accept, multiple, onUpload, uploadPath }) {
    const [files, setFiles] = React.useState([])
    const [uploadingFiles, setUploadingFiles] = React.useState(null)
    const [uploadedUrl, setUploadedUrl] = React.useState([]);

    const handleFileSelected = (event) => {
        event.preventDefault();
        if (event.target.files || event.dataTransfer.files) {
            const eventFiles = event.target.files ? event.target.files : event.dataTransfer.files;
            const currentFiles = [...files]
            for (let index = 0; index < Object.keys(eventFiles).length; index++) {
                if (currentFiles.length < multiple) {
                    currentFiles.push({
                        file: eventFiles[Object.keys(eventFiles)[index]],
                        url: null
                    })
                };
            }
            setFiles(currentFiles);
        }
    }
    
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'auto',
                    wrap: 'nowrap',
                    marginBottom: '10px',
                    marginTop: '10px',
                }}>
                {files.map((file, index) => {
                    return (
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '500px',
                                minWidth: '200px',
                                position: 'relative',
                                padding: '10px',
                            }}
                            key={index}
                        >
                            <ImageViewer
                                src={file.url ? uploadedUrl[index] : URL.createObjectURL(file.file)}
                                height={500}
                                width={500}
                                alt={"oscar club"}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    color: "white",
                                    backgroundColor: "black",
                                    height: "30px",
                                    width: "30px",
                                }}
                                onClick={async () => {
                                    const currentFile = [...files]
                                    if (currentFile[index].url) {
                                        await deleteFile(currentFile[index].url)
                                    }
                                    delete currentFile[index];
                                    setFiles(currentFile);
                                }}
                            >
                                <ClearIcon />
                            </Button>
                        </Box>
                    )
                })}
                {Object.keys(files).length < multiple ?
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '500px',
                            minWidth: '200px',
                            minHeight: '200px',
                            position: 'relative',
                            padding: '10px',
                            backgroundColor: "#ebebeb",
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            component="label"
                            color="primary"
                            sx={{
                                width: '100%',
                                height: '100%',
                                textAlign: 'center',
                            }}
                            onDragOver={handleFileSelected}
                            // onDragEnter={handleFileSelected}
                            onDrop={handleFileSelected}
                            // onDropCapture={handleFileSelected}
                        >
                            {" "}
                            Click to choose files or drag files
                            <input type="file" hidden accept={accept} multiple onChange={handleFileSelected} />
                        </Button>
                    </Box>
                    : <></>
                
            }
            </Box>
            {uploadingFiles !== false ?
                <Box sx={{
                }}>
                    <Box
                        sx={{
                            marginTop: "10px",
                            marginBottom: "5px",
                        }}
                    >
                        <Typography variant="text">You can upload max {multiple} file(s)</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        disabled={!Object.keys(files).length}
                        color="primary"
                        sx={{
                            width: '100%',
                            height: '50px',
                        }}
                        onClick={async (event) => {
                            event.preventDefault();
                            setUploadingFiles(true);
                            const urls = [];
                            for (let index = 0; index < files.length; index++) {
                                uploadFile(uploadPath, files[index].file).then(async (url) => {
                                    urls.push(url);
                                    const file = [...files]
                                    urls[index] = await getFile(url);
                                    setFiles(file);
                                    setUploadedUrl(urls)
                                    if (urls.length === files.length) {
                                        console.log('Upload completed successfully')
                                        setUploadingFiles(false);
                                        onUpload(urls);
                                    }
                                })
                            }
                        }}
                    >
                        {" "}
                        {uploadingFiles === null ?
                            <>
                                <CloudUploadIcon /> Upload Files
                            </>
                            : uploadingFiles === true ?
                                <>
                                    <CircularProgress color="inherit" value={(uploadedUrl.length/files.length)*100} />
                                </>
                                : <></>
                        }
                    </Button>
                    </Box>
                    : <></>
                }
        </>
    );
}
