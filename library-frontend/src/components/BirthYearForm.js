import React, { useState } from "react";
import { EDIT_AUTHOR_BIRTH_YEAR } from "queries";
import { useMutation } from "@apollo/client";
import Select from "react-select";


const BirthYearForm = (props) => {
  const [name, setName] = useState("");
  const [bornYear, setBornYear] = useState("");
  const [changeBirthYear, result] = useMutation(EDIT_AUTHOR_BIRTH_YEAR);
  const [selectedOption, setSelectedOption] = useState(props.authors[0]);

  const submit = (e) => {
    e.preventDefault();

    changeBirthYear({
      variables: { name: selectedOption.value, born: parseInt(bornYear) },
    });
    setName("");
    setBornYear("");
  };
  return (
    <div>
      <h2>New Author</h2>
      <div
      style={{
        width: "30%"
      }}>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={props.authors}
        />
      </div>
      <form onSubmit={submit}>
        <div>
          born{" "}
          <input
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>
        <button type="submot">submit form</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
