import React, { useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/Input";
import apiAuth from "../api/auth";
import { getErrorMessage } from "../api/client";
import { useNavigate } from "react-router";

type RegisterErrors = { email?: string; login?: string; password?: string };

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const navigate = useNavigate();

  function validate() {
    const nextErrors: RegisterErrors = {};
    if (!email.trim()) nextErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Invalid email";
    if (login.trim().length < 6)
      nextErrors.login = "Login must be at least 6 characters";
    if (password.length < 6)
      nextErrors.password = "Password must be at least 6 characters";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await apiAuth.register({ email, login, password });
      toast.success("Account created. Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(getErrorMessage(err, "Registration failed"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-mauve-400 bg-mauve-700 p-6"
      >
        <Input
          type="email"
          label="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
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
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
