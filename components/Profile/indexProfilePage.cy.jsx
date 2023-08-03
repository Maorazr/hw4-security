import React from "react";
import ProfilePage from "./index";
import { ThemeProvider } from "../../context/ThemeContext";
import MockNextRouter from "../../cypress/utilities/mockNextRouter";
import Router from "next/router";

describe("<ProfilePage />", () => {
  const mockUser = {
    profilePic:
      "https://res.cloudinary.com/dhl4ej1ci/image/upload/v1686382067/Blog/ProfilePic/Default_pfp_x11n6t.png",
    name: "Test User",
    email: "testuser@test.com",
    username: "testuser",
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
          <ProfilePage user={mockUser} />
        </MockNextRouter>
      </ThemeProvider>
    );
  });

  it("renders", () => {
    cy.get('[testid="name"]').should("contain", mockUser.name);
    cy.get('[testid=email"]').should("contain", mockUser.email);
    cy.get('[testid="username"]').should("contain", mockUser.username);
  });
});
