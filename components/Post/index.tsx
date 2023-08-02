import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { useTheme } from "../../hooks/useTheme";

export type PostProps = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  author: {
    name: string;
    email: string;
    profilePic: string;
  };
  videoUrl?: string;
  userId?: number;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const postStyles = isDark
    ? "bg-neutral-700 text-white"
    : "bg-white text-black";

  const authorName = post.author ? post.author.name : "Unknown author";
  const authorProfilePic = post.author ? post.author.profilePic : "";

  return (
    <div
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
      className={`p-5 ${postStyles} cursor-pointer`}
    >
      {authorProfilePic && (
        <img
          src={authorProfilePic}
          className="w-24 h-24 rounded-full border-gray-300 border mb-5"
        />
      )}
      {post.videoUrl && (
        <img
          src="/icons8-video-25.png"
          width="25px"
          height="25px"
          className="float-right"
        />
      )}
      <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
      <small className="block text-base text-gray-500 mb-4">
        By {authorName}
      </small>
      <ReactMarkdown className="text-2xl mb-10">{post.content}</ReactMarkdown>
      {post.videoUrl && (
        <video
          src={post.videoUrl}
          controls
          className="max-w-full max-h-96"
        ></video>
      )}
    </div>
  );
};

export default Post;
