import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_COUNTRIES } from "@/graphql/queries";

const ADD_COUNTRY = gql`
  mutation AddCountry($code: String!, $name: String!, $emoji: String!) {
    addCountry(data: { code: $code, name: $name, emoji: $emoji }) {
      code
      name
      emoji
    }
  }
`;

const AddCountry = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");

  const [addCountry] = useMutation(ADD_COUNTRY, {
    update(cache, { data: { addCountry } }) {
      const { countries } = cache.readQuery({ query: GET_COUNTRIES }) || {
        countries: [],
      };
      cache.writeQuery({
        query: GET_COUNTRIES,
        data: { countries: [...countries, addCountry] },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCountry({ variables: { code, name, emoji } });
      setCode("");
      setName("");
      setEmoji("");
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Emoji"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        required
      />
      <button type="submit">Ajouter un pays</button>
    </form>
  );
};

export default AddCountry;
