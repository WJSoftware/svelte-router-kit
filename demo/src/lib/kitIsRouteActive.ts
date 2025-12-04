import { page } from "$app/state";

export function kitIsRouteActive(route: string): boolean {
    return page.url.pathname === route;
}
