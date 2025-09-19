"use client";

import css from "./EditProfilePage.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export default function Edit() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: me, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (me) setUserName(me.username ?? "");
  }, [me]);

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/profile");
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleSaveUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = userName.trim();
    if (!trimmed || trimmed === (me?.username ?? "")) return;
    mutate({ username: trimmed });
  };

  const handleCancel = () => router.push("/profile");

  if (isLoading) {
    return (
      <main className={css.mainContent}>
        <p>Loading profile…</p>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="/user.png"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={userName}
              className={css.input}
              onChange={handleChange}
              maxLength={50}
            />
          </div>

          <p>Email: {me?.email}</p>
          {error && <p className={css.error}>Failed to save changes.</p>}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={
                isPending ||
                !userName.trim() ||
                userName.trim() === (me?.username ?? "")
              }
            >
              {isPending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
