import { createClient } from "@sanity/client";
import { albums, settings, type Album } from "./demo";

export async function getContent(): Promise<{
  albums: Album[];
  settings: typeof settings;
}> {
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    if (import.meta.env.PUBLIC_SANITY_DATASET)
      throw new Error(
        "Set PUBLIC_SANITY_PROJECT_ID together with PUBLIC_SANITY_DATASET.",
      );
    return { albums, settings };
  }
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET;
  if (!dataset)
    throw new Error("PUBLIC_SANITY_DATASET is required in CMS mode.");
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2025-09-01",
    useCdn: false,
  });
  const photograph = '{"src": asset->url, alt, hotspot}';
  const content = await client.fetch<{
    albums: Album[];
    settings: typeof settings;
  }>(`{
    "albums": *[_type == "album" && published == true] | order(_createdAt desc) {
      title, "slug": slug.current, category, location, description,
      "cover": coverImage${photograph}, "images": images[]${photograph}
    },
    "settings": *[_type == "siteSettings"][0]{headline, introduction, story}
  }`);
  if (
    !content.settings?.headline ||
    !content.settings.introduction ||
    !content.settings.story
  )
    throw new Error(
      "Publish complete site settings in Sanity before building.",
    );
  const slugs = new Set<string>();
  for (const album of content.albums) {
    if (
      !album.title ||
      !album.category ||
      !album.location ||
      !album.description ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(album.slug) ||
      slugs.has(album.slug) ||
      !album.cover?.src ||
      !album.cover.alt ||
      !album.images?.length ||
      album.images.some((image) => !image.src || !image.alt)
    )
      throw new Error(
        `Incomplete or duplicate published album: ${album.title}`,
      );
    slugs.add(album.slug);
  }
  return content;
}
