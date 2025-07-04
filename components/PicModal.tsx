import React, { useEffect, useState } from 'react';
import "./Components.css";
import { getCountrySpecificPics } from '@/_data/pic';

type PicModalProps = {
    isOpen: boolean;
    name: string;
    close: () => void;
};

export default function PicModal({ isOpen, name, close }: PicModalProps) {

    const [currentPic, setCurrentPic] = useState(0);

    const handlePrevious = () => {
        // Here's your overflow logic!
        // If the current pic is the first one, loop to the end. Otherwise, go back one.
        const newIndex = currentPic === 0 ? pics.length - 1 : currentPic - 1;
        setCurrentPic(newIndex);
      };
    
      const handleNext = () => {
        // And the other way for the next button
        const newIndex = currentPic === pics.length - 1 ? 0 : currentPic + 1;
        setCurrentPic(newIndex);
      };

    let pics = getCountrySpecificPics(name);


    //this prevents scrolling of the backpage while the modal is open
    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        }
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" /*onClick={close} commented this out for now because I didnt like the click outside to close functionality*/>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Use the 'name' prop */}
                <button onClick={close} className='modal-close'><img src="/close.png" width={50} /></button>
                <h1 className="modal-title">Pictures from {name}</h1>
                <div className='display'>

                </div>
                <div className="modal-footer">
                    <button className='prev-btn rotate-y-180 mr-2 cursor-pointer' onClick={handlePrevious}><img src="/arrow.png" height={50} width={50} /></button>
                    <p>picture {currentPic} / {pics.length}</p>
                    <button className='prev-btn ml-2 cursor-pointer' onClick={handleNext}><img src="/arrow.png" height={50} width={50} /></button>
                </div>
            </div>
        </div>
    );
}