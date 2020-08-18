export default function (state, content) {
  return `
    <div class="container">
      <section id="content">
        <div class="featured_slider">
          <h2 id="page_header" class="featured_title">${content.title}</h2>
          <div id="page_body">${content.message}</div>
        </div>
      </section>
    </div>
  `;
};
