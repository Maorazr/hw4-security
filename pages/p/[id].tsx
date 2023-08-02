import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout/index";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || "");
  const token = cookies["auth"];
  let userId = null;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(context.params?.id) || -1,
    },
    include: {
      author: true,
    },
  });
  return {
    props: { ...post, userId: userId },
  };
};

async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
  const postBelongsToUser = props.userId === props.authorId;
  let profilePic = props.author?.profilePic;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }
  return (
    <Layout>
      <div className="p-4 md:p-8 lg:p-16">
        {profilePic && (
          <img
            src={profilePic}
            alt="profile"
            className="w-24 h-24 rounded-full mb-4"
          />
        )}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-4">
          By {props?.author?.name || "Unknown author"}
        </p>
        <ReactMarkdown className="prose mb-4" children={props.content} />
        {props.videoUrl && (
          <video
            src={props.videoUrl}
            controls
            className="max-w-full max-h-96 mb-4"
          ></video>
        )}

        {!props.published && postBelongsToUser && (
          <button
            onClick={() => publishPost(props.id)}
            className="float-right mt-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Publish
          </button>
        )}
        {postBelongsToUser && (
          <button
            onClick={() => deletePost(props.id)}
            className="float-right mt-2 mr-2 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Post;
