export interface Bear {
    bearname: string;
    desc: string;
    image: string;
    quests: Quest[];
}

export interface Quest {
    title: string;
    tasks: string[];
    reward: string;
}