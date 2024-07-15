import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import { useRef , useEffect } from "react";

async function loadPosenetAndEstimatePose(imageElement, onPoseDetected) {

    // try and catch block so that no memory leaks occur , no high gpu memory consumed , thus no app crash
    tf.engine().startScope();
    try {
        const net = await posenet.load();
        const pose = await net.estimateSinglePose(imageElement, {
            flipHorizontal: false,
            scale: 0.5,
        });
        onPoseDetected(pose);
    } catch (error) {
        console.error("Pose estimation error:", error);
    } finally {
        tf.engine().endScope();
    }
}

function ImageAnalyser({ imgSrc, onPoseDetected }) {
    const imageRef = useRef();

    useEffect(() => {
        if (imgSrc) {
            const img = imageRef.current;
            loadPosenetAndEstimatePose(img, onPoseDetected);
        }
    }, [imgSrc, onPoseDetected]);

    return (
        <div className="flex items-center justify-center">
            <img ref={imageRef} src={imgSrc} alt="user" style={{display:"block"}} />
        </div>
    );
}

export default ImageAnalyser;
