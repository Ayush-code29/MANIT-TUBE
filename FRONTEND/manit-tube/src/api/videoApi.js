const API_URL =
  "https://manit-tube.onrender.com/api/v1";

/*
|--------------------------------------------------------------------------
| HELPER
|--------------------------------------------------------------------------
*/

async function apiRequest(
  url,
  options = {}
) {
  const response = await fetch(url, {
    credentials: "include",
    ...options,
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Something went wrong"
    );
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| VIDEOS
|--------------------------------------------------------------------------
*/

export async function getVideos() {
  return apiRequest(
    `${API_URL}/videos`
  );
}

export async function getVideoById(videoId) {
  return apiRequest(
    `${API_URL}/videos/${videoId}`
  );
}

export async function uploadVideo(formData) {
  return apiRequest(
    `${API_URL}/videos`,
    {
      method: "POST",
      body: formData,
    }
  );
}

/*
|--------------------------------------------------------------------------
| LIKES
|--------------------------------------------------------------------------
*/

export async function getLikeStatus(
  videoId
) {
  return apiRequest(
    `${API_URL}/likes/${videoId}`
  );
}

export async function likeVideo(videoId) {
  return apiRequest(
    `${API_URL}/likes/${videoId}`,
    {
      method: "POST",
    }
  );
}

export async function unlikeVideo(videoId) {
  return apiRequest(
    `${API_URL}/likes/${videoId}`,
    {
      method: "DELETE",
    }
  );
}

/*
|--------------------------------------------------------------------------
| COMMENTS
|--------------------------------------------------------------------------
*/

export async function getComments(videoId) {
  return apiRequest(
    `${API_URL}/comments/${videoId}`
  );
}

export async function addComment(
  videoId,
  content
) {
  return apiRequest(
    `${API_URL}/comments/${videoId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    }
  );
}

export async function deleteComment(
  commentId
) {
  return apiRequest(
    `${API_URL}/comments/${commentId}`,
    {
      method: "DELETE",
    }
  );
}

/*
|--------------------------------------------------------------------------
| SAVED VIDEOS
|--------------------------------------------------------------------------
*/

export async function getSaveStatus(
  videoId
) {
  return apiRequest(
    `${API_URL}/saves/${videoId}`
  );
}

export async function saveVideo(videoId) {
  return apiRequest(
    `${API_URL}/saves/${videoId}`,
    {
      method: "POST",
    }
  );
}

export async function unsaveVideo(videoId) {
  return apiRequest(
    `${API_URL}/saves/${videoId}`,
    {
      method: "DELETE",
    }
  );
}

export async function getSavedVideos() {
  return apiRequest(
    `${API_URL}/saves`
  );
}

/*
|--------------------------------------------------------------------------
| SUBSCRIPTIONS
|--------------------------------------------------------------------------
*/

export async function getSubscriptionStatus(
  channelId
) {
  return apiRequest(
    `${API_URL}/subscriptions/${channelId}`
  );
}

export async function subscribeChannel(
  channelId
) {
  return apiRequest(
    `${API_URL}/subscriptions/${channelId}`,
    {
      method: "POST",
    }
  );
}

export async function unsubscribeChannel(
  channelId
) {
  return apiRequest(
    `${API_URL}/subscriptions/${channelId}`,
    {
      method: "DELETE",
    }
  );
}