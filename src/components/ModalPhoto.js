import "../style/modalPhoto.css";

const ModalPhoto = ({ imageInModal, setModalPhotoVisible }) => {
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
          className="close"
          onClick={() => {
            setModalPhotoVisible(false);
            document.body.style.overflow = "auto";
          }}
        >
          X
        </button>
        <img src={imageInModal} alt="restaurant" />
      </div>
    </div>
  );
};

export default ModalPhoto;
