import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const createStars = (rating, top) => {
  const goldStars = [];
  const emptyStars = [];
  const width = 90;
  const height = 20;
  for (let i = 1; i <= 5; i++) {
    emptyStars.push(
      <FontAwesomeIcon
        key={Math.random()}
        icon="star"
        style={{ color: "gray" }}
      />
    );
  }
  for (let i = 1; i <= Math.ceil(rating); i++) {
    goldStars.push(
      <FontAwesomeIcon
        key={Math.random()}
        icon="star"
        style={{ color: "gold" }}
      />
    );
  }
  return (
    <div style={{ position: "relative" }}>
      <p style={{ width: `${width}px` }}>{emptyStars}</p>
      <p
        style={{
          position: "absolute",
          height: `${height}px`,
          top: `${top}px`,
          left: 0,
          display: "flex",
          width: `${(width / 5) * rating}px`,
          // flexWrap: "nowrap",
          overflow: "hidden",
        }}
      >
        {goldStars}
      </p>
    </div>
  );
};

export default createStars;
