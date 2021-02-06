import * as React from 'react';
import { Socket } from './Socket';

export function UsersBox(props) {
  const [loggedUser, setLoggedUser] = React.useState(props.currName);
  const [userCount, setUserCount] = React.useState(props.userCount);

  function listenForUserInfo() {
    React.useEffect(() => {
      Socket.on('account - Update User Info', (data) => {
        setUserCount(data.count);
      });
    });
  }

  listenForUserInfo();

  return (
    <div id="UsersBox">
      <p>
        You are logged in as
        <i><b>{loggedUser}</b></i>
      </p>
      <p>
        # of Users Online:
        <b>{userCount}</b>
      </p>
    </div>
  );
}
