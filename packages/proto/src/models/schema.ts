export interface Egg {
    eggname: string;
    cost: string;
    imgsrc: string,
    rarity: number[];
}

export interface Bee {
    "beename": string;
    "rarity": string;
    "desc": string;
    "ability": string;
    "imgsrc": string;
    "stats": string[];
}

export interface Field {
    fieldname: string;
    desc: string;
    image: string;
    mobs?: Mob[];
    flowers: string[];
}

export interface Mob {
    mobname: string;
    level: number;
    image: string;
    stats: Record<string, number>;
}

