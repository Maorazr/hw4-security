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
      <div className="mt-8">
        <h1 className="text-4xl font-bold mb-4">Public Feed</h1>
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={setCurrentPage}
        />
        <main>
          {posts &&
            posts.map((post) => (
              <div
                key={post.id}
                className="post bg-white transition-shadow duration-100 ease-in-out hover:shadow-md mb-8"
              >
                <Post post={post} />
              </div>
            ))}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
