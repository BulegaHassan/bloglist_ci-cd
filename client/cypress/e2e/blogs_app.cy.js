describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Hassan Bulega",
      username: "hasgo",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("hasgo");
      cy.get("#password").type("salainen");
      cy.get("#login").click();
      cy.contains("Hassan Bulega logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("hasgo");
      cy.get("#password").type("wrong");
      cy.get("#login").click();
      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Hassan Bulega logged in");
    });
  });
  describe("When logged in", function () {
    const blog = {
      title: "fsopen teaches testing",
      author: "hassan bulega",
      url: "www.hasgo.com/heteaches",
      likes: 13,
      user: {
        name: "Abu",
      },
    };
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("hasgo");
      cy.get("#password").type("salainen");
      cy.get("#login").click();
    });
    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type(blog.title);
      cy.get("#author").type(blog.author);
      cy.get("#url").type(blog.url);
      cy.get("#create").click();
      cy.contains(blog.author);
      cy.contains(blog.title);
      // cy.contains(blog.url);
    });
  });
});
