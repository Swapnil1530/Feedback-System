import React from "react";

export default function Loading() {
  const styles = {
    ldsRing: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40px",  
        height: "40px", 
      } as React.CSSProperties,
    ldsRingDiv: {
      boxSizing: "border-box",
      display: "block",
      position: "absolute",
      width: "40px",
      height: "40px",
      margin: "8px",
      border: "8px solid #fff",
      borderRadius: "50%",
      animation: "lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
      borderColor: "#fff transparent transparent transparent",
    } as React.CSSProperties,
    ldsRingDiv1: {
      animationDelay: "-0.45s",
    },
    ldsRingDiv2: {
      animationDelay: "-0.3s",
    },
    ldsRingDiv3: {
      animationDelay: "-0.15s",
    },
    keyframes: `
      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  };

  return (
    <div>
      <style>{styles.keyframes}</style>
      <div style={styles.ldsRing}>
        <div style={{ ...styles.ldsRingDiv, ...styles.ldsRingDiv1 }}></div>
        <div style={{ ...styles.ldsRingDiv, ...styles.ldsRingDiv2 }}></div>
        <div style={{ ...styles.ldsRingDiv, ...styles.ldsRingDiv3 }}></div>
        <div style={styles.ldsRingDiv}></div>
      </div>
    </div>
  );
}
