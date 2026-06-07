const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function api(endpoint, options = {}) {
  const res = await fetch(`${backendUrl}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

