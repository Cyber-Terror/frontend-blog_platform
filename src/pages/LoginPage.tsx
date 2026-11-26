import React, { useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/client";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ login?: string; password?: string }>(
    {},
  );
  const navigate = useNavigate();
  const { login: signIn } = useAuth();

  function validate() {
    const nextErrors: { login?: string; password?: string } = {};
    if (!login.trim()) nextErrors.login = "Login is required";
    if (!password) nextErrors.password = "Password is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await signIn({ login, password });
      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      const message = getErrorMessage(err, "Failed to login");
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-3 flex flex-col items-center">
      <form
        className="mt-3 flex w-full max-w-sm flex-col gap-4 rounded-lg border border-mauve-400 bg-mauve-700 p-6"
        onSubmit={handleSubmit}
      >
        <Input
          label="Enter your login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          error={errors.login}
        />
        <Input
          type="password"
          label="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex justify-center rounded-sm bg-mauve-300 px-4 py-2 font-medium text-mauve-900 transition hover:bg-mauve-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
