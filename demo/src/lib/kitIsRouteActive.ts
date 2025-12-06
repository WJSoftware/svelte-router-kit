import { resolve,  } from "$app/paths";
import { page } from "$app/state";

export function kitIsRouteActive(route: Parameters<typeof resolve>[0]): boolean {
    return page.url.pathname === resolve(route);
}
