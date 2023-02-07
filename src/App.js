import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Welcome</h2>
      <button><Link to="/about">About</Link></button>
      <br />
      <button><Link to="/rate">Rate</Link></button>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Rate() {
  const [grade, setGrade] = useState(0);
  const [name, setName] = useState("");
  const [reasoning, setReasoning] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(grade, name, reasoning);
  };

  return (
    <div>
      <h2>Rate</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Grade (0-10):
          <input
            type="number"
            min="0"
            max="10"
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            maxLength="100"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Reasoning:
          <textarea
            maxLength="1000"
            value={reasoning}
            onChange={(event) => setReasoning(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/rate" component={Rate} />
    </Router>
  );
}

export default App;
