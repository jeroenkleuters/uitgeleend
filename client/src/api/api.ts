// client/src/api/api.ts
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

async function handleRes(res: Response) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${text}`);
  }
  return res.json().catch(() => ({}));
}

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return handleRes(res);
};

export const getUserById = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  return handleRes(res);
};

export const createUser = async (name: string, email: string) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  return handleRes(res);
};

export const getItems = async () => {
  const res = await fetch(`${BASE_URL}/items`);
  return handleRes(res);
};

/**
 * createItem payload: { title, description?, type, borrowedBy? }
 * borrowedBy is optional (userId) — backend zal borrowedAt vullen als borrowedBy is gegeven
 */
export const createItem = async (item: {
  title: string;
  description?: string;
  type: string;
  borrowedBy?: string | null;
}) => {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return res.json();
};

/**
 * Borrow / Return use route with item id:
 * POST /api/items/:id/borrow  body: { userId }
 * POST /api/items/:id/return  (no body required)
 */
export const borrowItem = async (itemId: string, userId: string) => {
  const res = await fetch(`${BASE_URL}/items/${itemId}/borrow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return handleRes(res);
};

export const returnItem = async (itemId: string) => {
  const res = await fetch(`${BASE_URL}/items/${itemId}/return`, {
    method: "POST",
  });
  return handleRes(res);
};
