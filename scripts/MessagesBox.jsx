import * as React from 'react';
import { Socket } from './Socket';

export function MessagesBox() {
  const [messages, setMessages] = React.useState([]);

  function listenForMessages() {
    React.useEffect(() => {
      Socket.on('chat - Update Messages', (data) => {
        setMessages(data.allMessages);
      });
    });
  }

  listenForMessages();

  return (
    <div id="MessageBoxContainer">
      <div id="MessagesBox">
        <ul>
          {messages.map((message, index) => {
            if (message.username == 'butler-bot') {
              return (
                <div className="message_div">
                  <img className="message_avatar" src={message.imageUrl} alt="username_image_url" width="50" height="50" />
                  <p className="message_content" id="bot" key={index}>
                    {message.timestamp}
                    {' '}
                    &lt;
                    {message.username}
                    &gt;
                    {' '}
                    {message.messageText}
                  </p>
                </div>
              );
            }

            if (message.messageType == 1) {
              return (
                <div className="message_div">
                  <img className="message_avatar" src={message.imageUrl} alt="username_image_url" width="50" height="50" />
                  <p className="message_content" key={index}>
                    {message.timestamp}
                    {' '}
                    &lt;
                    {message.username}
                    &gt;
                    {' '}
                    {message.messageText}
                  </p>
                </div>
              );
            }
            if (message.messageType == 2) {
              return (
                <div className="message_div">
                  <img className="message_avatar" src={message.imageUrl} alt="username_image_url" width="50" height="50" />
                  <p className="message_content" key={index}>
                    {message.timestamp}
                    {' '}
                    &lt;
                    {message.username}
                    &gt;&nbsp;
                  </p>
                  <img className="message_image" src={message.messageText} alt="Image Name" width="50" height="50" />
                </div>
              );
            }
            if (message.messageType == 3) {
              console.log('DETECTED URL MESSAGE');
              return (
                <div className="message_div">
                  <img className="message_avatar" src={message.imageUrl} alt="username_image_url" width="50" height="50" />
                  <p className="message_content" key={index}>
                    {message.timestamp}
                    {' '}
                    &lt;
                    {message.username}
                    &gt;&nbsp;
                  </p>
                  <a className="message_link" key={index} href={message.messageText}>{message.messageText}</a>
                </div>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
