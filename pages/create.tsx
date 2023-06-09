import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import submitPost from "./submitPost";
import Spinner from "../components/Spinner";
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
        <div>
          <form onSubmit={submitData}>
            <h1>New Draft</h1>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
              id="title"
            />
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={8}
              value={content}
              id="content"
            />
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              id="video"
            />

            <Button
              disabled={!content || !title}
              type="submit"
              variant="contained"
              sx={{
                margin: "1rem",
                backgroundColor: "#3f51b5",
                ":disabled": {
                  backgroundColor: "lightgrey",
                },
                float: "right",
              }}
            >
              Create
            </Button>

            <Button
              onClick={() => Router.push("/")}
              variant="contained"
              sx={{
                margin: "1rem",
                backgroundColor: "#3f51b5",
                float: "right",
              }}
            >
              Cancel
            </Button>
          </form>
        </div>
      )}
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"] {
          bold: 1px solid #ececec;
          width: 25%;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
          border-radius: 0.25rem;
          padding: 0.3rem;
          margin: 0.5rem 0;
        }
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
