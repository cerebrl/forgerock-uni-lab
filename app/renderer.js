import header from "./views/header.js";
import main from "./views/main.js";
import footer from "./views/footer.js";

export default function (el, state, content) {
  el.innerHTML = `
    ${header(state, content)}
    ${main(state, content)}
    ${footer(state, content)}
  `;
}