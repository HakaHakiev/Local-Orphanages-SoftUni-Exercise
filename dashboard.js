import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllMaterials } from "../api/data.js";

const dashboardTemplate = (materials) => html`
  <section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    <!-- Display a div with information about every post (if any)-->
    ${materials.length == 0
      ? html`<h1 class="title no-posts-title">No posts yet!</h1>`
      : materials.map(
          (m) => html`<div class="all-posts">
            <div class="post">
              <h2 class="post-title">${m.title}</h2>
              <img
                class="post-image"
                src="${m.imageUrl}"
                alt="Material Image"
              />
              <div class="btn-wrapper">
                <a href="/details/${m._id}" class="details-btn btn">Details</a>
              </div>
            </div>
          </div>`
        )}
  </section>
`;

export async function dashboardPage(ctx) {
  const materials = await getAllMaterials();
  console.log(materials);
  ctx.render(dashboardTemplate(materials));
}
