import * as React from 'react';
import { Socket } from './Socket';

function handleSend(event, myUsername) {
  const chatText = document.getElementById('chat_input');
  console.log(`MY USERNAME IS ${myUsername}`);
  Socket.emit('chat - New Message', {
    username: myUsername,
    messageText: chatText.value,
    timestamp: 'N/A',
  });
  console.log(`Sending New Chat Message To Server (${chatText.value})`);
  chatText.value = '';
  event.preventDefault();
}

export function ChatForm(props) {
  const [loggedUser, setLoggedUser] = React.useState(props.currName);

  return (
    <form id="ChatForm" onSubmit={(event) => handleSend(event, loggedUser)}>
      <input id="chat_input" placeholder="Enter Message" />
      <button id="chat_send_button"> Send </button>
    </form>
  );
}
