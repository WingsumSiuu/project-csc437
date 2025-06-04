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
    stats: MobStats;
}

export interface MobStats {
    health: number;
    damage: number;
    drop: number;
}