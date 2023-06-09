import Router from "next/router";

const submitPost = async (title, content, email, file) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("email", email || "");
  if (file) {
    formData.append("file", file);
  }

  try {
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    Router.push("/drafts");
  } catch (error) {
    console.error(error);
  }
};

export default submitPost;
