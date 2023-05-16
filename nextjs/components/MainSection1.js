export default function MainSection1() {
  return (
    <video
      src="./mainVisual/mainVisual.mp4"
      className="mainVisual"
      autoPlay
      loop
      muted
      poster="./mainVisual/mainVisual.png"
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
