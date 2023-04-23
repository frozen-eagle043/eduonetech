import React, { useState, useEffect } from "react";
//import firebase from "firebase/app";
import "firebase/firestore";

import app from "../firebase";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  
  useEffect(() => {
    const results = [];
   // const currentUser = firebase.auth().currentUser;
    const userId = app.auth().currentUser.uid;//const LoginDate = new Date();
    const db = app.firestore()
    //const currentUserRef = db.collection('users').doc(currentUser.uid);
    const friendRef = db.collection('users').doc(userId).collection("friends");
    //const friendsRef = firebase.firestore().collection("friends");

    // Query all friends for the logged-in user
    const query = friendRef
    query.get().then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
          console.log(results)
        });
  
        setFriends(results);
      })
      .catch((error) => {
        console.error('Error searching for users:', error);
      });


  }, []);

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <span>{friend.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
