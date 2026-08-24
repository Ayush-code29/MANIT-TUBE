const API_URL = "http://localhost:8000/api/v1";

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data?.message || "Something went wrong"
    );
  }

  return data;
}

export const registerUser = async ({
  username,
  email,
  fullName,
  password,
  avatar,
}) => {
  const formData = new FormData();

  formData.append("username", username);
  formData.append("email", email);
  formData.append("fullName", fullName);
  formData.append("password", password);
  formData.append("avatar", avatar);

  const response = await fetch(
    `${API_URL}/users/register`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  return parseResponse(response);
};

export const loginUser = async (email, password) => {
  const response = await fetch(
    `${API_URL}/users/login`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return parseResponse(response);
};

export const getCurrentUser = async () => {
  const response = await fetch(
    `${API_URL}/users/current-user`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return parseResponse(response);
};

export const logoutUser = async () => {
  const response = await fetch(
    `${API_URL}/users/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  return parseResponse(response);
};