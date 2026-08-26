const API_URL = "http://localhost:8000/api/v1";

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        "Something went wrong"
    );
  }

  return data;
}

/* =========================================================
   VIDEOS
========================================================= */

export const getVideos = async (
  page = 1,
  limit = 12
) => {
  const response = await fetch(
    `${API_URL}/videos?page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return parseResponse(response);
};

export const getVideoById = async (videoId) => {
  const response = await fetch(
    `${API_URL}/videos/${videoId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return parseResponse(response);
};

export const uploadVideo = async ({
  title,
  description,
  duration,
  videoFile,
  thumbnail,
}) => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("duration", duration);
  formData.append("videoFile", videoFile);
  formData.append("thumbnail", thumbnail);

  const response = await fetch(
    `${API_URL}/videos/upload`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  return parseResponse(response);
};

/* =========================================================
   LIKES
========================================================= */

export const likeVideo = async (videoId) => {
  const response = await fetch(
    `${API_URL}/likes/${videoId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return parseResponse(response);
};

export const unlikeVideo = async (videoId) => {
  const response = await fetch(
    `${API_URL}/likes/${videoId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return parseResponse(response);
};

export const getLikeStatus = async (videoId) => {
  const response = await fetch(
    `${API_URL}/likes/${videoId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return parseResponse(response);
};

/*
  Alias kept intentionally so older components
  using getVideoLikeStatus don't break.
*/
export const getVideoLikeStatus = async (
  videoId
) => {
  return getLikeStatus(videoId);
};

/* =========================================================
   COMMENTS
========================================================= */

export const getComments = async (videoId) => {
  const response = await fetch(
    `${API_URL}/comments/${videoId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return parseResponse(response);
};

export const addComment = async (
  videoId,
  content
) => {
  const response = await fetch(
    `${API_URL}/comments/${videoId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    }
  );

  return parseResponse(response);
};

export const deleteComment = async (
  commentId
) => {
  const response = await fetch(
    `${API_URL}/comments/${commentId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return parseResponse(response);
};

/* =========================================================
   SAVED VIDEOS
========================================================= */

export const saveVideo = async (videoId) => {
  const response = await fetch(
    `${API_URL}/saves/${videoId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return parseResponse(response);
};

export const unsaveVideo = async (videoId) => {
  const response = await fetch(
    `${API_URL}/saves/${videoId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return parseResponse(response);
};

export const getSaveStatus = async (videoId) => {
  const response = await fetch(
    `${API_URL}/saves/${videoId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return parseResponse(response);
};

/*
  IMPORTANT:
  This is the missing export causing your
  current error.
*/
export const getSavedVideos = async () => {
  const response = await fetch(
    `${API_URL}/saves`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return parseResponse(response);
};

/*
  Alias for components that may use a different name.
*/
export const getSavedVideoStatus = async (
  videoId
) => {
  return getSaveStatus(videoId);
};

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default {
  getVideos,
  getVideoById,
  uploadVideo,

  likeVideo,
  unlikeVideo,
  getLikeStatus,
  getVideoLikeStatus,

  getComments,
  addComment,
  deleteComment,

  saveVideo,
  unsaveVideo,
  getSaveStatus,
  getSavedVideos,
  getSavedVideoStatus,
};