import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Response, user } from '../UserCard/UserTypes';
import { UserCard } from '../UserCard/UserCard';
import { cnUserList } from './UserList.classname';
import { fieldSorting } from '../../utils';

import './UserList.css';

const UserList = () => {
    const [value, setValue] = useState('Search');
    const [clicked, setClicked] = useState(false);
    const [userList, setUserList] = useState<user[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetch('./data.json')
            .then(response => response.json())
            .then((data: Response) => {
                setUserList(fieldSorting(data.results));
            });
    }, [clicked, userList.length === 0])

    const handleRefreshCards = () => {
        setClicked(prev => !prev);
    }

    const handleDelete = (userId: string) => {
        const updatedList = userList.filter(user => user.id !== userId);
        setUserList(updatedList);
    };

    const handleInputFocus = () => {
        if (value === 'Search') {
            setValue('');
            return;
        }
    }

    const handleInputBlur = () => {
        if (value === '') {
            setValue('Search');
            return;
        }
    }

    const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        if(timerRef.current) {}
        timerRef.current = setTimeout(() => {
            const filteredUsers = userList.filter(user =>
                user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.phone.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.birthday.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.address.toLowerCase().includes(event.target.value.toLowerCase())
            );

            setUserList(filteredUsers);
        }, 300)


        setValue(event.target.value);
    }

    return (
        <>
            <div className={cnUserList('Control')}>
                <input className={cnUserList('InputSearch')} value={value} onChange={handleChangeText} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                <button className={cnUserList('ButtonRefresh')} onClick={handleRefreshCards}>Refresh Users</button>
            </div>
            <div className={cnUserList('Cards')}>
                {userList.map((user, index) => (
                    <UserCard key={index} user={user} onDelete={handleDelete} />
                ))}
            </div>
        </>
    );
};

export { UserList }
