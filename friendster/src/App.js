import React from "react";
import "./App.css";
import axios from "axios";

import AddFriendForm from "./components/AddFriendForm.js";

function App() {
  const [friends, setFriends] = React.useState([]);

  const addFriend = friendInfo => {
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/api/users",
      data: friendInfo
    })
      .then(res => {
        fetchFriends();
      })
      .catch(err => console.log(err));
  };

  const handleDelete = e => {
    axios({
      method: "delete",
      url: "http://127.0.0.1:5000/api/users/:id",
      data: { id: e.target.id }
    })
      .then(res => fetchFriends())
      .catch(err => console.log(err));
  };

  const fetchFriends = () => {
    axios
      .get("http://127.0.0.1:5000/api/users")
      .then(users => {
        setFriends(users.data);
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="App">
      <p>Friend's Capacitator</p>
      <AddFriendForm addFriend={addFriend} />
      {friends.map(function(friend, index) {
        return (
          <div key={index}>
            <p>
              {friend.name}: {friend.bio}
            </p>
            <button id={friend.id} onClick={handleDelete}>
              Delete user
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
