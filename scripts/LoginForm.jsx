import * as React from 'react';
import GoogleLogin from 'react-google-login';
import { Socket } from './Socket';

import { GoogleButton } from './GoogleButton';

export function LoginForm(props) {
  function handleLogin(event) {
    const loginUsername = document.getElementById('username_input');
    Socket.emit('account - Request Username', {
      status: 0,
      username: loginUsername.value,
    });

    props.changeLoginStatus(0);

    console.log(`Sending Username Request To Server (${loginUsername.value})`);
    loginUsername.value = '';
    event.preventDefault();
  }

  return (
    <div id="login_form_container">
      <div id="login_form">
        <h1>Chatroom Login</h1>
        <p id="login_notes">Hello! Please Sign in with Google to continue</p>
        <GoogleButton changeLoginStatus={props.changeLoginStatus} />
      </div>
    </div>
  );
}
