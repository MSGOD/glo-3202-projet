import React, { useState } from "react";
import {Routes, Route, Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>Welcome</h2>
      <button><Link to="/about">About</Link></button>
      <br />
      <button><Link to="/rate">Rate</Link></button>
    </div>
  );
}

const About = () => {
  return (
    <div>
      <h2>About</h2>
      <Link to="/">
        <button style={{ position: "absolute", top: "10px", right: "10px" }}>
          Home
        </button>
      </Link>
    </div>
  );
}

const Rate = () => {
  const [grade, setGrade] = useState(0);
  const [name, setName] = useState("");
  const [reasoning, setReasoning] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(grade, name, reasoning);
  };

  return (
    <div>
      <Link to="/">
        <button style={{ position: "absolute", top: "10px", right: "10px" }}>
          Home
        </button>
      </Link>
      <h2>Rate</h2>
      <div style={{ border: "1px solid gray", padding: "20px", margin: "20px" }}>
        <form onSubmit={handleSubmit}>
          <label>
            Grade (0-10):
            <br />
            <input
              type="number"
              min="0"
              max="10"
              value={grade}
              onChange={(event) => setGrade(event.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Name:
            <br />
            <input
              type="text"
              maxLength="100"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Reasoning:
            <br />
            <textarea
              maxLength="1000"
              value={reasoning}
              onChange={(event) => setReasoning(event.target.value)}
            />
          </label>
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/rate" element={<Rate />} />
    </Routes>
  );
}

export {App};
