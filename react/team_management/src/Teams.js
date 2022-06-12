import React from "react";

export default function Teams({ data }) {
  return data.teamUser.length > 0 ? (
    data.teamUser.map((team, key) => <p>{team.name}</p>)
  ) : (
    <h1>Niste ni u jednom timu</h1>
  );
}
