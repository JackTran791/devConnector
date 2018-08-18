import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer
        className="bg-dark text-white mt-5 p-4 text-center"
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          left: 0,
          height: "60px",
          marginTop: "0px",
          fontFamily: "montserrat-regular sans-serif",
          fontSize: "1rem",
          letterSpacing: "0.3rem"
        }}
      >
        Copyright &copy; {new Date().getFullYear()} DevsBook
      </footer>
    );
  }
}
