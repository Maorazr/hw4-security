import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { useTheme } from "../hooks/useTheme";
export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  videoUrl: string | null;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const { theme } = useTheme();
  const authorName = post.author ? post.author.name : "Unknown author";
  const isDark = theme === "dark";
  const postStyles = {
    backgroundColor: isDark ? "#333" : "white",
    color: isDark ? "white" : "black",
  };
  return (
    <div
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
      style={postStyles}
    >
      {post.videoUrl && (
        <img
          src="/icons8-video-25.png"
          width="25px"
          height="25px"
          style={{ float: "right" }}
        />
      )}
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      {post.videoUrl && (
        <video
          src={post.videoUrl}
          controls
          style={{ maxWidth: "100%", maxHeight: "400px" }}
        ></video>
      )}

      <style jsx>{`
        div {
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
