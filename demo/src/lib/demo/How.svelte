<script lang="ts">
    import { isColors } from "$lib/bulma/common";
    import Content from "$lib/bulma/Content.svelte";
    import Notification from "$lib/bulma/Notification.svelte";

</script>
<Content role="tabpanel">
    <h3>How It Works</h3>
    <p>
        Pertaining the component, it is a Bulma-styled <code>Tabs</code> component.  It has a simple structure:  A 
        list of tabs, each of which is a link, and content for each tab.  If you want all details, maybe head to the 
        component's <a target="_blank" rel="noopener noreferrer" href="https://bulma.io/documentation/components/tabs/">
            documentation page
        </a>.
    </p>
    <p>
        We have decided that each of the links will update the hash path in the URL when clicked, and that the content
        shown will depend on the current hash path.  This is accomplished using the <code>@svelte-router/core</code>'s
        <code>&lt;Router&gt;</code> and <code>&lt;Route&gt;</code> components, which work together to manage the
        routing and display the appropriate content for each tab.
    </p>

    <h4>The "Active" Look on Tabs</h4>
    <p>
        The "active" look on the tabs is achieved by using <code>@svelte-router/core</code>'s <code>activeBehavior()</code>
        attachment factory to add the Bulma-specific <code>is-active</code> class to each tab's list item element.
    </p>
    <Notification isColor={isColors.danger}>
        <h4>Why not use the <code>&lt;Link&gt;</code> component's <code>activeFor</code> + <code>activeState</code> properties?</h4>
        <p>
            In <strong>Bulma</strong>, the "active" look on the <code>Tabs</code> component is applied to the list item
            (<code>&lt;li&gt;</code>) that contains the link, not to the link (<code>&lt;a&gt;</code>) itself.  The 
            <code>&lt;Link&gt;</code> component's "active" feature applies the "active" look to the link, which is not 
            what we want.
        </p>
    </Notification>
</Content>
