function Dialog({ message, onDialog, item }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={() => onDialog(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div stlye={{ color: "#111", fontSize: "12px", textAlign: "center" }}>
          {message}
        </div>
        <br />
        <div
          style={{
            color: "blue",
            fontSize: "12px",
            width: "100%",
            textAlign: "left",
          }}
        >
          {item}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => onDialog(true)}
            style={{
              width: 35,
              height: 30,
              background: "red",
              color: "white",
              padding: "6px",
              marginRight: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => onDialog(false)}
            style={{
              width: 35,
              height: 30,
              background: "green",
              color: "white",
              padding: "6px",
              marginLeft: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;