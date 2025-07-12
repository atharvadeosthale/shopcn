# shopcn

The project shopcn is being made so that people can sell their shadcn UI components and templates to other people. It's an open-source shop for them to monetize their components and templates

## Vague overview on how the shop works

- Creator can run CLI commands to add component/template to registry
- Purchaser can purchase said component/template and get a token
- The token can be used with shadcn CLI, appending to the registry URL and if the token is correct, the registry data can be given to shadcn CLI for further processing.
- The token is a time-based token, it auto-expires after a certain amount of time.

## Technical details

- Bun for package manager
- Use tailwind styling
- Do not run dev server, I will run that manually
- No comments in code AT ALL, NO EXCEPTIONS!
- Use shadcn-ui components wherever possible (command is `bunx shadcn@latest`)
- No yapping, do the job and only talk when necessary, no stupid summaries at the end
- Every design made must be thoughtful, modern, aesthetically pleasing, no unnecessary gradients. Every design decision must lead to clean code and intentional design.
- Every line of code must be principal level engineer level code.

- `web` is the landing page of the project, it has nothing to do with the app itself, this will be the main landing page website promoting the shopcn open-source project.
