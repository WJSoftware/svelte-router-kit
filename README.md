# @svelte-router/kit

> Hash router for Sveltekit projects

This is an extension package of the [@svelte-router/core](https://github.com/WJSoftware/svelte-router-core) SPA router, and enables the use of the router in hash mode in Sveltekit projects.

## Why Would I Need This?

Sveltekit has an excellent file-based router.  You should always stick to the built-in router for routing your application.  However, as with every other router in existence, you can only do path routing or hash routing, but not both.

The `@svelte-router/core` router was born to break this barrier:  This SPA router can do path and hash routing simultaneously.  However, this is a router for SPA's and PWA's that render on the client.  It was not designed for SSR scenarios.  After all, Sveltekit has routing capabilities included.

But what if you wanted to do hash routing on top of Sveltekit's path routing?  You can today, with this router extension.

### Useful Scenarios

1. You could show a complex dialog box that is driven by hash routing.
2. You could mount a micro-frontend that routes with a path in the hash.
3. You could drive your tabs components with individual named hash paths (this is demonstrated in this repository's demo project).

## Quickstart

1. Install the package
    ```bash
    npm install @svelte-router/kit # This also installs the @svelte-router/core main package
    ```
2. Initialize the library.  Ideally, in the root `+layout.svelte` component:
    ```svelte
    <script lang="ts">
        import { init } from "@svelte-router/kit";

        init(/* options */);
    </script>
    ```
3. Add routers, routes and links for hash navigation as you please.  Note that these are still imported from the core package, `@svelte-router/core`.

> **⚡ Attention!**
> 
> Early testing has revealed what may or may not be a bug in Svelte or Sveltekit.  The situation:  Just importing `init` from `@svelte-router/kit` triggers error `rune_outside_svelte` on the `trace.svelte.js` file in the `@svelte-router/core` package.  To overcome this, just add `{ ssr: { noExternal: ["@svelte-router/core"] }}` to Vite's configuration.
>
> Hopefully, I'll be able to figure more about this problem in the coming weeks.

## Limitations

1. Path routing is disallowed.

---

Generally speaking, you need to understand the `@svelte-router/core` router, so have handy its [online documentation](https://wjfe-n-savant.hashnode.space/).
