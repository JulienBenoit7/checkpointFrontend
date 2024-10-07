import React from "react";
import { useQuery } from "@apollo/client";
import CountryList from "../components/CountryList";
import Header from "../components/Header";
import { GET_COUNTRIES } from "@/graphql/queries";
import AddCountry from "@/components/AddCountry";

const Home = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Header />
      <AddCountry />
      <CountryList countries={data.countries} />
    </div>
  );
};

export default Home;
