import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import '../style/CaptureCamera.css';

const CaptureCamera: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            console.log(imageSrc);
        }
    }, [webcamRef]);

    useEffect(() => {
        const userAgent = navigator.userAgent || (navigator as any).vendor || (window as any).opera;
        if (/android|iPad|iPhone|iPod/i.test(userAgent.toLowerCase())) {
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
