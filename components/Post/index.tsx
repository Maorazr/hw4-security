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
      className={`flex p-5 ${postStyles} cursor-pointer`}
      data-testId={`post-${post.id}`}
    >
      <div
        className={`w-36 h-48 bg-blue-300 dark:bg-violet-700 rounded-lg shadow-lg p-6`}
      >
        {authorProfilePic && (
          <img
            src={authorProfilePic}
            className="w-24 h-24 rounded-full border-4 border-white mb-5"
            data-testid={`post-${post.id}-author-profile`}
          />
        )}
        <div className="flex flex-col items-center">
          <small data-testId="author" className="block text-base mb-4">
            {authorName}
          </small>
        </div>
      </div>
      <div className="flex-1 p-8">
        {post.videoUrl && (
          <img
            src="/icons8-video-25.png"
            width="25px"
            height="25px"
            className="float-right"
          />
        )}
        <h2 data-testId="title" className="text-3xl font-bold mb-2">
          {post.title}
        </h2>

        <div data-testid="content">
          <ReactMarkdown className="text-xl mb-10">
            {post.content}
          </ReactMarkdown>
        </div>

        {post.videoUrl && (
          <video
            src={post.videoUrl}
            controls
            className="max-w-full max-h-96"
            data-testid={`post-${post.id}-video-player`}
          ></video>
        )}
      </div>
    </div>
  );
};

export default Post;
