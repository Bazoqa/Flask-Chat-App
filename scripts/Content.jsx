import * as React from 'react';
import { Socket } from './Socket';

import { LoginForm } from './LoginForm';
import { MessagesBox } from './MessagesBox';
import { ChatForm } from './ChatForm';
import { UsersBox } from './UsersBox';

export function Content() {
  const [loggedUser, setLoggedUser] = React.useState('');
  const [loginStatus, setloginStatus] = React.useState(-1);
  const [userCount, setUserCount] = React.useState(0);

  function updateLoginStatus(newStatus) {
    setloginStatus(newStatus);
  }

  function getLoggedUser(newStatus) {
    return loggedUser;
  }

  function changeLoginNotes(text) {
    const loginNotes = document.getElementById('login_notes');
    loginNotes.innerHTML = text;
  }

  function checkLoginStatus() {
    React.useEffect(() => {
      Socket.on('account - Request Username Response', (data) => {
        if (loginStatus == 0) {
          if (data.status == 1) {
            setLoggedUser(data.username);
            setloginStatus(1);
          }
          if (data.status == 2) {
            changeLoginNotes('Username already taken or is invalid');
          }
          if (data.status == 3) {
            changeLoginNotes('Username is too long (limited to 16 characters)');
          }
        }
      });
      Socket.on('account - Query Online Users', (data) => {
        Socket.emit('account - Query Online Users Response', {
          username: loggedUser,
        });
      });
    });
  }

  checkLoginStatus();

  // Change Rendering Based on Login Status -1=login page, 0=awaiting username confirmation, 1=logged in
  if (loginStatus < 1) {
    return (
      <div>
        <LoginForm changeLoginStatus={updateLoginStatus} />
      </div>
    );
  }

  return (
    <div>
      <UsersBox currName={loggedUser} userCount={userCount} />
      <MessagesBox />
      <ChatForm currName={loggedUser} getlog={getLoggedUser()} />
    </div>
  );
}
