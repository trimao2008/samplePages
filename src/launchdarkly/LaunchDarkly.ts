export class LaunchDarkly {
    items : LaunchDarklyItem[] | undefined;

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.items) this.items = initializer.items;
    }
}

interface LaunchDarklyItem {
    description: string;
    deprecated: boolean;
    name: string;
    tags: string[];
    key: string;
    environments: Environments;
}

interface Environments {
    [key: string]: {
        on: boolean;
        trackEvents: boolean;
        version: number;
    }
}
