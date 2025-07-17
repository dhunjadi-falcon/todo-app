const ToDo = () => {
  const userName = localStorage.getItem("loggedUserName");

  return (
    <div>
      <h2>Welcome {userName}!</h2>
    </div>
  );
};

export default ToDo;
