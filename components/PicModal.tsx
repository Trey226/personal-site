import React, { useState } from 'react';
import "./Components.css";

type PicModalProps = {
    isOpen: boolean;
    name: string;
    close: () => void;
};

export default function PicModal({ isOpen, name, close }: PicModalProps) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" /*onClick={close}*/>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Use the 'name' prop */}
                <h2>Pictures from {name}</h2>
                <button onClick={close}>Close</button>
            </div>
        </div>
    );
}