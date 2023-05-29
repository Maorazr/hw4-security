import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 10;
  const router = useRouter();

  // Extract the current page number from the URL
  const currentPage = parseInt(router.query.page) || 1;

  useEffect(() => {
    fetch(`/api/post?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data.posts)) {
          throw new Error("Invalid data");
        }
        setPosts(data.posts);
        const pages = Math.ceil(data.count / postsPerPage);
        setTotalPages(pages);
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  const setCurrentPage = (page) => {
    // Push the current page number into the URL
    router.push(`?page=${page}`, undefined, { shallow: true });
  };

  return { posts, currentPage, totalPages, setCurrentPage };
};
