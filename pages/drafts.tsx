import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout/index";
import Post, { PostProps } from "../components/Post/index";
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
      author: true,
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
        <h1 className="text-3xl font-bold mb-4">My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">My Drafts</h1>
        <main>
          {drafts.map((post) => (
            <div
              key={post.id}
              className="post bg-white transition-shadow duration-100 ease-in hover:shadow-md my-8"
            >
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
