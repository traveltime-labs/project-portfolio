"use client"
import { BeatLoader } from "react-spinners";
import { CSSProperties, useState } from "react";

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999,
  background: "black"
};

const Overlay = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    return (
        <div className="">
            <BeatLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Overlay;