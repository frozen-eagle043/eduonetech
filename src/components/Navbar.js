import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [theme, setTheme] = useState('light');
  const { currentUser } = useAuth();
  const history = useHistory();

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const db = firebase.firestore();
    const usersRef = db.collection('users');
    const query = usersRef.where('email', '==', searchText);
    query.get()
      .then((querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setSearchResults(results);
      })
      .catch((error) => {
        console.error('Error searching for users:', error);
      });
  };

  const handleAddFriend = (email,userId) => {
    const db = firebase.firestore();
    const currentUserRef = db.collection('users').doc(currentUser.uid);
    const friendRef = currentUserRef.collection('friends').doc(userId);
    friendRef.set({
        email: email
    })
      .then(() => {
        console.log('Friend added successfully!');
      })
      .catch((error) => {
        console.error('Error adding friend:', error);
      });
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
  };

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        history.push('/login');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <nav>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" placeholder="Search users by email" value={searchText} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h3>Search results:</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                {result.email} <button onClick={() => handleAddFriend(result.email,result.id)}>Add friend</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <label>
          <input type="checkbox" checked={theme === 'dark'} onChange={handleToggleTheme} /> Dark mode
        </label>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
