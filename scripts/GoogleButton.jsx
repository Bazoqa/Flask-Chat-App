import * as React from 'react';
import GoogleLogin from 'react-google-login';
import { Socket } from './Socket';

export function GoogleButton(props) {
  const responseGoogle = (response) => {
    console.log(response);
  };

  function handleLogin(event) {
    const response = event.profileObj;
    console.log(response);
    props.changeLoginStatus(0);
    Socket.emit('account - Request Username', {
      status: 0,
      username: response.email,
      imageUrl: response.imageUrl,
    });
  }

  return (
    <GoogleLogin
      clientId="911816043725-jp8qab20tc9el9rt0ludmicir1ssqopt.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={handleLogin}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
}
