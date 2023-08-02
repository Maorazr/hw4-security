import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/index";
import Router from "next/router";
import submitPost from "./submitPost";
import Spinner from "../components/common/Spinner/index";
import Button from "@mui/material/Button";

const cookie = require("cookie");
const jwt = require("jsonwebtoken");

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = cookie.parse(document.cookie);
      const authToken = cookies.auth;
      if (authToken) {
        setToken(authToken);
      }

      setIsLoading(false);
    }
  }, []);

  let decodedToken;
  let email: string | undefined;

  if (token) {
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      email = decodedToken?.email;
    } catch (error) {
      console.error("Error verifying token: ", error);
    }
  }

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await submitPost(title, content, email, file);
    setIsLoading(false);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  return (
    <Layout>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="flex justify-center align-center">
          <form onSubmit={submitData} className="w-3/4 mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-4">New Draft</h1>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
              id="title"
              className="w-full py-2 px-4 mb-3 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={8}
              value={content}
              id="content"
              className="w-full py-2 px-4 mb-3 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              id="video"
              className="w-full py-2 px-4 mb-3 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              disabled={!content || !title}
              type="submit"
              className={`inline-block px-4 py-2 mr-2 mb-2 text-white rounded ${
                !content || !title
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Create
            </button>

            <button
              onClick={() => Router.push("/")}
              type="button"
              className="inline-block px-4 py-2 mr-2 mb-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default Draft;
