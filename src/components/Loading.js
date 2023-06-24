import { BeatLoader } from "react-spinners";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        width: "100vw",
        height: "100vh",
      }}
    >
      <BeatLoader color="black" size={30} />
    </div>
  );
}

export default Loading;
