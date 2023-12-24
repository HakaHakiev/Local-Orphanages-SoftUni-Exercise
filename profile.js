import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyPosts } from "../api/data.js";

const profileTemplate = (postList) => html`
  <section id="my-posts-page">
    <h1 class="title">My Posts</h1>
    <!-- Display a div with information about every post (if any)-->
    ${postList.length == 0
      ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>`
      : postList.map(
          (p) => html` <div class="my-posts">
            <div class="post">
              <h2 class="post-title">${p.title}</h2>
              <img
                class="post-image"
                src="${p.imageUrl}"
                alt="Material Image"
              />
              <div class="btn-wrapper">
                <a href="/details/${p._id}" class="details-btn btn">Details</a>
              </div>
            </div>
          </div>`
        )}
  </section>
`;

export async function profilePage(ctx) {
  const user = ctx.user._id;
  const postList = await getMyPosts(user);
  console.log(postList);

  ctx.render(profileTemplate(postList));
}
