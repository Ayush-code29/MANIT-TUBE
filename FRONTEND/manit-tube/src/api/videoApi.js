const API_URL = "http://localhost:8000/api/v1";

export const getVideos = async (page = 1, limit = 12) => {
  const response = await fetch(
    `${API_URL}/videos?page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch videos");
  }

  return data;
};

export const getVideoById = async (videoId) => {
  const response = await fetch(
    `${API_URL}/videos/${videoId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch video"
    );
  }

  return data;
};

export const uploadVideo = async (formData) => {
  const response = await fetch(
    `${API_URL}/videos/upload`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to upload video"
    );
  }

  return data;
};