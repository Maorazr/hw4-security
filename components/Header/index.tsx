import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggleButton from "../Theme/ThemeToggleButton";
import Button from "@mui/material/Button";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { User } from "@prisma/client";

type HeaderLinkProps = {
  href: string;
  isActive: (pathname: string) => boolean;
  children: React.ReactNode;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({
  href,
  isActive,
  children,
}) => {
  const theme = useTheme();
  const activeStyle = theme.theme === "dark" ? "text-white" : "text-black";
  const activeLink = isActive(href) ? "text-gray-500" : activeStyle;
  return (
    <Link href={href}>
      <p
        className={`border border-black rounded px-4 py-2 m-2 inline-block ${activeLink}`}
      >
        {children}
      </p>
    </Link>
  );
};

type SectionProps = {
  user: User | null;
  loading: boolean;
  isActive: (pathname: string) => boolean;
};

const LeftSection: React.FC<SectionProps> = ({ user, loading, isActive }) => {
  if (loading || !user) {
    return (
      <div className="flex mr-auto">
        <HeaderLink href="/" isActive={isActive}>
          Feed
        </HeaderLink>
      </div>
    );
  }

  return (
    <div className="flex mr-auto">
      <HeaderLink href="/" isActive={isActive}>
        Feed
      </HeaderLink>
      <HeaderLink href="/drafts" isActive={isActive}>
        My drafts
      </HeaderLink>
      <HeaderLink href="/profile" isActive={isActive}>
        My profile
      </HeaderLink>
    </div>
  );
};

const RightSection: React.FC<SectionProps> = ({ user, loading, isActive }) => {
  if (loading) {
    return <p>Validating session ...</p>;
  }

  if (!user) {
    return (
      <div>
        <HeaderLink href="/register" isActive={isActive}>
          Sign up
        </HeaderLink>
        <HeaderLink href="/login" isActive={isActive}>
          Log in
        </HeaderLink>
      </div>
    );
  }

  return (
    <div>
      <p className="inline-block text-base pr-4">
        {user.name} ({user.email})
      </p>
      <Link href="/create">
        <Button variant="outlined" sx={{ m: 1 }}>
          New post
        </Button>
      </Link>
      <Button variant="outlined" onClick={logout}>
        Log out
      </Button>
    </div>
  );
};

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { user, loading } = useAuth(); // use useAuth hook
  const theme = useTheme();

  return (
    <nav
      className={`${
        theme.theme === "dark" ? "dark:bg-neutral-600" : "bg-sky-100"
      } flex justify-start p-8 items-center`}
    >
      <ThemeToggleButton />
      <LeftSection user={user} loading={loading} isActive={isActive} />
      <RightSection user={user} loading={loading} isActive={isActive} />
    </nav>
  );
};

async function logout() {
  const res = await fetch("/api/auth/logout", { method: "POST" });

  if (res.ok) {
    // If the logout was successful, redirect to the login page
    window.location.href = "/";
  } else {
    console.error("Failed to log out");
  }
}

export default Header;
