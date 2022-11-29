// spinner
import { Dna } from "react-loader-spinner";

// style
import "../style/isLoading.css";

const IsLoading = () => {
  return (
    <div className="is-loading">
      <Dna
        visible={true}
        height="160"
        width="160"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default IsLoading;
