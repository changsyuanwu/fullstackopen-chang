const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className={message.status}>{message.message}</div>;
};

export default Notification;