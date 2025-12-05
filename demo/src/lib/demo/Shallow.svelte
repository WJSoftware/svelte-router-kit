<script lang="ts">
    import { autoFocus } from '$lib/bulma/attach/auto-focus';
    import Content from '$lib/bulma/Content.svelte';
    import Message from '$lib/bulma/Message.svelte';
    import { Modal } from '$lib/bulma/Modal';
    import hashMode from '$lib/state/hashMode.svelte';
    import { Link, location, type Hash } from '@svelte-router/core';

    type Props = {
        hash: Hash;
        state: { isOpen: boolean };
    };

    let { hash, state }: Props = $props();

    function closeDialog() {
        location.back();
    }
</script>

<Content>
    <h3>Shallow Routing</h3>
    <p>
        Shallow routing is navigating to the current URL, without any change, to trigger something, which in Svelte's
        case usually is the history state data. You can read more about the subject
        <a href="https://svelte.dev/docs/kit/shallow-routing" target="_blank" rel="noopener noreferrer">
            in the SvelteKit documentation
        </a>.
    </p>
    <p>
        Sveltekit's documentation explicitly gives the example of using shallow routing to open or close a modal dialog
        because, in mobiles, users can naturally use the <em>Back</em> button to close the dialog.
    </p>
    <p>
        Dialogs are a great use case for <code>@svelte-router/kit</code>. You could route your application with
        Sveltekit's path routing, and use <code>@svelte-router/kit</code>'s hash routing to open and close modal
        dialogs, instead of using history state. Or, you could use history state as directed in the Sveltekit document
        and use
        <code>@svelte-router/kit</code>'s hash routing to drive complex content inside the dialog.
    </p>
    <Link class="button is-primary" {hash} preserveQuery href="" state={{ isOpen: true }}>Open Modal</Link>
</Content>
{#if state?.isOpen}
    <Modal.Root open onClose={closeDialog} {@attach autoFocus} noScroll>
        <Modal.Card>
            {#snippet header()}
                <Modal.Title>Modal Title</Modal.Title>
            {/snippet}
            <Content>
                {#if hashMode.isMultiHash}
                    <p>This is the modal for hash path: <strong>{hash}</strong></p>
                {:else}
                    <p>This is the modal body.</p>
                {/if}
                <input type="text" class="input" placeholder="Focus is set here automatically" />
                <p>
                    The modal was opened using shallow routing, which updated the history state data, but did not change
                    the URL path or hash.
                </p>
                <p>
                    You can close the modal by clicking the close button, clicking outside the modal, hitting the
                    <code>Escape</code> key, or using your browser's <em>Back</em> button. The point of this exercise is
                    to demonstrate that the <em>Back</em> button works as expected.
                </p>
                <Message>
                    <h5>Fun Fact</h5>
                    <p>
                        All methods of closing the modal trigger a call to <code>location.back()</code>, which reverts
                        the history state to the previous one, effectively closing the modal.
                    </p>
                    <p>
                        No matter how you close the modal, it can be reopened by clicking the browser's <em>Forward</em>
                        button.
                    </p>
                </Message>
            </Content>
        </Modal.Card>
    </Modal.Root>
{/if}
