import React, { useState, useEffect } from 'react';

const PushNotification = () => {
  useEffect(() => {
    const showNotification = () => {
      if (Notification.permission === 'granted') {
        // Create a new notification
        const notification = new Notification('Hello!', {
          body: 'This is a push notification!',
        });
      }
    };

    const requestPermission = () => {
      // Request permission to display notifications
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            // Permission granted, show the notification
            showNotification();
          }
        });
      } else {
        // Permission already granted, show the notification
        showNotification();
      }
    };

    // Set the specific time to show the notification (e.g., 10 seconds from now)
    const notificationTime = new Date().getTime() + 5000;

    // Calculate the delay until the specific time
    const delay = notificationTime - new Date().getTime();

    // Schedule the notification
    const timeout = setTimeout(requestPermission, delay);

    return () => {
      // Clear the timeout on component unmount
      clearTimeout(timeout);
    };
  }, []);

  return <div>Push Notification Example</div>;
};


const App = () => {
  return (
    <div>
      <h1>My App</h1>
      <PushNotification />
    </div>
  );
};

export default App;