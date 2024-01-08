import '@styles/Popup.sass';

interface IPopup {
    text: string
}

export const Popup: React.FC<IPopup> = ({ text }) => {
    return (
        <div className="popup">
            <div className="popup__text">
                <p>
                    {text}
                </p>
            </div>
        </div>
    );
};
