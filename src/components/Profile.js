import React from 'react';
import { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import Navbar from './Navbar';
import FriendsList from './Friendlist';
import firebase from 'firebase';
import { useAuth } from '../contexts/AuthContext.js';
import { useEffect } from 'react';
import app from '../firebase';
function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [aboutMe1, setAboutMe1] = useState('');
  const [interests, setInterests] = useState('');
  const [formError, setFormError] = useState('');
  const [aboutMe, setAboutMe] = useState([]);
  const { currentUser } = useAuth();
  const [lastLogin, setLastLogin] = useState(null);

  // Simulating a login event
  const handleLogin = () => {
    const now = new Date();
    setLastLogin(now);
  };
  function Form() {
    return (
      <div>
      <form onSubmit={handleAddAboutMe}>
      <label>
        First Name:
        <input
          type="text"
          id="first-name-input"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          id="last-name-input"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </label>
      <br />
      <label>
        About Me:
        <textarea
          value={aboutMe1}
          id="about-input"
          onChange={(event) => setAboutMe1(event.target.value)}
        />
      </label>
      <br />
      <label>
        Interests:
        <input
          type="text"
          value={interests}
          id="interest-input"
          onChange={(event) => setInterests(event.target.value)}
        />
      </label>
      <br />
      {formError && <div style={{ color: 'red' }}>{formError}</div>}
      <button type="submit">UPDATE</button>
    </form>
      </div>
    );
  }
  useEffect(() => {
   // const currentUser = firebase.auth().currentUser;
    const userId = app.auth().currentUser.uid;//const LoginDate = new Date();
    //const currentUserRef = db.collection('users').doc(currentUser.uid);
    //const AboutRef = db.collection('users').doc(userId);
    const userRef = firebase.firestore().collection('users').doc(userId);

    userRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setAboutMe(data);
      } else {
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }, []);
  const handleAddAboutMe = (e) => {
    //e.preventDefault();

    // Check if any field is empty
    if (!firstName || !lastName || !aboutMe || !interests) {
      setFormError('Please fill in all fields.');
      return;
    }

    const db = firebase.firestore();
    const currentUserRef = db.collection('users').doc(currentUser.uid);
    currentUserRef.set({
        First: firstName,
        Last: lastName,
        email: currentUser.email,
        loginDate: new Date(),
        Aboutme: aboutMe1,
        Interests: interests
    })
      .then(() => {
        console.log('About me  added successfully!');
      })
      .catch((error) => {
        console.error('Error adding About me:', error);
      });
  };
  // Generate random heatmap data
  const generateHeatmapData = () => {
    const today = new Date();
    const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    const data = [];

    for (let date = yearAgo; date <= today; date.setDate(date.getDate() + 1)) {
      const count = Math.floor(Math.random() * 4);
      data.push({
        date: new Date(date.getTime()),
        count,
      });
    }

    return data;
  };
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const heatmapData = generateHeatmapData();

  // Calculate number of empty days
  const emptyDays = heatmapData.filter((data) => data.count === 0).length;

  return (
    <div className="container">
      <Navbar/>
      <div className="profile">
        <img
          className="avatar"
          src="https://avatars.githubusercontent.com/u/14101776?v=4"
          alt="avatar"
        />
        <div>
          <h1 className="username">
            {aboutMe.First} {aboutMe.Last}
          </h1>
        </div>

      </div>

      <div className="about-me">
        <h2 className="section-title">About Me</h2>
        <p>
        {aboutMe.Aboutme}
        <h2 className="section-title">Interests</h2>
        {aboutMe.Interests}
        <div>
      <button onClick={toggleForm}>Edit Details</button>
      {showForm && <Form />}
    </div>
          
        </p>
      </div>

      <div className="heatmap-container">
        <h2 className="section-title">Daily Login Heatmap</h2>
        {lastLogin && (
          <div className="heatmap-info">
            <p>Last login: {lastLogin.toDateString()}</p>
            <p>Empty days: {emptyDays}</p>
          </div>
        )}
        <CalendarHeatmap
          startDate={new Date('2022-04-01')}
          endDate={new Date('2023-04-01')}
          values={heatmapData}
          showWeekdayLabels={true}
          weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          onClick={handleLogin}
        />
      </div>
      <FriendsList/>
    </div>
  );
}

export default Profile;
