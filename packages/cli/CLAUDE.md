# shopcn CLI

This is a CLI project. This should use tsup and other popular libraries to create a CLI.

This CLI is used by admins to add shadcn component registry JSON files to their shopcn servers.

## Detailed breakdown

- This should use TRPC as the backend. The TRPC instance for the server is in [here](../../apps/server/src/trpc/).
- The CLI should also have a help command, like `npx shopcn@latest help` which lists all commands.
- The main point to add components is `npx shopcn@latest add registry.json`. This should use the TRPC method to create a draft and open the draft URL in the browser.
- If the user is not authenticated though, which is the case when running the CLI first time, you should prompt them to run `npx shopcn@latest login`.
- This `login` command should accept one thing, their server URL.
- Then the `getCliAuthUrl()` should be called to get the frontend for the auth.
- Open the link in the browser and make the CLI in a state where it asks for an API key. The user will continue authentication in browser and generate one. They will then paste it in the terminal.
- Run the `validateApiKey()` to check if it really is correct API key.
- Store the server URL and API key in a global storage (look up on how popular CLI tools do it).
- Next time if some authentication error happens, remove server url and API key from storage and ask user to run `login` command again.
- If the user is logged in, the `add` command will create a draft using TRPC endpoints and will get back the URL (check the response format), and the browser should automatically open, and CLI can safely terminate now. The file that the admin passes as a parameters should be read and fed to the TRPC endpoint.
- Make sure you go ahead and read all the related server files before you start the task as these are important.
- We are using turborepo, but this CLI tool is externally accessible, so use tsup for bundling and everything.
- The CLI tool must be aesthetically pleasing and modern, please use the design styles that other popular CLIs use.

## List of commands

- help: every command and descriptions
- login: authentication for admins
- add: create a draft for admins
