import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies["auth"];
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { email } = decodedToken;

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: email },
      published: false,
    },
    orderBy: { id: "desc" },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { drafts, email: decodedToken.email },
  };
};

type Props = {
  drafts: PostProps[];
  email: string | null;
};
const Drafts: React.FC<Props> = (props) => {
  const { drafts, email } = props;
  if (!email) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;
