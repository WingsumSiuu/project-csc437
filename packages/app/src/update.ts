import { Auth, Update } from "@calpoly/mustang";
import { User } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
    message: Msg,
    apply: Update.ApplyMap<Model>,
    user: Auth.User
) {
    switch (message[0]) {
        case "profile/save":
            saveProfile(message[1], user)
                .then((profile) =>
                    apply((model) => ({ ...model, profile }))
                )
                .then(() => {
                    const { onSuccess } = message[1];
                    if (onSuccess) onSuccess();
                })
                .catch((error: Error) => {
                    const { onFailure } = message[1];
                    if (onFailure) onFailure(error);
                });
            break;
        case "profile/select":
            selectProfile(message[1], user).then((profile) => {
                console.log("applying profile to model:", profile);
                apply((model) => ({ ...model, profile }));
                }
            );
            break;
        default:
            const unhandled: never = message[0];
            throw new Error(`Unhandled message "${unhandled}"`);
    }
}

function saveProfile(
    msg: {
        userid: string;
        profile: User;
    },
    user: Auth.User
) {
    return fetch(`/api/users/${msg.userid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user)
        },
        body: JSON.stringify(msg.profile)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            else
                throw new Error(
                    `Failed to save profile for ${msg.userid}`
                );
        })
        .then((json: unknown) => {
            if (json) return json as User;
            return undefined;
        });
}

function selectProfile(
    msg: { userid: string },
    user: Auth.User
) {
    return fetch(`/api/users/${msg.userid}`, {
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status === 200) {
                console.log("got it");
                return response.json();
            }
            console.log("no it");
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("Profile:", json);
                return json as User;
            }
        });
}

