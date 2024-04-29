import { ChangeEvent, useEffect, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import type { Response, User } from '../UserCard/UserTypes';
import { UserCard } from '../UserCard/UserCard';
import { cnUserList } from './UserList.classname';
import { DEFAULT_VALUE, fieldSorting, getUserStats } from '../../utils';
import { StatisticsField } from '../StatisticsField/StatisticsField';
import type { Statistics } from '../StatisticsField/StatisticsTypes';

import './UserList.css';

const UserList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState<string>();
    const [clicked, setClicked] = useState(false);

    const [userList, setUserList] = useState<User[]>([]);
    const [foundUserList, setFoundUserList] = useState<User[]>([]); /////test

    const [userStats, setUserStats] = useState<Statistics>(DEFAULT_VALUE);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsLoading(true)
        fetch('https://randomuser.me/api/?results=500')
            .finally(() => { setIsLoading(true) })
            .then(response => response.json())
            .then((data: Response) => {
                const resultSorted = fieldSorting(data.results);

                setUserList(resultSorted);
                setFoundUserList(resultSorted);

                setUserStats(getUserStats(resultSorted));

                setIsLoading(false);
            })
            .catch((error) => console.log(error))
    }, [clicked]);

    const handleRefreshCards = () => {
        setClicked(prev => !prev);
    }

    const handleDelete = (userId: string) => {
        const updatedFoundList = foundUserList.filter(user => user.id !== userId);
        const updatedUserList = userList.filter(user => user.id !== userId)

        setFoundUserList(updatedFoundList);
        setUserList(updatedUserList);
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

            setFoundUserList(filteredUsers);
        }, 300)

        setSearch(event.target.value);
    }

    return (
        <div className={cnUserList()}>
            <div className={cnUserList('Control')}>
                <div className={cnUserList('Search')}>
                    <input className={cnUserList('InputSearch')}
                        value={search} onChange={handleChangeText}
                        placeholder='Search'
                    />
                    {isLoading ? <CircularProgress color="secondary" /> : null}
                </div>
                <button className={cnUserList('ButtonRefresh')} onClick={handleRefreshCards}>Refresh Users</button>
            </div>
            <div className={cnUserList('Field')}>
                <div className={cnUserList('Cards')}>
                    {foundUserList.map((user, index) => (
                        <UserCard key={index} user={user} onDelete={handleDelete} />
                    ))}
                </div>
                <StatisticsField
                    users={userStats.users}
                    ages={userStats.ages}
                    gender={userStats.gender} />
            </div>
        </div>
    );
};

export { UserList }
