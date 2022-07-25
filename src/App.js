import React from 'react';
import { useState } from 'react';
import ConnectModal from './components/ConnectModal';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from './utils/firebase.config';
import CreatePost from './components/CreatePost';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Post from './components/Post';

const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  useEffect(() => {
    getDocs(collection(db, "posts"))
      .then((res) => setPosts(res.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id })
      )))
      .catch((err) => console.log(err));
  }, [])


  const handleLogout = async () => {
    await signOut(auth);
  }

  return (
    <div>

      <div className="app-header">

        {user ? (
          <div className='user_infos'>
            {/* Vérifie si user existe avant de donner son displayName */}
            <span>{user?.displayName[0]}</span>
            <h4>{user?.displayName}</h4>
            <button onClick={() => handleLogout()}><i className='fa-solid fa-arrow-right-from-bracket'></i></button>
          </div>
        ) :
          ("")}
        {user ? <CreatePost userId={user.uid} displayName={user.displayName} /> : <ConnectModal />}
      </div>
      <div className="posts-container">
        {posts.length > 0 ? posts
          .sort((a, b) => b.date - a.date)
          .map((post) => (
            <Post post={post} key={post.id} user={user} />
          )) : ""}
      </div>
    </div>
  );
};

export default App;