import React from "react";
import Layout from "../components/Layout";
import Post from "../components/Post";
import Paginate from "../components/Paginate.jsx";
import { usePosts } from "../hooks/usePosts";

const Blog = () => {
  const { posts, currentPage, totalPages, setCurrentPage } = usePosts(1);

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))}
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={setCurrentPage}
          />
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 2px 2px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
