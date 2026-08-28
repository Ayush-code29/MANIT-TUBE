const API_URL =
  "http://localhost:8000/api/v1";

/*
 * Login user
 */
export async function loginUser(
  email,
  password
) {
  const response = await fetch(
    `${API_URL}/users/login`,
    {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type":
          "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        "Unable to login."
    );
  }

  return data;
}

/*
 * Register user
 */
export async function registerUser(
  formData
) {
  const response = await fetch(
    `${API_URL}/users/register`,
    {
      method: "POST",

      credentials: "include",

      body: formData,
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        "Unable to register."
    );
  }

  return data;
}

/*
 * Get current logged-in user
 */
export async function getCurrentUser() {
  const response = await fetch(
    `${API_URL}/users/me`,
    {
      method: "GET",

      credentials: "include",

      headers: {
        Accept: "application/json",
      },
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to fetch current user."
    );
  }

  return data;
}

/*
 * Logout user
 */
export async function logoutUser() {
  const response = await fetch(
    `${API_URL}/users/logout`,
    {
      method: "POST",

      credentials: "include",

      headers: {
        Accept: "application/json",
      },
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to logout."
    );
  }

  return data;
}