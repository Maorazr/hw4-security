import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import ThemeToggleButton from "./ThemeToggleButton";
import Button from "@mui/material/Button";
import { Session, Theme } from "next-auth";
import classes from "./Header.module.css";
import { useTheme } from "../hooks/useTheme";

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
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  isActive: (pathname: string) => boolean;
};

const LeftSection: React.FC<SectionProps> = ({ session, status, isActive }) => {
  if (status === "loading" || !session) {
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

// Define RightSection component
const RightSection: React.FC<SectionProps> = ({
  session,
  status,
  isActive,
}) => {
  if (status === "loading") {
    return <p>Validating session ...</p>;
  }

  if (!session) {
    return (
      <div className={classes.right}>
        <HeaderLink href="/api/auth/login" isActive={isActive}>
          Log in
        </HeaderLink>
      </div>
    );
  }

  return (
    <div className={classes.right}>
      <p className={classes.paragraph}>
        {session.user?.name} ({session.user?.email})
      </p>
      <Link href="/create">
        <Button variant="outlined" sx={{ margin: 1 }}>
          New post
        </Button>
      </Link>
      <Button variant="outlined" onClick={() => signOut()}>
        Log out
      </Button>
    </div>
  );
};

// Define Header component
const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();
  const theme = useTheme();
  return (
    <nav className={classes.nav}>
      <ThemeToggleButton />
      <LeftSection session={session} status={status} isActive={isActive} />
      <RightSection session={session} status={status} isActive={isActive} />
    </nav>
  );
};

export default Header;

// import React from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { signOut, useSession } from "next-auth/react";
// import ThemeToggleButton from "./ThemeToggleButton";
// import Button from "@mui/material/Button";

// const Header: React.FC = () => {
//   const router = useRouter();
//   const isActive: (pathname: string) => boolean = (pathname) =>
//     router.pathname === pathname;

//   const { data: session, status } = useSession();
//   let left = (
//     <div className="left">
//       <Link href="/" legacyBehavior>
//         <a className="bold" data-active={isActive("/")}>
//           Feed
//         </a>
//       </Link>
//       <style jsx>{`
//         .bold {
//           font-weight: bold;
//         }

//         a {
//           text-decoration: none;
//           color: #000;
//           display: inline-block;
//         }

//         .left a[data-active="true"] {
//           color: gray;
//         }

//         a + a {
//           margin-left: 1rem;
//         }
//       `}</style>
//     </div>
//   );

//   let right = null;

//   if (status === "loading") {
//     left = (
//       <div className="left">
//         <Link href="/" legacyBehavior>
//           <a className="bold" data-active={isActive("/")}>
//             Feed
//           </a>
//         </Link>
//         <style jsx>{`
//           .bold {
//             font-weight: bold;
//           }

//           a {
//             text-decoration: none;
//             color: #000;
//             display: inline-block;
//           }

//           .left a[data-active="true"] {
//             color: gray;
//           }

//           a + a {
//             margin-left: 1rem;
//           }
//         `}</style>
//       </div>
//     );
//     right = (
//       <div className="right">
//         <p>Validating session ...</p>
//         <style jsx>{`
//           .right {
//             margin-left: auto;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (!session) {
//     right = (
//       <div className="right">
//         <Link href="/api/auth/signin" legacyBehavior>
//           <a data-active={isActive("/signup")}>Log in</a>
//         </Link>
//         <style jsx>{`
//           a {
//             text-decoration: none;
//             color: #000;
//             display: inline-block;
//           }

//           a + a {
//             margin-left: 1rem;
//           }

//           .right {
//             margin-left: auto;
//           }

//           .right a {
//             border: 1px solid black;
//             padding: 0.5rem 1rem;
//             border-radius: 3px;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (session) {
//     left = (
//       <div className="left">
//         <Link href="/" legacyBehavior>
//           <a className="bold" data-active={isActive("/")}>
//             Feed
//           </a>
//         </Link>
//         <Link href="/drafts" legacyBehavior>
//           <a data-active={isActive("/drafts")}>My drafts</a>
//         </Link>
//         <style jsx>{`
//           .bold {
//             font-weight: bold;
//           }

//           a {
//             text-decoration: none;
//             color: #000;
//             display: inline-block;
//           }

//           .left a[data-active="true"] {
//             color: gray;
//           }

//           a + a {
//             margin-left: 1rem;
//           }
//         `}</style>
//       </div>
//     );
//     right = (
//       <div className="right">
//         <p>
//           {session.user?.name} ({session.user?.email})
//         </p>
//         <Link href="/create" legacyBehavior>
//           {/* <button> */}
//           <Button variant="outlined">
//             {/* <a>New post</a> */}
//             New post
//           </Button>
//           {/* </button> */}
//         </Link>
//         {/* <button onClick={() => signOut()}> */}
//         <Button variant="outlined" onClick={() => signOut()}>
//           {/* <a>Log out</a> */}
//           Log out
//         </Button>
//         {/* </button> */}
//         <style jsx>{`
//           a {
//             text-decoration: none;
//             color: #000;
//             display: inline-block;
//           }

//           p {
//             display: inline-block;
//             font-size: 13px;
//             padding-right: 1rem;
//           }

//           a + a {
//             margin-left: 1rem;
//           }

//           .right {
//             margin-left: auto;
//           }

//           .right a {
//             border: 1px solid black;
//             padding: 0.5rem 1rem;
//             border-radius: 3px;
//           }

//           button {
//             border: none;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <nav>
//       <ThemeToggleButton />
//       {left}
//       {right}
//       <style jsx>{`
//         nav {
//           display: flex;
//           padding: 2rem;
//           align-items: center;
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default Header;
