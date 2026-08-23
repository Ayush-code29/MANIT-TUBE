import { useEffect, useRef, useState } from "react";
import { uploadVideo } from "../api/videoApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Video,
  Image as ImageIcon,
  X,
  Check,
  ArrowUpRight,
  FileVideo,
  Loader2,
  AlertCircle,
} from "lucide-react";


const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function formatFileSize(bytes) {
  if (!bytes) return "";

  const mb = bytes / (1024 * 1024);

  if (mb < 1) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${mb.toFixed(1)} MB`;
}

function formatDuration(seconds) {
  if (!seconds || !Number.isFinite(seconds)) {
    return "0";
  }

  return Math.round(seconds);
}

function UploadBox({
  type,
  file,
  onChange,
  onRemove,
  disabled,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const isVideo = type === "video";

  const accept = isVideo
    ? "video/mp4,video/webm,video/quicktime"
    : "image/jpeg,image/png,image/webp";

  const handleFiles = (files) => {
    const selectedFile = files?.[0];

    if (!selectedFile) return;

    onChange(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    if (disabled) return;

    handleFiles(event.dataTransfer.files);
  };

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isVideo ? (
            <Video size={15} className="text-[#075b8d]" />
          ) : (
            <ImageIcon size={15} className="text-[#075b8d]" />
          )}

          <label className="text-sm font-semibold">
            {isVideo ? "Video file" : "Thumbnail"}
          </label>

          <span className="text-xs text-[#9a9b96]">
            {isVideo ? "Required" : "Required"}
          </span>
        </div>

        {file && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-medium text-[#85867f] transition hover:text-red-500"
          >
            Remove
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.button
            key="empty"
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              if (!disabled) setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            animate={{
              borderColor: dragging ? "#075b8d" : "#deded9",
              backgroundColor: dragging ? "#f1f7fa" : "#fafaf8",
            }}
            className="group relative flex min-h-[220px] w-full flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center transition dark:border-[#292a2b] dark:bg-[#151718]"
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              className="hidden"
              onChange={(event) =>
                handleFiles(event.target.files)
              }
            />

            <motion.div
              animate={{
                y: dragging ? -5 : 0,
                scale: dragging ? 1.04 : 1,
              }}
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e7f1f6] text-[#075b8d] dark:bg-[#173442] dark:text-[#62afd6]"
            >
              {isVideo ? (
                <FileVideo size={21} />
              ) : (
                <ImageIcon size={21} />
              )}
            </motion.div>

            <p className="text-sm font-semibold">
              {isVideo
                ? "Drop your video here"
                : "Drop your thumbnail here"}
            </p>

            <p className="mt-1.5 text-xs text-[#85867f]">
              or click to browse from your computer
            </p>

            <p className="mt-4 text-[11px] text-[#a0a19b]">
              {isVideo
                ? "MP4, WebM or MOV"
                : "JPG, PNG or WebP"}
            </p>

            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-[#075b8d] transition group-hover:opacity-100" />
          </motion.button>
        ) : (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="overflow-hidden rounded-xl border border-[#deded9] bg-white dark:border-[#292a2b] dark:bg-[#181a1b]"
          >
            {isVideo ? (
              <div className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#e7f1f6] text-[#075b8d] dark:bg-[#173442] dark:text-[#62afd6]">
                  <FileVideo size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-[#85867f]">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf7ef] text-[#27803d] dark:bg-[#18351f] dark:text-[#62c774]">
                  <Check size={15} />
                </div>
              </div>
            ) : (
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Thumbnail preview"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-white">
                      {file.name}
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/60">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  <div className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#27803d]">
                    <Check size={14} />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [duration, setDuration] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!videoFile) {
      setVideoPreview("");
      setDuration("");
      return;
    }

    const url = URL.createObjectURL(videoFile);

    setVideoPreview(url);

    const video = document.createElement("video");

    video.preload = "metadata";
    video.src = url;

    video.onloadedmetadata = () => {
      setDuration(formatDuration(video.duration));
    };

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [videoFile]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Please enter a video title.");
      return;
    }

    if (!description.trim()) {
      setError("Please add a description.");
      return;
    }

    if (!videoFile) {
      setError("Please select a video file.");
      return;
    }

    if (!thumbnail) {
      setError("Please select a thumbnail.");
      return;
    }

    if (!duration) {
      setError(
        "We couldn't read the video duration. Please select the video again."
      );
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("duration", duration);

      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnail);

      const data = await uploadVideo(formData);

      setSuccess("Your video has been published successfully.");

      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnail(null);
      setDuration("");
    } catch (error) {
      console.error("Upload error:", error);

      setError(
        error.message ||
          "Something went wrong while uploading your video."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
          },
        },
      }}
      className="mx-auto max-w-[1180px] pb-20"
    >
      {/* Header */}

      <motion.section variants={fadeUp}>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#075b8d]">
              Creator Studio
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Upload a video
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#777871] dark:text-[#969791]">
              Share something useful with the MANIT community.
              Keep it clear, useful and worth watching.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs text-[#85867f] sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#27803d]" />
            Your uploads are saved to your creator profile
          </div>
        </div>
      </motion.section>

      <form
        onSubmit={handleSubmit}
        className="mt-10"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main column */}

          <motion.div variants={fadeUp} className="space-y-6">
            <section className="rounded-2xl border border-[#deded9] bg-white p-6 dark:border-[#292a2b] dark:bg-[#181a1b] sm:p-7">
              <div className="mb-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#85867f]">
                  01
                </p>

                <h2 className="mt-1 text-lg font-bold">
                  Tell people about your video
                </h2>
              </div>

              {/* Title */}

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">
                    Title
                  </label>

                  <span
                    className={`text-[11px] ${
                      title.length > 90
                        ? "text-red-500"
                        : "text-[#9a9b96]"
                    }`}
                  >
                    {title.length}/100
                  </span>
                </div>

                <input
                  value={title}
                  maxLength={100}
                  disabled={uploading}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Give your video a clear title"
                  className="mt-2.5 h-12 w-full rounded-lg border border-[#deded9] bg-[#fafaf8] px-4 text-sm outline-none transition placeholder:text-[#a4a49e] focus:border-[#075b8d] focus:bg-white dark:border-[#292a2b] dark:bg-[#151718] dark:focus:bg-[#181a1b]"
                />
              </div>

              {/* Description */}

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">
                    Description
                  </label>

                  <span className="text-[11px] text-[#9a9b96]">
                    {description.length}/2000
                  </span>
                </div>

                <textarea
                  value={description}
                  maxLength={2000}
                  disabled={uploading}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="What will students learn or get from this video?"
                  rows={7}
                  className="mt-2.5 w-full resize-none rounded-lg border border-[#deded9] bg-[#fafaf8] px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-[#a4a49e] focus:border-[#075b8d] focus:bg-white dark:border-[#292a2b] dark:bg-[#151718] dark:focus:bg-[#181a1b]"
                />
              </div>
            </section>

            {/* Files */}

            <section className="rounded-2xl border border-[#deded9] bg-white p-6 dark:border-[#292a2b] dark:bg-[#181a1b] sm:p-7">
              <div className="mb-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#85867f]">
                  02
                </p>

                <h2 className="mt-1 text-lg font-bold">
                  Add your files
                </h2>

                <p className="mt-1 text-xs text-[#85867f]">
                  Your video and thumbnail should tell the same
                  story.
                </p>
              </div>

              <div className="space-y-7">
                <UploadBox
                  type="video"
                  file={videoFile}
                  disabled={uploading}
                  onChange={(file) => {
                    setVideoFile(file);
                    setError("");
                  }}
                  onRemove={() => {
                    setVideoFile(null);
                    setDuration("");
                  }}
                />

                <UploadBox
                  type="thumbnail"
                  file={thumbnail}
                  disabled={uploading}
                  onChange={(file) => {
                    setThumbnail(file);
                    setError("");
                  }}
                  onRemove={() => setThumbnail(null)}
                />
              </div>
            </section>
          </motion.div>

          {/* Side column */}

          <motion.aside
            variants={fadeUp}
            className="space-y-5"
          >
            {/* Preview */}

            <section className="overflow-hidden rounded-2xl border border-[#deded9] bg-white dark:border-[#292a2b] dark:bg-[#181a1b]">
              <div className="border-b border-[#deded9] px-5 py-4 dark:border-[#292a2b]">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#85867f]">
                  Preview
                </p>

                <h2 className="mt-1 text-sm font-bold">
                  Before you publish
                </h2>
              </div>

              <div className="p-5">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-[#111418]">
                  {thumbnail ? (
                    <img
                      src={URL.createObjectURL(thumbnail)}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : videoPreview ? (
                    <video
                      src={videoPreview}
                      muted
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-500">
                        <Video size={18} />
                      </div>

                      <p className="mt-3 text-xs text-gray-500">
                        Your preview will appear here
                      </p>
                    </div>
                  )}

                  {duration && (
                    <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-[10px] font-semibold text-white">
                      {Math.floor(duration / 60)}:
                      {String(duration % 60).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 line-clamp-2 text-sm font-semibold leading-5">
                  {title || "Your video title"}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#85867f]">
                  {description ||
                    "Your video description will appear here."}
                </p>
              </div>
            </section>

            {/* Publishing */}

            <section className="rounded-2xl border border-[#deded9] bg-white p-5 dark:border-[#292a2b] dark:bg-[#181a1b]">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#85867f]">
                Publishing
              </p>

              <div className="mt-4 flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edf7ef] text-[#27803d] dark:bg-[#18351f]">
                  <Check size={14} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Public video
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#85867f]">
                    Your video will be visible to the MANIT
                    Tube community after upload.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#075b8d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#064d77] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Uploading...
                  </>
                ) : (
                  <>
                    Publish video
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </section>

            {/* Messages */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20"
                >
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-red-500"
                  />

                  <p className="text-xs leading-5 text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900/40 dark:bg-green-950/20"
                >
                  <Check
                    size={17}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <p className="text-xs leading-5 text-green-700 dark:text-green-400">
                    {success}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        </div>
      </form>
    </motion.main>
  );
}