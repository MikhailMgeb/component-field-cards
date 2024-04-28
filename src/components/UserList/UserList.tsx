import { ChangeEvent, useEffect, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { Response, user } from '../UserCard/UserTypes';
import { UserCard } from '../UserCard/UserCard';
import { cnUserList } from './UserList.classname';
import { fieldSorting } from '../../utils';

import './UserList.css';

const UserList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('Search');
    const [clicked, setClicked] = useState(false);
    const [userList, setUserList] = useState<user[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=500')
            .then(response => response.json())
            .then((data: Response) => {
                setUserList(fieldSorting(data.results));
                setIsLoading(true);
            })
            .finally(() => setIsLoading(false))
            .catch((error) => console.log(error))
    }, [clicked]);

    const handleRefreshCards = () => {
        setClicked(prev => !prev);
    }

    const handleDelete = (userId: string) => {
        const updatedList = userList.filter(user => user.id !== userId);
        setUserList(updatedList);
    };

    const handleInputFocus = () => {
        if (search === 'Search') {
            setSearch('');
            return;
        }
    }

    const handleInputBlur = () => {
        if (search === '') {
            setSearch('Search');
            return;
        }
    }

    const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            setIsLoading(false)
        }
        timerRef.current = setTimeout(() => {
            const filteredUsers = userList.filter(user =>
                user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.phone.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.birthday.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.address.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setIsLoading(true)
            setUserList(filteredUsers);
        }, 300)


        setSearch(event.target.value);
    }

    return (
        <>
            <div className={cnUserList('Control')}>
                <div className={cnUserList('Search')}>
                    <input className={cnUserList('InputSearch')}
                        value={search} onChange={handleChangeText}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    {isLoading ? <CircularProgress color="secondary" /> : null}
                </div>
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
