import { defineConfig, type Template } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const createTextBlockTemplate = (): Template => ({
  name: "text",
  label: "Rich text",
  fields: [
    {
      type: "rich-text",
      name: "content",
      label: "Content",
      required: true,
      overrides: {
        toolbar: ["heading", "bold", "italic", "link", "ul", "ol"],
        headingLevels: ["h1", "h2", "h3"],
      },
    },
  ],
});

const createImageBlockTemplate = (): Template => ({
  name: "image",
  label: "Image",
  fields: [
    { type: "image", name: "src", label: "Image", required: true },
    { type: "string", name: "alt", label: "Alt text", required: true },
  ],
});

const createButtonBlockTemplate = (): Template => ({
  name: "button",
  label: "Button",
  fields: [
    { type: "string", name: "label", label: "Button label", required: true },
    { type: "string", name: "href", label: "Link", required: true },
    {
      type: "string",
      name: "variant",
      label: "Button style",
      required: true,
      options: ["burgundy", "gold"],
    },
    {
      type: "boolean",
      name: "external",
      label: "Open in new tab",
      required: true,
    },
  ],
});

const createCardGridTemplate = (): Template => ({
  name: "card_grid",
  nameOverride: "card-grid",
  label: "Card grid",
  fields: [
    {
      type: "string",
      name: "grid",
      label: "Grid width",
      required: true,
      options: ["compact", "standard", "wide"],
    },
    {
      type: "object",
      name: "cards",
      label: "Cards",
      list: true,
      fields: [
        {
          type: "string",
          name: "variant",
          label: "Card style",
          required: true,
          options: ["blue", "gold", "white", "burgundy-light"],
        },
        {
          type: "object",
          name: "blocks",
          label: "Card content",
          list: true,
          templateKey: "type",
          templates: [
            createTextBlockTemplate(),
            createImageBlockTemplate(),
            createButtonBlockTemplate(),
          ],
        },
      ],
    },
  ],
});

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
      mediaRoot: "assets/",
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
          include: "*",
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
            required: true,
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
                required: true,
                options: ["blue", "gold", "white", "burgundy-light"],
              },
              {
                type: "object",
                name: "blocks",
                label: "Content blocks",
                list: true,
                templateKey: "type",
                templates: [
                  createTextBlockTemplate(),
                  createImageBlockTemplate(),
                  createButtonBlockTemplate(),
                  createCardGridTemplate(),
                ],
              },
            ],
          },
        ],
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
        },
      },
      {
        name: "site",
        label: "Site settings",
        path: "src/content",
        format: "json",
        match: {
          include: "site",
        },
        fields: [
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: [
              {
                type: "string",
                name: "siteName",
                label: "Site name",
                required: true,
              },
              {
                type: "string",
                name: "logoAlt",
                label: "Logo alt text",
                required: true,
              },
              {
                type: "object",
                name: "navItems",
                label: "Navigation",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.label || "Navigation item",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link",
                  },
                  {
                    type: "object",
                    name: "items",
                    label: "Dropdown links",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.label || "Dropdown link",
                      }),
                    },
                    fields: [
                      {
                        type: "string",
                        name: "label",
                        label: "Label",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "href",
                        label: "Link",
                        required: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                name: "columns",
                label: "Link columns",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.title || "Footer link column",
                  }),
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Column title",
                    required: true,
                  },
                  {
                    type: "object",
                    name: "links",
                    label: "Links",
                    list: true,
                    ui: {
                      itemProps: (item) => ({
                        label: item?.label || "Footer link",
                      }),
                    },
                    fields: [
                      {
                        type: "string",
                        name: "label",
                        label: "Label",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "href",
                        label: "Link",
                      },
                    ],
                  },
                ],
              },
              {
                type: "string",
                name: "copyright",
                label: "Copyright text",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
