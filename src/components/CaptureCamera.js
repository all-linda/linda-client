// src/components/CaptureCamera.js
import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './CaptureCamera.css';

const CaptureCamera = () => {
    const webcamRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
    }, [webcamRef]);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android|iPad|iPhone|iPod/.test(userAgent.toLowerCase())) {
            setIsMobile(true);
        }
    }, []);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: isMobile ? { exact: 'environment' } : 'user'
    };

    return (
        <div className="camera-container">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="camera"
            />
            <button onClick={capture} className="capture-button">Capture photo</button>
        </div>
    );
};

export default CaptureCamera;
