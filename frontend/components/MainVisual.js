export default function MainVisual() {
  return (
    <video
      src="./resources/mainVisual/mainVisual.mp4"
      className="mainVisual"
      autoPlay
      loop
      muted
      poster="./resources/mainVisual/mainVisual.png"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
      }}
    />
  );
}
