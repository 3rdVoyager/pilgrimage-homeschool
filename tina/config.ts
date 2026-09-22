import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // Start with About while we connect the real page renderer.
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages",
        format: "json",
        match: {
          include: "about",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Page description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: {
              itemProps: (item) => {
                return {
                  label:
                    item?.title ||
                    `${item?.variant || "white"} section`,
                };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section title",
                required: true,
              },
              {
                type: "string",
                name: "variant",
                label: "Section color",
                options: ["blue", "gold", "white", "burgundy-light"],
              },
              {
                type: "object",
                name: "blocks",
                label: "Content blocks",
                list: true,
                templateKey: "type",
                templates: [
                  {
                    name: "text",
                    label: "Rich text",
                    fields: [
                      {
                        type: "rich-text",
                        name: "content",
                        label: "Content",
                        overrides: {
                          toolbar: [
                            "heading",
                            "bold",
                            "italic",
                            "link",
                            "ul",
                            "ol",
                          ],
                          headingLevels: ["h1", "h2", "h3"],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
        },
      },
    ],
  },
});
