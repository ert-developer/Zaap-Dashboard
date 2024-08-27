import ReactDOM from "react-dom";
import "./pop-up-modal.css";

const PopupModal = ({ setShowPopup, message }) => {
  const onClickClosePopup = () => {
    setShowPopup(false);
  };

  return ReactDOM.createPortal(
    <div>
      <div className="pop-up-over-lay"></div>
      <div className="pop-up-container">
        <h5 className="pop-up-message">{message}</h5>
        <button className="close-button" onClick={() => onClickClosePopup()}>
          Continue
        </button>
      </div>
    </div>,
    document.querySelector(".modalDiv")
  );
};

export default PopupModal;
