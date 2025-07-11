import React, { useEffect, useState } from 'react';
import "./Components.css";
import { getCountrySpecificPics } from '@/_data/pic';
import type { pic } from '@/_data/pic';
import Toast from './Toast'; // Import the Toast component

type PicModalProps = {
  isOpen: boolean,
  name: string,
  code: string,
  close: () => void,
};

export default function PicModal({ isOpen, name, code, close }: PicModalProps) {
  let pics: pic[] = getCountrySpecificPics(code);

  const [currentPic, setCurrentPic] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

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

  const handleEmpty = () => {
    setToastMessage(`Trey hasn't added any pictures for ${name}`);
    close();
    setTimeout(() => {
      setToastMessage('');
    }, 3000); // Hide toast and close modal after 3 seconds
  };



  //this prevents scrolling while the modal is open
  useEffect(() => {
    if (isOpen) {
      if (!pics || pics.length === 0) {
        handleEmpty();
        return;
      }

      // Prevent background scrolling
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Prevent zooming on mobile
      const viewport = document.querySelector('meta[name="viewport"]');
      const originalContent = viewport ? viewport.getAttribute('content') : null;
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        if (viewport && originalContent) {
          viewport.setAttribute('content', originalContent);
        }
      };
    }
  }, [isOpen, pics, handleEmpty]);

  if (!isOpen) {
    return toastMessage ? <Toast message={toastMessage} /> : null;
  }

  if (!pics || pics.length === 0) {
    return toastMessage ? <Toast message={toastMessage} /> : null;
  }


  return (
    <>
      <Toast message={toastMessage} />
      <div className="modal-overlay" /*onClick={close} commented this out for now because I didnt like the click outside to close functionality*/>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button onClick={handleClose} className='modal-close'><img src="/close.png" /></button>
          <h1 className="modal-title">Pictures from {name}</h1>
          <h2>{pics[currentPic].date}</h2>
          <div className='display'>
            <a href={pics[currentPic].src} target='_blank' rel="noopener noreferrer" className="modal-image-link"><img src={pics[currentPic].src} className='modal-image' /></a>
          </div>
          <div className="modal-footer">
            <button className='prev-btn rotate-y-180 mr-2 cursor-pointer' onClick={handlePrevious}><img src="/arrow.png" /></button>
            <p>picture {currentPic + 1} / {pics.length}</p>
            <button className='prev-btn ml-2 cursor-pointer' onClick={handleNext}><img src="/arrow.png" /></button>
          </div>
        </div>
      </div>
    </>
  );
}