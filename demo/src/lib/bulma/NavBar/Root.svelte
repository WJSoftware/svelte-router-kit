<script module>
    import { createContext } from 'svelte';

    export class NavBarContext {
        menuActive = $state(false);
        closeOnLinkClick = $state(true);
    }

    export const [getNavBarCtx, setNavBarCtx] = createContext<NavBarContext>();
</script>
<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = HTMLAttributes<HTMLElement> & {
        fixed?: 'top' | 'bottom' | undefined;
        transparent?: boolean;
        closeOnLinkClick?: boolean;
    };

    let { fixed, transparent, closeOnLinkClick = true, class: cssClass, children, ...restProps }: Props = $props();

    const navBarCtx = new NavBarContext();
    setNavBarCtx(navBarCtx);

    $effect.pre(() => {
        navBarCtx.closeOnLinkClick = closeOnLinkClick;
    });

    $effect(() => {
        if (!fixed) {
            return;
        }
        const appliedClass = `has-navbar-fixed-${fixed}`;
        document.body.classList.add(appliedClass);
        return () => {
            document.body.classList.remove(appliedClass);
        };
    });
</script>

<nav
    class={['navbar', { [`is-fixed-${fixed}`]: !!fixed, 'is-transparent': transparent }, cssClass]}
    {...restProps}
>
    {@render children?.()}
</nav>
