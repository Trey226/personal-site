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
                <button onClick={close} className='modal-close'>close</button>
                <h1 className="modal-title">Pictures from {name}</h1>
            </div>
        </div>
    );
}