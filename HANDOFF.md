# Handoff: Din LCA Hjælper website

## Current commercial decisions

- Din LCA Hjælper sells complete, verified LCA calculations as a consulting service.
- Do not mention, link to, bundle, or promote the deferred software brand on the website.
- A complete detached house or summer house normally costs 5,000-7,000 DKK excluding VAT.
- Terraced, linked, semi-detached, and multi-unit housing starts at 8,000 DKK excluding VAT and must be quoted manually.
- The public/default service is LCA Komplet. A discount of up to 1,000 DKK is conditional on receiving a usable structured quantity takeoff that has been reviewed and confirmed.
- Simple commercial projects may use the existing price formula. Complex commercial projects are quoted manually.
- A4 and A5 remain part of the service. Early calculations use documented generic assumptions. At completion, update the calculation with final quantities and recorded site consumption such as electricity, heat, gas, and fuel.

## Website guardrails

- Keep all visible pages, metadata, structured data, `llms.txt`, `llms-full.txt`, and `ai.txt` aligned with the pricing above.
- Never present 4,000 DKK as the general starting price.
- Keep detached houses and terraced housing as separate calculator categories.
- Do not publish a fixed rowhouse formula until enough completed cases support one.
- Run tests, lint, prerender, and browser verification before deployment.
- Verify the production domain after deployment, including calculator behavior and crawler-facing content.

## Stack and deployment

- React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and `react-helmet-async`.
- Vercel serves the prerendered `dist` output.
- Use `npm run build:prerender` for the production build.
