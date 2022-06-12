import React from "react";

export default function userInfo({ data }) {
  return (
    <>
      <p>Ime: {data.firstName}</p>
      <p>Prezime: {data.firstName}</p>
      <p>Email: {data.email}</p>
      <p>id: {data.id}</p>
      <p>Roles: {data.roles.map((role, key) => role.roleName)}</p>
    </>
  );
}
