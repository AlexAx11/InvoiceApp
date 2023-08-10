import React from "react";

export function Loader({ loading, error }) {
  if (loading) {
    return (
      <div
        className="spinner-border"
        role="status"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  if (error) {
    return <div>Data loading error</div>;
  }
}

export default Loader;
