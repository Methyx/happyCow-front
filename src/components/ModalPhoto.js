import "../style/modalPhoto.css";

const ModalPhoto = ({ imageInModal, setModalPhoto }) => {
  document.body.style.overflow = "hidden";
  return (
    <div className="modalPhoto-root">
      <div
        className="modalPhoto"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          onClick={() => {
            setModalPhoto(false);
            document.body.style.overflow = "auto";
          }}
        >
          Close
        </button>
        <img src={imageInModal} alt="restaurant" />
      </div>
    </div>
  );
};

export default ModalPhoto;
