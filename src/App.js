import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

const { Prohairesis } = require('prohairesis');
const env = require('./env');

const database = new Prohairesis(env.CLEARDB_DATABASE_URL);


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
  const [grade, setGrade] = useState(10);
  const [name, setName] = useState("");
  const [reasoning, setReasoning] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      return alert("Name field cannot be empty");
    }
    console.log(grade, name, reasoning);
    database.query(`
      INSERT INTO ratings(create_time,grade,name,commentaire) VALUES(
        NOW(),
        ${grade},
        ${name},
        ${reasoning});
    `)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      })
  };



  return (
    <div className="Page">
      <div className="TopBar">
        <Link to="/">
          <button className="btnHome">Home</button>
        </Link>

        <h2 className="PageTitle">Rate</h2>
      </div>

      <div className="FormBox">
        <form onSubmit={handleSubmit}>
          <label>
            <label className="ReqFieldLabel">*: Champ obligatoire</label>
            Grade (0-10)*:
            <br />
            <input
              className="inputGrade"
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
            Name*:
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
            Comment:
            <br />
            <textarea
              maxLength="1000"
              value={reasoning}
              onChange={(event) => setReasoning(event.target.value)}
            />
          </label>
          <br />
          <br />
          <div className="btnSubmit">
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
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/rate" element={<Rate />} />
    </Routes>
  );
}

export { App };
