import Router from "next/router";

const submitPost = async (title, content, session, email, file) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (session) {
    formData.append("session", JSON.stringify(session));
  }
  formData.append("email", email || "");
  if (file) {
    console.log("file exists");
    formData.append("file", file);
  }

  try {
    await fetch(`/api/post`, {
      method: "POST",
      body: formData,
    });
    await Router.push("/drafts");
  } catch (error) {
    console.error(error);
  }
};

export default submitPost;
