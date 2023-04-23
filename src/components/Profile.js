import React from 'react';
import { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import Navbar from './Navbar';
function Profile() {
  const [lastLogin, setLastLogin] = useState(null);

  // Simulating a login event
  const handleLogin = () => {
    const now = new Date();
    setLastLogin(now);
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
          <h1 className="username">John Doe</h1>
          <p className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <ul className="stats">
            <li>
              <strong>100</strong>
              Followers
            </li>
            <li>
              <strong>200</strong>
              Following
            </li>
            <li>
              <strong>300</strong>
              Repos
            </li>
          </ul>
        </div>
      </div>

      <div className="about-me">
        <h2 className="section-title">About Me</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar euismod nisi, a
          sagittis eros imperdiet ut. Sed in elementum nulla. Curabitur pellentesque lorem ut
          eleifend tincidunt. Sed auctor nisl eu quam suscipit, vel hendrerit sapien fringilla.
          Proin iaculis tristique odio, eu imperdiet lorem. Vivamus quis sem vel sapien vehicula
          fringilla vitae a felis.
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
    </div>
  );
}

export default Profile;
