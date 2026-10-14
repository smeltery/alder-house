import { defineArrayMember, defineField, defineType } from "sanity";
const requiredText = (
  name: string,
  title: string,
  type: "string" | "text" = "string",
) => defineField({ name, title, type, validation: (rule) => rule.required() });
const imageFields = [
  requiredText("alt", "Describe this photograph for screen readers"),
];
export const schemaTypes = [
  defineType({
    name: "siteSettings",
    title: "Studio copy",
    type: "document",
    fields: [
      requiredText("headline", "Home headline"),
      requiredText("introduction", "Home introduction", "text"),
      requiredText("story", "Our story", "text"),
    ],
    preview: { prepare: () => ({ title: "Alder House studio copy" }) },
  }),
  defineType({
    name: "album",
    title: "Portfolio story",
    type: "document",
    initialValue: { published: false },
    fields: [
      requiredText("title", "Title"),
      defineField({
        name: "slug",
        title: "URL name",
        type: "slug",
        options: { source: "title", maxLength: 80 },
        validation: (rule) =>
          rule
            .required()
            .custom(
              (value) =>
                !value?.current ||
                /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) ||
                "Use lowercase words separated by hyphens.",
            ),
      }),
      requiredText("category", "Category"),
      requiredText("location", "Location caption"),
      requiredText("description", "Story introduction", "text"),
      defineField({
        name: "coverImage",
        title: "Cover photograph",
        type: "image",
        options: { hotspot: true },
        fields: imageFields,
        validation: (rule) => rule.required().assetRequired(),
      }),
      defineField({
        name: "images",
        title: "Gallery photographs",
        description:
          "Add the full session, then drag photographs into viewing order. Each image opens in the full-screen viewer.",
        type: "array",
        of: [
          defineArrayMember({
            type: "image",
            options: { hotspot: true },
            fields: imageFields,
            validation: (rule) => rule.assetRequired(),
          }),
        ],
        validation: (rule) => rule.required().min(1),
      }),
      defineField({
        name: "published",
        title: "Show in the public portfolio",
        type: "boolean",
        description: "Only enable for photographs cleared for public display.",
      }),
    ],
  }),
];
