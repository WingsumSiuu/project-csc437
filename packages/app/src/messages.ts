import { User } from "server/models";

export type Msg =
    | [ "profile/select", { userid: string }]
    | [ "profile/save",
    {
        userid: string;
        profile: User;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
    }
];