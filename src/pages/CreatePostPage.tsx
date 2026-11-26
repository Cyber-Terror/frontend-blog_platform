import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { RiAddLine, RiCloseLine, RiImageAddLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import uploadApi from "../api/upload";
import postApi from "../api/posts";
import { getErrorMessage } from "../api/client";

type CreatePostErrors = { title?: string; content?: string; tags?: string };

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<CreatePostErrors>({});
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked) return;

    setFile(picked);
    setPreview(URL.createObjectURL(picked));
    e.target.value = "";
  }

  function removeImage() {
    setFile(null);
    setPreview("");
  }

  function validate() {
    const nextErrors: CreatePostErrors = {};
    if (title.trim().length < 3)
      nextErrors.title = "Title must be at least 3 characters";
    if (content.trim().length < 2)
      nextErrors.content = "Content must be at least 2 characters";

    const tagsList = tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);
    if (tagsList.length > 6) nextErrors.tags = "Maximum 6 tags allowed";
    if (tagsList.some((tag) => tag.length > 10))
      nextErrors.tags = "Each tag must be at most 10 characters";

    setErrors(nextErrors);
    return { valid: Object.keys(nextErrors).length === 0, tagsList };
  }

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    const { valid, tagsList } = validate();
    if (!valid) return;

    setIsSubmitting(true);
    try {
      const url = file
        ? (await uploadApi.uploadFile(file)).data.data.url
        : undefined;
      const res = await postApi.createPost({
        title,
        content,
        imageUrl: url,
        tags: Array.from(new Set(tagsList)),
      });
      toast.success("Post created");
      navigate(`/posts/${res.data.data.id}`);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to create post"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-3 flex flex-col items-center gap-4">
      <h1 className="w-full max-w-3xl text-center text-2xl font-semibold text-mauve-50">
        Create a new Post
      </h1>

      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-3xl flex-col gap-4"
      >
        <div className="flex w-full max-w-3xl flex-col gap-4 rounded-xl border border-mauve-400 bg-mauve-700 p-6 shadow-lg">
          <Input
            type="text"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
          />

          <div className=" relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post…"
              className="min-h-[320px] w-full resize-y rounded-lg border-2 border-mauve-400 bg-mauve-800 p-4 text-mauve-100 placeholder:text-mauve-300 focus:outline-none focus:ring-2 focus:ring-mauve-300"
            />
            {errors.content && (
              <p className="mt-1 text-xs text-red-300">{errors.content}</p>
            )}
            <label className="absolute bottom-3 right-3 flex cursor-pointer items-center gap-2 rounded-md border border-mauve-400 bg-mauve-800 px-3 py-1.5 text-sm text-mauve-200 transition hover:bg-mauve-600 hover:text-mauve-50">
              <RiImageAddLine /> Attach photo
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
            {preview && (
          <div className="relative w-fit">
            <img
              src={preview}
              alt="Selected image"
              className="max-h-64 rounded-lg border border-mauve-400 object-contain"
            />
            <button
              type="button"
              onClick={removeImage}
              aria-label="Remove image"
              className="absolute right-1 top-1 rounded-full border border-mauve-400 bg-mauve-800 p-1 text-mauve-200 transition hover:bg-mauve-600"
            >
              <RiCloseLine />
            </button>
          </div>
        )}
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <Input
                  type="text"
                  label="Tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  error={errors.tags}
                />
                <p className="text-xs text-mauve-300">
                  Separate with commas · up to 6 tags · max 10 characters each
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-md bg-mauve-300 px-5 py-2 font-medium text-mauve-900 transition hover:bg-mauve-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RiAddLine /> {isSubmitting ? "Creating…" : "Create post"}
              </button>
            </div>
          </div>
        </form>
    </div>
  );
}
