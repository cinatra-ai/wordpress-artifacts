# WordPress Artifacts

The WordPress external-pointer artifacts pack for Cinatra. It makes every WordPress post an addressable artifact in your library as a live pointer to the canonical post in WordPress — the post's body stays in WordPress and is read on demand, while the library row keeps only its identity, link, and a light title/excerpt.

Install this pack via the Cinatra marketplace and connect a WordPress site with the WordPress MCP connector. Once connected, each post surfaces as a `wordpress:post` pointer whose reference state tracks the upstream post: `linked` while it resolves and is in sync, `stale` once it changes in WordPress, and `dangling` if it is deleted (the pointer is kept, never silently removed, so history and any captured snapshots survive and a later sync can re-link it). A pointer is not pinnable — to keep a fixed copy for context or reference, capture a snapshot, which materializes the post content into a new, independent record artifact that stays servable even after the pointer is gone. For local development, run `node extension-kind-gate.mjs --package-root .` at the repo root and confirm zero errors before submitting to the marketplace.

Cinatra-authored blog content is a different thing and stays a `blog-post-artifact` — the draft your blog pipeline publishes — with no ambiguity between the two.

## Works with

- WordPress MCP connector (writes and syncs the post pointers)
- WordPress agent

## Capabilities

- Surface every WordPress post as an addressable artifact without copying its body into Cinatra
- Open any post in WordPress from its library row
- See at a glance whether a post is in sync, has drifted, or has been deleted upstream
- Capture a snapshot of a post's content as an independent, permanent record artifact
- Attach a WordPress post pointer as reference context when briefing an agent
