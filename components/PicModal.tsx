import React, { useEffect, useState } from 'react';
import "./Components.css";
import { getCountrySpecificPics } from '@/_data/pic';
import type { pic } from '@/_data/pic';

type PicModalProps = {
    isOpen: boolean,
    name: string,
    code: string,
    close: () => void,
};

export default function PicModal({ isOpen, name, code, close }: PicModalProps) {

    const [currentPic, setCurrentPic] = useState(0);

    const handleClose = () => {
      setCurrentPic(0); 
      close(); 
  };

    const handlePrevious = () => {
        const newIndex = (currentPic === 0) ? pics.length - 1 : currentPic - 1;
        setCurrentPic(newIndex);
      };
    
      const handleNext = () => {
        const newIndex = (currentPic === (pics.length - 1)) ? 0 : currentPic + 1;
        setCurrentPic(newIndex);
      };

    let pics:pic[] = getCountrySpecificPics(code);


    //this prevents scrolling while the modal is open
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
                <button onClick={handleClose} className='modal-close'><img src="/close.png" width={50} /></button>
                <h1 className="modal-title">Pictures from {name}</h1>
                <h2>{pics[currentPic].date}</h2>
                <div className='display'>
                  <a href={pics[currentPic].src} target='_blank' rel="noopener noreferrer"><img src={pics[currentPic].src} height={500} width={450} /></a>
                </div>
                <div className="modal-footer">
                    <button className='prev-btn rotate-y-180 mr-2 cursor-pointer' onClick={handlePrevious}><img src="/arrow.png" height={50} width={50} /></button>
                    <p>picture {currentPic + 1} / {pics.length}</p>
                    <button className='prev-btn ml-2 cursor-pointer' onClick={handleNext}><img src="/arrow.png" height={50} width={50} /></button>
                </div>
            </div>
        </div>
    );
}