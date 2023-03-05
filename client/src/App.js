import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';


const Home = () => {
  const [appReviewList, setAppReviewList] = useState([])

  useEffect(() => {
    Axios.get('/api/get').then((response) => {
      setAppReviewList(response.data)
    })
  }, [])

  return (
    <div className="PageHome">
      <div className="TopBar">
        <h2 className="Title">Bienvenue</h2>
        <Link to="/Settings"><button className="btnAbout">Settings</button></Link>
        <br />
        <Link to="/Rate"><button className="btnRate">Review</button></Link>
      </div>
      <div className="Reste">
        <h3 className="NotesTitle">Website Reviews ({appReviewList.length}): </h3>
        <div className="ReviewContainer">
          {appReviewList.map((val) => {
            return (
              <div className="ReviewCard">
                <Card sx={{ bgcolor: 'transparent' }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {val.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {val.grade}/10
                    </Typography>
                    <Typography variant="body2">
                      {val.commentaire}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

const Settings = () => {
  const [Localchecked, setLocalChecked] = React.useState(false);
  const [Cookiechecked, setCookieChecked] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem('LocalStorage') == 'false') {
      setLocalChecked(false)
    }
    if (localStorage.getItem('LocalStorage') == 'true') {
      setLocalChecked(true)
    }
    var cookie = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }),{});
    if (cookie.Cookie == 'false') {
      setCookieChecked(false)
    }
    if (cookie.Cookie == 'true') {
      setCookieChecked(true)
    }
  }, [])

  const handleChange = (event) => {
    setLocalChecked(event.target.checked)
    localStorage.setItem('LocalStorage', document.getElementById('LocalSwitch').checked)
  }
  const handleChangeCookie = (event) => {
    setCookieChecked(event.target.checked)
    document.cookie = 'Cookie=' + document.getElementById('CookieSwitch').checked
  }

// tesr

  return (
    <div className="AboutPage">
      <div className="TopBar">
        <h2 className="Title">Settings</h2>
        <Link to="/"> 
          <button className="btnHome">
            Home
          </button>
        </Link>
      </div>
      <div className="ResteSettings">
        <div className="TitreSwitch">LocalStorage Tester:</div>
        <Switch id="LocalSwitch" className="DumSwitch" onChange={handleChange} checked={Localchecked}/>
        <div className="TitreSwitch">Cookie Tester:</div>
        <Switch id="CookieSwitch" className="DumSwitch" onChange={handleChangeCookie} checked={Cookiechecked}/>
      </div>
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
    Axios.post('/api/insert', {
      InputGrade: grade,
      InputName: name,
      InputComment: reasoning
    })
    setGrade(10)
    setName('')
    setReasoning('')
  };



  return (
    <div className="Page">
      <div className="TopBar">
        <Link to="/">
          <button className="btnHome">Home</button>
        </Link>

        <h2 className="Title">Revue</h2>
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
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Rate" element={<Rate />} />
    </Routes>
  );
}

export { App };
