const API_URL =
  "https://manit-tube.onrender.com/api/v1";

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

export async function loginUser(
  email,
  password
) {
  const response =
    await fetch(
      `${API_URL}/users/login`,
      {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

  let data = null;

  try {
    data =
      await response.json();
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
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

export async function registerUser(
  formData
) {
  const response =
    await fetch(
      `${API_URL}/users/register`,
      {
        method: "POST",

        credentials: "include",

        body: formData,
      }
    );

  let data = null;

  try {
    data =
      await response.json();
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
|--------------------------------------------------------------------------
| Get Current Logged-in User
|--------------------------------------------------------------------------
*/

export async function getCurrentUser() {
  const response =
    await fetch(
      `${API_URL}/users/me`,
      {
        method: "GET",

        credentials: "include",

        headers: {
          Accept:
            "application/json",
        },
      }
    );

  let data = null;

  try {
    data =
      await response.json();
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
|--------------------------------------------------------------------------
| Logout User
|--------------------------------------------------------------------------
*/

export async function logoutUser() {
  const response =
    await fetch(
      `${API_URL}/users/logout`,
      {
        method: "POST",

        credentials: "include",

        headers: {
          Accept:
            "application/json",
        },
      }
    );

  let data = null;

  try {
    data =
      await response.json();
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