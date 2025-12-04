const querySelectors = [
    'button',
    '[href]',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])'
];

const querySelector = querySelectors.reduce((acc, cur) => {
    return acc + `,${cur}:not([disabled]):not([data-avoid-autofocus])`;
}, '').substring(1);

/**
 * Svelte attachment that automatically focuses the first focusable element within the given node, or the node itself 
 * if none found.
 * 
 * ### Avoiding Auto-Focus
 * 
 * If you want to avoid auto-focusing an element, you can add the `data-avoid-autofocus` attribute to it or any of its ancestors.
 * 
 * @param node The HTML element to focus within.
 */
export function autoFocus(node: HTMLElement) {
    const firstFocusable = node.querySelector<HTMLElement>(querySelector);
    console.log('Auto-focusing', firstFocusable);
    (firstFocusable ?? node).focus();
}
