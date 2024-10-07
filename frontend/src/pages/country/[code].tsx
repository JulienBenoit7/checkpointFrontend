import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "@/graphql/queries";

const CountryDetail = () => {
  const router = useRouter();
  const { code } = router.query;

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { name, emoji, continent } = data.country;

  return (
    <div>
      <h1>
        {name} {emoji}
      </h1>
      <p>Code: {code}</p>
      {continent && <p>Continent: {continent.name}</p>}
    </div>
  );
};

export default CountryDetail;
