const HISTORY_KEY = "manit_tube_watch_history";

export function getWatchHistory() {
  try {
    const stored = localStorage.getItem(
      HISTORY_KEY
    );

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch (error) {
    console.error(
      "Failed to read watch history:",
      error
    );

    return [];
  }
}

export function addToWatchHistory(video) {
  if (!video?._id) {
    return;
  }

  try {
    const currentHistory =
      getWatchHistory();

    const videoId = video._id.toString();

    const historyWithoutVideo =
      currentHistory.filter(
        (item) =>
          item.videoId !== videoId
      );

    const historyItem = {
      videoId,

      title:
        video.title ||
        "Untitled video",

      thumbnail:
        video.thumbnail || "",

      videoFile:
        video.videoFile || "",

      description:
        video.description || "",

      views:
        Number(video.views) || 0,

      likes:
        Number(video.likes) || 0,

      createdAt:
        video.createdAt ||
        new Date().toISOString(),

      owner: video.owner
        ? {
            _id: video.owner._id,
            username:
              video.owner.username ||
              "",
            fullName:
              video.owner.fullName ||
              "",
            avatar:
              video.owner.avatar ||
              "",
          }
        : null,

      watchedAt:
        new Date().toISOString(),
    };

    const updatedHistory = [
      historyItem,
      ...historyWithoutVideo,
    ].slice(0, 50);

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );

    window.dispatchEvent(
      new Event("watch-history-updated")
    );
  } catch (error) {
    console.error(
      "Failed to save watch history:",
      error
    );
  }
}

export function removeFromWatchHistory(
  videoId
) {
  try {
    const updatedHistory =
      getWatchHistory().filter(
        (item) =>
          item.videoId !==
          videoId.toString()
      );

    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(updatedHistory)
    );

    window.dispatchEvent(
      new Event("watch-history-updated")
    );
  } catch (error) {
    console.error(
      "Failed to remove history item:",
      error
    );
  }
}

export function clearWatchHistory() {
  try {
    localStorage.removeItem(
      HISTORY_KEY
    );

    window.dispatchEvent(
      new Event("watch-history-updated")
    );
  } catch (error) {
    console.error(
      "Failed to clear watch history:",
      error
    );
  }
}