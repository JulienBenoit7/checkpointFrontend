import React from "react";
import Link from "next/link";
import { CountryListProps } from "@/types";

const CountryList = ({ countries }: CountryListProps) => (
  <div className="country-list">
    {countries.map((country) => (
      <div key={country.code} className="country-card">
        <Link href={`/country/${country.code}`}>
          <div className="country-content">
            <span className="country-name">{country.name}</span>
            <span className="country-emoji">{country.emoji}</span>
          </div>
        </Link>
      </div>
    ))}
  </div>
);

export default CountryList;
