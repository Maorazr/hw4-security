import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import Button from "@mui/material/Button";
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
      <div>
        {profilePic && (
          <img
            src={profilePic}
            alt="profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
        )}
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {props.videoUrl && (
          <video
            src={props.videoUrl}
            controls
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          ></video>
        )}

        {!props.published && postBelongsToUser && (
          <Button
            variant="contained"
            onClick={() => publishPost(props.id)}
            sx={{ margin: 1, float: "right" }}
          >
            Publish
          </Button>
        )}
        {postBelongsToUser && (
          <Button
            variant="contained"
            onClick={() => deletePost(props.id)}
            sx={{ margin: 1, float: "right" }}
          >
            Delete
          </Button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
