import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getMeServer } from "@/lib/api/serverApi";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "View and manage your NoteHub account",
  openGraph: {
    title: "Profile Page",
    description: "View and manage your NoteHub account.",
    url: "https://your-app.vercel.app/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default async function Profile() {
  const user = await getMeServer();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="/user.png"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
