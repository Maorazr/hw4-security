import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggleButton from "./ThemeToggleButton";
import Button from "@mui/material/Button";

import classes from "./Header.module.css";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
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
  return (
    <Link href={href}>
      <p
        className={`${classes.link} ${classes.linkMargin} ${
          isActive(href) ? classes.active : ""
        }`}
        style={{
          color: theme.theme === "dark" ? "white" : "black",
        }}
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
      <div className={classes.left}>
        <HeaderLink href="/" isActive={isActive}>
          Feed
        </HeaderLink>
      </div>
    );
  }

  return (
    <div className={classes.left}>
      <HeaderLink href="/" isActive={isActive}>
        Feed
      </HeaderLink>
      <HeaderLink href="/drafts" isActive={isActive}>
        My drafts
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
      <div className={classes.right}>
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
    <div className={classes.right}>
      <p className={classes.paragraph}>
        {user.name} ({user.email})
      </p>
      <Link href="/create">
        <Button variant="outlined" sx={{ margin: 1 }}>
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
    <nav className={classes.nav}>
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
