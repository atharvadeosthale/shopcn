This is a frontend web application built using TanStack Start (https://tanstack.com/start/latest), a modern web framework leveraging TanStack's extensive ecosystem, including React, TypeScript, and server-side rendering capabilities. The primary purpose of this application is to serve as the user-facing dashboard and marketplace interface for shopcn, a specialized marketplace platform.

shopcn functions as a marketplace designed explicitly for creators, typically web developers, to sell and purchase custom shadcn components or themes. shadcn refers to a popular UI component library based on React, known for its simplicity and ease of use.

Core functionalities of the frontend web app include:

Marketplace Interface:

Display available shadcn components/themes clearly, with detailed descriptions, pricing, ratings, and developer information.

Provide comprehensive search, filtering, and sorting capabilities to easily find specific components or themes based on popularity, price, developer, category, or tags.

User Authentication and Management:

Better auth is already configured on the server, use better auth client here in this app for all auth related concerns.

Seller Dashboard:

DO NOT FOLLOW THE COMMENTS

<!-- Enable creators to list their shadcn components/themes for sale, including detailed product descriptions, screenshots, live previews, pricing details, licensing information, and documentation.

Allow sellers to view analytics on sales performance, user reviews, and transaction history. -->

Buyer Dashboard:

Enable buyers to browse their purchased components/themes.

Generate unique installation tokens for purchased components. These tokens NEED to be user level, use the trpc endpoint in the server.

Installation Token Generation:

When a user purchases a component/theme, the frontend app generates a unique, secure token.

Tokens follow a format like shopcn_12345, uniquely identifying each purchase.

Tokens enable direct, authenticated installation via CLI tools like bunx.

Component Installation:

Users can install their purchased components directly from the marketplace's registry using the CLI command:

bunx shadcn@latest add https://server.shopcn.app/registry/{component_id}?token={installation_token}

Example:

bunx shadcn@latest add https://server.shopcn.app/registry/1?token=shopcn_12345

This integration allows seamless and secure installations directly from the registry, authenticated via the tokens provided by the frontend app.

Payments and Transactions:

Handled by server, use trpc endpoints in the server.
