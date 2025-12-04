<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        open?: boolean;
        noScroll?: boolean | string | HTMLElement;
        onClose?: (e: Event) => void;
    };

    let { open = false, noScroll = true, onClose, class: cssClass, onkeydown, children, ...restProps }: Props = $props();
    let target = $derived(noScroll === true ?
        document.scrollingElement :
        (typeof noScroll === 'string' ? document.querySelector(noScroll) : noScroll)
    );
    let modalRoot = $state<HTMLDivElement>();

    $effect(() => {
        if (noScroll && target) {
            const t = target;
            t.classList.add('is-clipped');
            return () => t.classList.remove('is-clipped');
        }
    });

    $effect.pre(() => {
        if (open && !modalRoot?.contains(document.activeElement)) {
            modalRoot?.focus();
        }
    });

    function handleClose(event: Event) {
        onClose?.(event);
    }

    function handleKeydown(event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) {
        onkeydown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === 'Escape' && open) {
            event.preventDefault();
            handleClose(event);
        }
    }
</script>

<div
    bind:this={modalRoot}
    class={["modal", { 'is-active': open }, cssClass]}
    {...restProps}
    tabindex="-1"
    onkeydown={handleKeydown}
>
    <div
        class="modal-background"
        role="button"
        tabindex="0"
        onkeydown={(e) => e.code === 'Enter' && handleClose(e)}
        onclick={handleClose}
        data-avoid-autofocus
    ></div>
    {@render children?.()}
    <button class="modal-close is-large" aria-label="close" onclick={handleClose}></button>
</div>
