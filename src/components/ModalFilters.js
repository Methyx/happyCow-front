// style
import "../style/modalFilters.css";

const ModalFilters = ({ setModalFiltersVisible }) => {
  document.body.style.overflow = "hidden";

  return (
    <div className="modalFilters-root">
      <div
        className="modalFilters"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="right-side">
          <button
            className="close"
            onClick={() => {
              setModalFiltersVisible(false);
              document.body.style.overflow = "auto";
            }}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalFilters;
