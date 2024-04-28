import { useEffect, useState } from 'react';

import { ResponseUser, user } from '../UserCard/UserTypes';
import { UserCard } from '../UserCard/UserCard';
import { cnUserList } from './UserList.classname';

import './UserList.css';

const fieldSorting = (data: ResponseUser[]): user[] => {
    const sortedData = [];
    for (let card of data) {
        sortedData.push(
            {
                id: card.result.login.uuid,
                name: card.result.name.first + ' ' + card.result.name.last,
                email: card.result.email,
                phone: card.result.name.first,
                birthday: card.result.dob.date,
                address: card.result.location.city + ',' + card.result.location.state + ',' + card.result.location.country,
            }
        )
    }

    return sortedData;
}

const UserList = () => {
    const [userList, setUserList] = useState<user[]>([]);

    useEffect(() => {
        fetch('./data.json')
            .then(response => response.json())
            .then((data: ResponseUser[]) => {

                setUserList(fieldSorting(data))
            });
    }, [])

    console.log(userList)

    const handleDelete = (userId: string) => {
        const updatedList = userList.filter(user => user.id !== userId);
        setUserList(updatedList);
    };

    return (
        <div className={cnUserList()}>
            {userList.map((user, index) => (
                <UserCard key={index} user={user} onDelete={() => handleDelete} toggle={false} />
            ))}
        </div>
    );
};

export default UserList;

// const fields: user = {
//     id: data.login.uuid,
//     name: data.name.first + ' ' + data.name.last,
//     email: data.email,
//     phone: data.name,
//     birthday: data.dob.date,
//     address: data.location.street.number,
// }
