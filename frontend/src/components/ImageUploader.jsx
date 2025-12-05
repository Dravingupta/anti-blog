import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../api/axios';
import { FaCloudUploadAlt } from 'react-icons/fa';

const ImageUploader = ({ onUploadSuccess }) => {
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const { data } = await api.post('/images/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (data.ok) {
                onUploadSuccess(data.image);
            }
        } catch (err) {
            console.error('Upload failed', err);
            alert('Upload failed');
        }
    }, [onUploadSuccess]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 group ${isDragActive
                    ? 'border-accent bg-accent/5 scale-[1.02]'
                    : 'border-gray-200 hover:border-accent/50 hover:bg-gray-50'
                }`}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className={`p-4 rounded-full transition-colors duration-300 ${isDragActive ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-gray-400 group-hover:bg-accent/10 group-hover:text-accent'}`}>
                    <FaCloudUploadAlt className="text-3xl" />
                </div>
                <div>
                    <p className="text-lg font-medium text-gray-700 group-hover:text-gray-900">
                        {isDragActive ? 'Drop image here' : 'Click or drag image to upload'}
                    </p>
                    <p className="text-sm text-muted mt-1">
                        Supports JPG, PNG, GIF up to 5MB
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
