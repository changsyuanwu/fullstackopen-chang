import LoginForm from "./LoginForm";

const LoginPage = ({ username, password, handleLogin, setUsername, setPassword }) => {
  return (
    <div>
      <h1>Log in to Chang&apos;s bloglist app</h1>
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </div>
  );
};

export default LoginPage;