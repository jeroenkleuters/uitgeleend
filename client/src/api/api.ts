// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = import.meta.env.VITE_API_URL

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

export const getItems = async () => {
  const res = await fetch(`${BASE_URL}/items`);
  return res.json();
};

export const createItem = async (name: string, description: string) => {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });
  return res.json();
};

export const createUser = async (name: string, email: string) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  return res.json();
};

export const borrowItem = async (itemId: string, userId: string) => {
  const res = await fetch(`${BASE_URL}/items/borrow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, userId }),
  });
  return res.json();
};

export const returnItem = async (itemId: string) => {
  const res = await fetch(`${BASE_URL}/items/return`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId }),
  });
  return res.json();
};
