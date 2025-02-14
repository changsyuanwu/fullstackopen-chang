import {
  useApolloClient,
  useQuery,
  useSubscription,
} from "@apollo/client";
import {
  useState,
  useEffect,
 } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import {
  ALL_PERSONS,
  PERSON_ADDED
} from "./queries";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";
import { updateCache } from "./utils";

// eslint-disable-next-line react/prop-types
const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  useEffect(() => {
    const userToken = window.localStorage.getItem("phonebook-user-token");
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  useSubscription(PERSON_ADDED, {
    onData: ({ data, client }) => {
      const addedPerson = data.data.personAdded;
      notify(`${addedPerson.name} added`);
      updateCache(
        client.cache,
        { query: ALL_PERSONS },
        addedPerson,
      )
    }
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
