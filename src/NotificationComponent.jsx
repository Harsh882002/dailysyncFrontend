import io from 'socket.io-client';

const socket = io("http://localhost:3000");

import React, { useEffect, useState } from 'react'

const NotificationComponent = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    //Listen for incomming notifications from server
    socket.on('notification', (data) => {
      setNotifications((prevNotification) => [...prevNotification, data]);
    })

    return () => {
      socket.off('notification');
    };
  }, [])


  //function to register the user and store socket ID in the backnd
  useEffect(() =>{
    const userId = 1;
    socket.emit('register',userId);
  })
  return (
    <div>
<h1>Notifications</h1>
<div>
  {
    notifications.length === 0 ?(
      <p>NO new Notifications</p>
    ):(
      <ul>
        {
          notifications.map((notif,index) =>(
            <li>
              <strong>{notif.title}</strong>:{notif.message}
            </li>
          ))
        }
      </ul>
    )
  }
</div>
    </div>
  )
}

export default NotificationComponent;
