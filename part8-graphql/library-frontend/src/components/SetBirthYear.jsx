/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";
import {
  EDIT_AUTHOR,
  ALL_AUTHORS,
 } from "../queries";

const SetBirthYear = ({ authors }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          options={authors.map((a) => ({ value: a.name, label: a.name }))}
          onChange={({ value }) => setName(value)}
        />
        <div>
          born <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear;