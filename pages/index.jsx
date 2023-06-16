import React from "react";
import Layout from "../components/Layout/index";
import Post from "../components/Post/index";
import Paginate from "../components/common/Pagination/Paginate.jsx";
import { usePosts } from "../hooks/usePosts";
import { prisma } from "../lib/prisma";

export const getServerSideProps = async ({ query }) => {
  const page = Number(query.page) || 1;
  const postsPerPage = 10;

  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } } },
    take: postsPerPage,
    skip: (page - 1) * postsPerPage,
    orderBy: { id: "desc" },
  });

  const totalPosts = await prisma.post.count({ where: { published: true } });

  return {
    props: { initialData: { posts: feed, count: totalPosts } },
  };
};

const Blog = ({ initialData }) => {
  const { posts, currentPage, totalPages, setCurrentPage } =
    usePosts(initialData);

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
          box-shadow: 3px 3px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
