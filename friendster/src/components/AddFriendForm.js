import React from "react";
import { useState } from "react";

const AddFriendForm = props => {
  const [friend, setFriend] = useState({
    name: "",
    bio: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    props.addFriend(friend);
    setFriend({ name: "", bio: "" });
  };

  const handleChange = e => {
    setFriend({
      ...friend,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        onChange={handleChange}
        name="name"
        value={friend.name}
      ></input>
      <label>Bio</label>
      <textarea
        type="text"
        onChange={handleChange}
        name="bio"
        value={friend.bio}
      ></textarea>
      <button>Submit</button>
    </form>
  );
};

export default AddFriendForm;
