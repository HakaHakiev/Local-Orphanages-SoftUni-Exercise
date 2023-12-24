import { html } from "../../node_modules/lit-html/lit-html.js";
import { editMaterialById, getMaterialById } from "../api/data.js";

const editTemplate = (material, onSubmit) => html`
  <section id="edit-page" class="auth">
    <form id="edit" @submit=${onSubmit}>
      <h1 class="title">Edit Post</h1>

      <article class="input-group">
        <label for="title">Post Title</label>
        <input type="title" name="title" id="title" value="${material.title}" />
      </article>

      <article class="input-group">
        <label for="description">Description of the needs </label>
        <input type="text" name="description" id="description" value="${material.description}" />
      </article>

      <article class="input-group">
        <label for="imageUrl"> Needed materials image </label>
        <input type="text" name="imageUrl" id="imageUrl" value="${material.imageUrl}" />
      </article>

      <article class="input-group">
        <label for="address">Address of the orphanage</label>
        <input type="text" name="address" id="address" value="${material.address}" />
      </article>

      <article class="input-group">
        <label for="phone">Phone number of orphanage employee</label>
        <input type="text" name="phone" id="phone" value="${material.phone}" />
      </article>

      <input type="submit" class="btn submit" value="Edit Post" />
    </form>
  </section>
`;

export async function editPage(ctx) {
  const materialId = ctx.params.id;

  const material = await getMaterialById(materialId);
  ctx.render(editTemplate(material, onSubmit));

  async function onSubmit(material) {
    material.preventDefault();
    const formData = new FormData(material.target);

    const newMaterial = {
		title: formData.get("title"),
		description: formData.get("description"),
		imageUrl: formData.get("imageUrl"),
		address: formData.get("address"),
		phone: formData.get("phone"),
	  };

    if (Object.values(newMaterial).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editMaterialById(materialId, newMaterial);
    material.target.reset();
    ctx.page.redirect(`/details/${materialId}`);
  }
}
