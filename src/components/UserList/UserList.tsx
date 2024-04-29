import { ChangeEvent, useEffect, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import type { Response, User } from '../UserCard/UserTypes';
import { UserCard } from '../UserCard/UserCard';
import { cnUserList } from './UserList.classname';
import { fieldSorting } from '../../utils';
import { StatisticsField } from '../StatisticsField/StatisticsField';

import './UserList.css';

const UserList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('Search');
    const [clicked, setClicked] = useState(false);
    const [userList, setUserList] = useState<User[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsLoading(true)
        fetch('https://randomuser.me/api/?results=500')
            .finally(() => { setIsLoading(true) })
            .then(response => response.json())
            .then((data: Response) => {
                setUserList(fieldSorting(data.results));
                setIsLoading(false);
            })
            .catch((error) => console.log(error))
    }, [clicked]);

    const handleRefreshCards = () => {
        setClicked(prev => !prev);
    }

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

    const handleDelete = (userId: string) => {
        const updatedList = userList.filter(user => user.id !== userId);
        setUserList(updatedList);
    };

    const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {

            const filteredUsers = userList.filter(user =>
                user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.phone.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.birthday.toLowerCase().includes(event.target.value.toLowerCase()) ||
                user.address.toLowerCase().includes(event.target.value.toLowerCase())
            );

            setIsLoading(false);
            setUserList(filteredUsers);
        }, 300)

        setSearch(event.target.value);
    }

    return (
        <div className={cnUserList()}>
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
            <div className={cnUserList('Field')}>
                <div className={cnUserList('Cards')}>
                    {userList.map((user, index) => (
                        <UserCard key={index} user={user} onDelete={handleDelete} />
                    ))}
                </div>
                <StatisticsField
                    users={0}
                    ages={{
                        firstGroup: 0,
                        secondGroup: 0,
                        thirdGroup: 0,
                        fourthGroup: 0,
                        fifthGroup: 0
                    }}
                    gender={{
                        male: 0,
                        female: 0
                    }} />
            </div>
        </div>
    );
};

export { UserList }
