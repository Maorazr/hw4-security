import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const usePosts = (initialPage) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 10;
  const router = useRouter();

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
        router.push(`?page=${currentPage}`, undefined, { shallow: true }); // push the current page number into the URL
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  return { posts, currentPage, totalPages, setCurrentPage };
};
