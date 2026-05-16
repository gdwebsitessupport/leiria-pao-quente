"use client";

import { Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/client";

type LoginFormProps = {
  redirectTo: string;
};

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const credentials = await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
      const idToken = await credentials.user.getIdToken(true);

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Nao foi possivel iniciar sessao no servidor.");
      }

      router.push(redirectTo);
      router.refresh();
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Nao foi possivel iniciar sessao. Verifique os dados e tente novamente.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-ink/10 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-semibold text-ink">
          Palavra-passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
          required
        />
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-olive px-5 py-2 text-sm font-bold text-cream transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <LogIn className="h-4 w-4" aria-hidden="true" />}
        {loading ? "A entrar..." : "Entrar"}
      </button>
    </form>
  );
}
