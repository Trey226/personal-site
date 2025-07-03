import React, { useEffect } from 'react';
import "./Components.css";

type PicModalProps = {
    isOpen: boolean;
    name: string;
    close: () => void;
};

export default function PicModal({ isOpen, name, close }: PicModalProps) {


    //this useEffect prevents scrolling of the backpage while the modal is open
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
        <div className="modal-overlay" /*onClick={close}*/>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Use the 'name' prop */}
                <button onClick={close} className='modal-close'>x</button>
                <h1 className="modal-title">Pictures from {name}</h1>
                <div className="modal-footer">small pics here</div>
            </div>
        </div>
    );
}