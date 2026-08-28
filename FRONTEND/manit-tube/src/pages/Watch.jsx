import {
  useEffect,
  useState,
} from "react";

import {
  Bookmark,
  Loader2,
  MoreHorizontal,
  Send,
  Share2,
  ThumbsUp,
  Trash2,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  addComment,
  deleteComment,
  getComments,
  getLikeStatus,
  getSaveStatus,
  getVideoById,
  likeVideo,
  saveVideo,
  unlikeVideo,
  unsaveVideo,
} from "../api/videoApi";

import { useAuth } from "../context/AuthContext";

import { addToWatchHistory } from "../utils/history";

function formatViews(value) {
  const count = Number(value) || 0;

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(
      1
    )}M`;
  }

  if (count >= 1000) {
    return `${(count / 1000).toFixed(
      1
    )}K`;
  }

  return count.toString();
}

function formatRelativeTime(date) {
  if (!date) return "";

  const difference =
    new Date() - new Date(date);

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  const hours = Math.floor(
    difference /
      (1000 * 60 * 60)
  );

  const days = Math.floor(
    difference /
      (1000 * 60 * 60 * 24)
  );

  if (minutes < 1) {
    return "just now";
  }

  if (minutes < 60) {
    return `${minutes} min${
      minutes !== 1 ? "s" : ""
    } ago`;
  }

  if (hours < 24) {
    return `${hours} hour${
      hours !== 1 ? "s" : ""
    } ago`;
  }

  if (days < 7) {
    return `${days} day${
      days !== 1 ? "s" : ""
    } ago`;
  }

  const weeks = Math.floor(
    days / 7
  );

  return `${weeks} week${
    weeks !== 1 ? "s" : ""
  } ago`;
}

function LoadingWatch() {
  return (
    <div className="mx-auto max-w-[1400px] animate-pulse">
      <div className="aspect-video rounded-2xl bg-[#181C21]" />

      <div className="mt-6 h-7 w-3/4 rounded bg-[#181C21]" />

      <div className="mt-5 h-12 rounded bg-[#181C21]" />

      <div className="mt-5 h-32 rounded-2xl bg-[#111418]" />
    </div>
  );
}

function CommentItem({
  comment,
  onDelete,
}) {
  const user = comment.user;

  return (
    <div className="flex gap-3">
      <img
        src={
          user?.avatar ||
          "https://i.pravatar.cc/100?img=12"
        }
        alt=""
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold">
            {user?.fullName ||
              user?.username ||
              "MANIT Student"}
          </p>

          <span className="text-[11px] text-[#85867f]">
            {formatRelativeTime(
              comment.createdAt
            )}
          </span>
        </div>

        <p className="mt-1 text-sm leading-6 text-[#666762] dark:text-[#a1a29d]">
          {comment.content}
        </p>

        {comment.isOwner && (
          <button
            type="button"
            onClick={() =>
              onDelete(comment._id)
            }
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#85867f] transition hover:text-red-500"
          >
            <Trash2 size={13} />

            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default function Watch() {
  const { videoId } =
    useParams();

  const navigate =
    useNavigate();

  const {
    user,
    loading: authLoading,
  } = useAuth();

  const [video, setVideo] =
    useState(null);

  const [comments, setComments] =
    useState([]);

  const [liked, setLiked] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [
    commentsLoading,
    setCommentsLoading,
  ] = useState(true);

  const [
    actionLoading,
    setActionLoading,
  ] = useState(false);

  const [
    commentLoading,
    setCommentLoading,
  ] = useState(false);

  const [
    commentText,
    setCommentText,
  ] = useState("");

  const [error, setError] =
    useState("");

  /*
   * Load video
   */
  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getVideoById(videoId);

        const loadedVideo =
          data?.video;

        setVideo(
          loadedVideo || null
        );

        /*
         * Add video to history
         * after successfully loading it.
         */
        if (loadedVideo?._id) {
          addToWatchHistory(
            loadedVideo
          );
        }
      } catch (error) {
        console.error(
          "Video loading error:",
          error
        );

        setError(
          error.message ||
            "Unable to load this video."
        );
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      loadVideo();
    }
  }, [videoId]);

  /*
   * Load comments
   */
  useEffect(() => {
    const loadComments =
      async () => {
        try {
          setCommentsLoading(
            true
          );

          const data =
            await getComments(
              videoId
            );

          setComments(
            Array.isArray(
              data?.comments
            )
              ? data.comments
              : []
          );
        } catch (error) {
          console.error(
            "Comments error:",
            error
          );
        } finally {
          setCommentsLoading(
            false
          );
        }
      };

    if (videoId) {
      loadComments();
    }
  }, [videoId]);

  /*
   * Load like + save status
   */
  useEffect(() => {
    if (
      !videoId ||
      authLoading
    ) {
      return;
    }

    const loadStatuses =
      async () => {
        try {
          const likeData =
            await getLikeStatus(
              videoId
            );

          setLiked(
            Boolean(
              likeData?.liked ??
                likeData?.isLiked ??
                false
            )
          );

          if (
            typeof likeData?.likesCount ===
            "number"
          ) {
            setVideo((current) =>
              current
                ? {
                    ...current,
                    likes:
                      likeData.likesCount,
                  }
                : current
            );
          }

          if (user) {
            const saveData =
              await getSaveStatus(
                videoId
              );

            setSaved(
              Boolean(
                saveData?.isSaved ??
                  saveData?.saved ??
                  false
              )
            );
          } else {
            setSaved(false);
          }
        } catch (error) {
          console.error(
            "Status loading error:",
            error
          );
        }
      };

    loadStatuses();
  }, [
    videoId,
    user,
    authLoading,
  ]);

  /*
   * Login redirect
   */
  const requireLogin = () => {
    navigate(
      `/login?redirect=/watch/${videoId}`
    );
  };

  /*
   * Like / Unlike
   */
  const handleLike = async () => {
    if (!user) {
      requireLogin();
      return;
    }

    if (actionLoading) {
      return;
    }

    try {
      setActionLoading(true);

      if (liked) {
        const data =
          await unlikeVideo(
            videoId
          );

        setLiked(false);

        setVideo((current) =>
          current
            ? {
                ...current,
                likes:
                  typeof data?.likesCount ===
                  "number"
                    ? data.likesCount
                    : Math.max(
                        0,
                        (current.likes ||
                          0) - 1
                      ),
              }
            : current
        );
      } else {
        const data =
          await likeVideo(
            videoId
          );

        setLiked(true);

        setVideo((current) =>
          current
            ? {
                ...current,
                likes:
                  typeof data?.likesCount ===
                  "number"
                    ? data.likesCount
                    : (current.likes ||
                        0) + 1,
              }
            : current
        );
      }
    } catch (error) {
      console.error(
        "Like action error:",
        error
      );
    } finally {
      setActionLoading(false);
    }
  };

  /*
   * Save / Unsave
   */
  const handleSave = async () => {
    if (!user) {
      requireLogin();
      return;
    }

    if (actionLoading) {
      return;
    }

    try {
      setActionLoading(true);

      if (saved) {
        await unsaveVideo(
          videoId
        );

        setSaved(false);
      } else {
        await saveVideo(
          videoId
        );

        setSaved(true);
      }
    } catch (error) {
      console.error(
        "Save action error:",
        error
      );
    } finally {
      setActionLoading(false);
    }
  };

  /*
   * Add comment
   */
  const handleComment = async (
    event
  ) => {
    event.preventDefault();

    if (!user) {
      requireLogin();
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    try {
      setCommentLoading(
        true
      );

      const data =
        await addComment(
          videoId,
          commentText.trim()
        );

      if (data?.comment) {
        setComments((current) => [
          data.comment,
          ...current,
        ]);
      }

      setCommentText("");
    } catch (error) {
      console.error(
        "Comment error:",
        error
      );

      alert(
        error.message ||
          "Unable to add comment."
      );
    } finally {
      setCommentLoading(
        false
      );
    }
  };

  /*
   * Delete comment
   */
  const handleDeleteComment =
    async (commentId) => {
      try {
        await deleteComment(
          commentId
        );

        setComments((current) =>
          current.filter(
            (comment) =>
              comment._id !==
              commentId
          )
        );
      } catch (error) {
        console.error(
          "Delete comment error:",
          error
        );
      }
    };

  /*
   * Share
   */
  const handleShare =
    async () => {
      try {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert(
          "Video link copied!"
        );
      } catch {
        alert(
          "Unable to copy link."
        );
      }
    };

  if (loading) {
    return <LoadingWatch />;
  }

  if (error || !video) {
    return (
      <div className="mx-auto max-w-[1400px]">
        <div className="rounded-2xl border border-[#24282E] bg-[#111418] p-10 text-center">
          <h1 className="text-xl font-bold">
            Video not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error ||
              "This video may have been removed."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-[#075b8d] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const creator =
    video.owner?.fullName ||
    video.owner?.username ||
    "MANIT Student";

  const avatar =
    video.owner?.avatar ||
    "https://i.pravatar.cc/100?img=12";

  return (
    <div className="mx-auto max-w-[1400px] pb-16">
      {/* VIDEO */}

      <div className="aspect-video overflow-hidden rounded-2xl border border-[#24282E] bg-black shadow-2xl">
        <video
          src={video.videoFile}
          poster={video.thumbnail}
          controls
          playsInline
          className="h-full w-full object-contain"
        />
      </div>

      {/* TITLE */}

      <div className="mt-6">
        <h1 className="text-xl font-bold leading-7 sm:text-2xl">
          {video.title}
        </h1>

        {/* CREATOR + ACTIONS */}

        <div className="mt-4 flex flex-col gap-4 border-b border-[#24282E] pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt={creator}
              className="h-11 w-11 rounded-full object-cover"
            />

            <div>
              <Link
                to={`/channel/${
                  video.owner
                    ?.username || ""
                }`}
                className="text-sm font-semibold hover:text-[#075b8d]"
              >
                {creator}
              </Link>

              <p className="text-xs text-gray-600">
                MANIT Tube Creator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {/* LIKE */}

            <button
              type="button"
              onClick={
                handleLike
              }
              disabled={
                actionLoading
              }
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                liked
                  ? "bg-[#075b8d] text-white"
                  : "bg-[#181C21] text-gray-300 hover:bg-[#22272E]"
              }`}
            >
              <ThumbsUp
                size={17}
                fill={
                  liked
                    ? "currentColor"
                    : "none"
                }
              />

              {formatViews(
                video.likes || 0
              )}
            </button>

            {/* SHARE */}

            <button
              type="button"
              onClick={
                handleShare
              }
              className="flex items-center gap-2 rounded-full bg-[#181C21] px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#22272E]"
            >
              <Share2
                size={17}
              />

              Share
            </button>

            {/* SAVE */}

            <button
              type="button"
              onClick={
                handleSave
              }
              disabled={
                actionLoading
              }
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                saved
                  ? "bg-[#075b8d] text-white"
                  : "bg-[#181C21] text-gray-300 hover:bg-[#22272E]"
              }`}
            >
              <Bookmark
                size={17}
                fill={
                  saved
                    ? "currentColor"
                    : "none"
                }
              />

              {saved
                ? "Saved"
                : "Save"}
            </button>

            <button
              type="button"
              className="rounded-full bg-[#181C21] p-2.5 text-gray-400 hover:text-white"
            >
              <MoreHorizontal
                size={18}
              />
            </button>
          </div>
        </div>

        {/* DESCRIPTION */}

        <div className="mt-5 rounded-2xl bg-[#111418] p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
            <span>
              {formatViews(
                video.views
              )}{" "}
              views
            </span>

            <span>•</span>

            <span>
              {formatRelativeTime(
                video.createdAt
              )}
            </span>

            <span>•</span>

            <span>
              {formatViews(
                video.likes || 0
              )}{" "}
              likes
            </span>
          </div>

          <p className="mt-3 max-w-4xl whitespace-pre-line text-sm leading-6 text-gray-400">
            {video.description}
          </p>
        </div>

        {/* COMMENTS */}

        <section className="mt-8">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">
              Comments
            </h2>

            <span className="text-sm text-gray-600">
              {comments.length}
            </span>
          </div>

          <form
            onSubmit={
              handleComment
            }
            className="mt-5 flex gap-3"
          >
            <img
              src={
                user?.avatar ||
                "https://i.pravatar.cc/100?img=12"
              }
              alt=""
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />

            <div className="flex flex-1 gap-2">
              <input
                value={commentText}
                onChange={(event) =>
                  setCommentText(
                    event.target.value
                  )
                }
                onFocus={() => {
                  if (!user) {
                    requireLogin();
                  }
                }}
                placeholder={
                  user
                    ? "Add a comment..."
                    : "Login to comment..."
                }
                className="min-w-0 flex-1 border-b border-[#2A3037] bg-transparent pb-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#075b8d]"
              />

              <button
                type="submit"
                disabled={
                  commentLoading ||
                  !commentText.trim()
                }
                className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#075b8d] text-white transition hover:bg-[#064d77] disabled:opacity-40"
              >
                {commentLoading ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <Send
                    size={15}
                  />
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 space-y-7">
            {commentsLoading ? (
              <>
                <div className="h-12 animate-pulse rounded bg-[#181C21]" />

                <div className="h-12 animate-pulse rounded bg-[#181C21]" />
              </>
            ) : comments.length ===
              0 ? (
              <div className="py-8 text-center">
                <p className="text-sm text-[#85867f]">
                  No comments yet.
                </p>

                <p className="mt-1 text-xs text-[#555853]">
                  Be the first one
                  to start the
                  conversation.
                </p>
              </div>
            ) : (
              comments.map(
                (comment) => (
                  <CommentItem
                    key={
                      comment._id
                    }
                    comment={
                      comment
                    }
                    onDelete={
                      handleDeleteComment
                    }
                  />
                )
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}