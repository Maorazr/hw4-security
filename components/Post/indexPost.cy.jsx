import React from "react";
import { ThemeProvider } from "../../context/ThemeContext";
import MockNextRouter from "../../cypress/utilities/mockNextRouter";
import Post from "./index";
import Router from "next/router";
describe("<Post />", () => {
  const mockPost = {
    id: 1,
    title: "Test Post",
    content: "This is a test post",
    published: true,
    authorId: 1,
    author: {
      name: "Test User",
      email: "testuser@test.com",
      profilePic:
        "https://res.cloudinary.com/dhl4ej1ci/image/upload/v1686382067/Blog/ProfilePic/Default_pfp_x11n6t.png",
    },
    videoUrl: "http://test-video-url.com",
  };
  let router;

  beforeEach(() => {
    router = {
      back: cy.stub().as("routerBack"),
    };
    cy.stub(Router, "useRouter").returns(router);
    cy.mount(
      <ThemeProvider value={{ theme: "light", toggleTheme: () => {} }}>
        <MockNextRouter>
          <Post post={mockPost} />
        </MockNextRouter>
      </ThemeProvider>
    );
  });

  it("renders the author's profile picture", () => {
    cy.get('img[src="' + mockPost.author.profilePic + '"]').should("exist");
  });

  it("renders the video icon and player if videoUrl is provided", () => {
    cy.get('img[src="/icons8-video-25.png"]').should("exist");
    cy.get('video[src="' + mockPost.videoUrl + '"]').should("exist");
  });

  it("renders title, author and content", () => {
    cy.get('h2[data-testId="title"]').should("contain", mockPost.title);
    cy.get('small[data-testId="author"]').should(
      "contain",
      mockPost.author.name
    );
    cy.get('[data-testId="content"]').should("contain", mockPost.content);
  });
});
