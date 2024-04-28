export type user = {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    address: string;
}

export type UserCardProps = {
    user: user;
    toggle: boolean
    onDelete: () => void;
}

export type ResponseUser = {
    result: {
        name: { first: string, last: string };
        email: string;
        login: {
            uuid: string;
        };
        dob: { date: string };
        phone: string;
        picture: {
            large: string,
        }
        location: {
            city: string,
            state: string,
            country: string,
        }
    }
}
