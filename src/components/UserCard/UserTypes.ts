export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    address: string;
    avatar: string;
}

export type UserCardProps = {
    user: User;
    onDelete: (id: string) => void;
}

export type ResponseUser = {
    name: { first: string, last: string };
    email: string;
    login: {
        uuid: string;
    };
    dob: { date: string };
    phone: string;
    picture: {
        large: string;
    }
    location: {
        city: string;
        state: string;
        country: string;
    }
}

export type Response = {
    results: ResponseUser[];
}
