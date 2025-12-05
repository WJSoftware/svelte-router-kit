<script lang="ts">
    import { isColors } from "$lib/bulma/common";
    import Content from "$lib/bulma/Content.svelte";
    import CodeSnippet from "$lib/CodeSnippet.svelte";
    import { xml } from "svelte-highlight/languages/xml";
    import "svelte-highlight/styles/brewer.css";

    const code = `<Router>
  {#snippet children({ state, rs })}
    <Tabs>
      <LinkContext prependBasePath>
        <li role="tab" {@attach activeBehavior(rs, { key: 'intro', class: 'is-active' })}>
          <Link href="/">Intro</Link>
        </li>
        <li role="tab" {@attach activeBehavior(rs, { key: 'how', class: 'is-active' })}>
          <Link href="/how">How It Works</Link>
        </li>
        <li role="tab" {@attach activeBehavior(rs, { key: 'in-code', class: 'is-active' })}>
          <Link href="/in-code">In Code</Link>
        </li>
      </LinkContext>
    </Tabs>
    <Route key="intro" path="/">
      <Intro />
    </Route>
    <Route key="how" path="/how">
      <How />
    </Route>
    <Route key="in-code" path="/in-code">
      <InCode />
    </Route>
    <FallbackContent /> <!-- Contains <KitFallback> internally -->
  {/snippet}
</Router>`;
</script>

<Content role="tabpanel">
    <h3>Structure In Code</h3>
    <CodeSnippet title="Markup Overview (Simplified)" {code} language={xml} />
</Content>