import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Response, user } from '../UserCard/UserTypes';
import { UserCard } from '../UserCard/UserCard';
import { cnUserList } from './UserList.classname';
import { fieldSorting } from '../../utils';

import './UserList.css';

const UserList = () => {
    const [search, setSearch] = useState('Search');
    const [clicked, setClicked] = useState(false);
    const [userList, setUserList] = useState<user[]>([]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetch('./data.json')
            .then(response => response.json())
            .then((data: Response) => {
                setUserList(fieldSorting(data.results));
            });
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
        }

        timerRef.current = setTimeout(() => {
            console.log(userList.map((item: any) => {
                (Object.values(item)).filter((value: any, index) => console.log(value[index]));
            }))
        }, 300)

        setSearch(event.target.value);
    }

    return (
        <>
            <div className={cnUserList('Control')}>
                <input className={cnUserList('InputSearch')} value={search} onChange={handleChangeText} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                <button className={cnUserList('ButtonRefresh')} onClick={handleRefreshCards}>Refresh Users</button>
            </div>
            <div className={cnUserList('Cards')}>
                {userList.length > 0 ? userList.map((user, index) => (
                    <UserCard key={Number(user) + index} user={user} onDelete={handleDelete} />)) : <div>Ничего не найдено</div>
                }
            </div>
        </>
    );
};

export { UserList }
