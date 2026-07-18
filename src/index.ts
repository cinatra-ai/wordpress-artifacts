import type { SemanticArtifactManifest } from "@cinatra-ai/sdk-extensions";

// `@cinatra-ai/wordpress-artifacts` — the WordPress external-pointer artifact
// PACK (epic cinatra#1448, built for #1464). In HYBRID mode (descriptor +
// claims) it CLAIMS the atomic WordPress object type under the provider-neutral
// `@cinatra-ai/wordpress` namespace:
//
//   - wordpress:post [external] — a connector-owned POINTER to a
//     WordPress-canonical post. The canonical content lives in WordPress; the
//     row is a bare-identity pointer (url + connector/external ids + light
//     display metadata) whose body is read on demand through the
//     wordpress-mcp-connector facade, never persisted. Its reference state
//     (`linked → stale → dangling`) is moved ONLY by connector verification /
//     sync (the connectorRef external-pointer lifecycle, cinatra#1451). The
//     pointer is `pinnable:false` and never context-selectable — you capture a
//     SNAPSHOT (a new, independent record-class artifact) and pin that instead.
//     (Later design notes: `wordpress:page`, `wordpress:media`.)
//
// NOT this pack: cinatra-AUTHORED blog content stays `blog-post-artifact` (a
// connector-independent category). Two different types, no ambiguity — a
// `wordpress:post` pointer is the external, WordPress-canonical post; a
// `blog-post-artifact` is the cinatra-authored draft the blog pipeline
// publishes. This issue does not migrate existing blog-pipeline publish state.
//
// The claim (kind, per-claim dispositions incl. the `external` mutability
// class, and the inline row JSON Schema it carries as its schema-source) is the
// manifest of record in `package.json` `cinatra.artifact.objectTypes`; the
// object-registry bridge reads it there. The `@cinatra-ai/wordpress:post` TYPE
// registrar itself stays host-side (exactly one runtime registrar per type —
// this claim adds only disposition / mutability class / arbitration, never a
// second registrar). This typed export mirrors only the DESCRIPTOR half — the
// representation form the pointer takes (`connectorRef`, resolving to
// `text/html`) — the SDK `SemanticArtifactManifest` contract the bridge
// type-checks the descriptor against.
//
// No `accepts.file` and no matcher skill: a `wordpress:post` is never a
// classified upload — it is materialized by the connector's post-published sync
// as a pointer row, not matched from a library file.
export const wordpressArtifactsManifest: SemanticArtifactManifest = {
  accepts: {
    connectorRef: {
      resolvedMimeTypes: ["text/html"],
    },
  },
};
