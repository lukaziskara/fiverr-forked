import { useState } from "react";

export default function About(props) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  // console.log(props.desc, "dwadwejkn");
  return (
    <div className="about">
      {isAboutOpen ? (
        <div className="about_open">
          <h2
            className="about_header"
            onClick={() => setIsAboutOpen(!isAboutOpen)}
          >
            {props.desc.h2}
          </h2>
          <p className="about_paragraph">{props.desc.p}</p>
        </div>
      ) : (
        <div
          className="about_close"
          onClick={() => setIsAboutOpen(!isAboutOpen)}
        >
          აღწერა
        </div>
      )}
    </div>
  );
}
