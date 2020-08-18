import page from "./_static/js/page.js";
import { auth } from "./middleware.js";
import render from "./renderer.js";
import request from "./request.js";
import state from "./state.js";

export default function (el) {
  // Handles home/root route
  page("/", function initialDisplay() {
    render(el, state, {
      title: state.authenticated ? "Hello, again!" : "Hello, visitor!",
      message: state.authenticated
        ? 'Welcome back! Enjoy our <a href="/catalog">new catalog of movies</a>.'
        : '<a href="/login">Sign in</a> or register to watch some amazing content!!',
    });
  });

  // Protects (via the auth middleware) and handles the catalog route
  page("/catalog", auth, async function catalog() {
    // Request the movie catalog from our resource API
    const { title, message } = await request('movies');

    render(el, state, {
      title,
      message,
    });
  });

  // Handles the login route
  page("/login", async function login() {
    console.log("In: login");

    render(el, state, {
      title: "Welcome. Please enter your credentials:",
      message: "",
    });

    const frui = new forgerock.FRUI({ targetId: "page_body" });
    const result = await frui.getSession();

    console.log(result);

    if (result.type === "LoginSuccess") {
      console.log("In: successful_login");

      state.authenticated = true;

      render(el, state, {
        title: "Welcome! Enjoy our great offering!",
        message: `Your sso token is: ${result.getSessionToken()}`,
      });
    } else {
      console.log("In: failed_login");

      render(el, state, {
        title: "Authentication failed!",
        message: `The failure message is: ${result.getMessage()}`,
      });
    }
  });

  // Handles logout route
  page("/logout", async function logout() {
    console.log("In: logout");

    try {
      await forgerock.SessionManager.logout();
      state.authenticated = false;

      render(el, state, {
        title: "You are logged out. See you again soon!",
        message:
          '<a href="/login">Sign in</a> or register to watch some amazing content!!',
      });
    } catch (error) {
      console.error(error);
    }
  });

  page({ hashbang: true });
}
