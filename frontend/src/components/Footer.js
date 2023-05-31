import React from "react";
import "./Footer.css";

export default function Footer() {
    return <div className="footer">
    <>
      <span>
        © MonJDG {new Date().getFullYear()}, Made with ❤️ by {""}
        <a href="https://monjdg.com" target="_blank" rel="noreferrer">
            Monica and Jacob
        </a>
      </span>
    </>

    </div>;
};


