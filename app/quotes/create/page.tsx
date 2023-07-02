"use client";

import { useEffect, useState } from "react";

// Types
import { User } from "@prisma/client";

export default function CreateQuote() {
  const [user, setUser] = useState<User | null>(null);

  async function updateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const body = {
      content: formData.get("content"),
      author: formData.get("author"),
    };

    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await res.json();
  }

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/user", {
        method: "GET",
      });

      const user = await res.json();

      setUser(user);
    }
    getUser();
  }, []);

  return (
    user && (
      <article>
        <form onSubmit={updateUser}>
          <label htmlFor="content">Content</label>
          <textarea name="content" cols={30} rows={10}></textarea>

          <label htmlFor="author"> Author</label>
          <input type="text" name="author" />

          <button type="submit">Save</button>
        </form>
      </article>
    )
  );
}
