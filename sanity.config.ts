import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./studio/schemas";
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
if (!projectId || !dataset)
  throw new Error(
    "Set SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET in .env before starting Studio. See docs/cms.md.",
  );
export default defineConfig({
  name: "alder-house",
  title: "Alder House",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Alder House")
          .items([
            S.listItem()
              .title("Studio copy")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("studio-copy"),
              ),
            S.documentTypeListItem("album").title("Portfolio stories"),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
