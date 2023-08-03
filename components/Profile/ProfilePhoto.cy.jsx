import React from "react";
import ProfilePhoto from "./ProfilePhoto";

describe("<ProfilePhoto />", () => {
  const mockUser = {
    profilePic:
      "https://res.cloudinary.com/dhl4ej1ci/image/upload/v1686382067/Blog/ProfilePic/Default_pfp_x11n6t.png",
  };
  beforeEach(() => {
    cy.mount(<ProfilePhoto user={mockUser} />);
  });

  it("renders", () => {
    cy.get('[testId="profileImg"]').should(
      "have.attr",
      "src",
      mockUser.profilePic
    );
  });
  it("should open the file input when the image is clicked and update the photo", () => {
    cy.get('input[testId="fileInput"]').should("not.be.focused");

    cy.get('[testId="profileImg"]').click();

    cy.get('input[testId="fileInput"]').attachFile("profilePhotoTest.jpg");

    cy.get("button[testId=updatePhoto]").click();
  });

  it("should open the file input when image is clicked and discard the changes", () => {
    cy.get('[testId="profileImg"]').click();

    cy.get('input[testId="fileInput"]').attachFile("profilePhotoTest.jpg");

    cy.get('button[testId="discard"]').click();
  });
});
