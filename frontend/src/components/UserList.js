import React, { useState, useEffect } from "react";
import { fetch } from "../store/csrf.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

async function getAllUsers() {
  const res = await fetch("/api/users/all");
  const allUsers = res.data;
  console.log(allUsers);
  return allUsers;
}

async function createChatRoom(sessionUser, user) {
  const res = await fetch(
    `/api/chatroom/add?sessionUserId=${sessionUser.id}&&otherUserId=${user.id}&&sessionUsername=${sessionUser.username}&&otherUsername=${user.username}`
  );
  console.log(res);
  return res;
}

function UserList() {
  const sessionUser = useSelector((state) => state.session.user);
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    setUsers(await getAllUsers());
  }, []);

  return (
    <ul>
      {users[0] &&
        sessionUser &&
        users.map((user) => {
          return (
            <Link
              key={user.id}
              onClick={async (e) => {
                const res = await createChatRoom(sessionUser, user);
              }}
              to="/"
            >
              <li>{user.username}</li>
            </Link>
          );
        })}
    </ul>
  );
}

export default UserList;