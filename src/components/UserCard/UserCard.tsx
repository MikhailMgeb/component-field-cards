import React, { useState } from 'react';
import type { FC, MouseEvent } from 'react';
import { cnUserCard } from './UserCard.classname';
import type { UserCardProps } from './UserTypes';

import IconDelete from '../assets/icon.svg';

import './UserCard.css'

const UserCard: FC<UserCardProps> = ({ user, onDelete }) => {
    const [toggle, setToggle] = useState(false);
    const { id, name, email, phone, birthday, address, avatar } = user;

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        let target = (event.target as HTMLElement).closest('.UserCard-ButtonDelete');
        if (!!target) {
            onDelete(id);
            return;
        }
        setToggle(prev => !prev);
    }

    const handleMouseLeave = () => {
        setToggle(false);
    }

    return (
        <div className={cnUserCard()} onClick={handleClick} onMouseLeave={handleMouseLeave}>
            <div className={cnUserCard('Avatar')}>
                <img className={cnUserCard('Image')} src={avatar} alt='avatar' />
                <div className={cnUserCard('AvatarInfo')}>
                    <p className={cnUserCard('AvatarName')}>{name}</p>
                    <p className={cnUserCard('AvatarEmail')}>{email}</p>
                </div>
            </div>
            <div className={cnUserCard('UserInfo')}>
                <p className={cnUserCard('UserPhone')}><strong className={cnUserCard('Title')}>Phone No</strong> {phone}</p>
                <p className={cnUserCard('UserBirthday')}><strong className={cnUserCard('Title')}>Birthday:</strong> {birthday}</p>
                <p className={cnUserCard('UserAddress')}><strong className={cnUserCard('Title')}>Address</strong> {address}</p>
            </div>
            {toggle ?
                <button className={cnUserCard('ButtonDelete')}><img src={IconDelete} alt='deleting' />
                </button>
                :
                null}
        </div>
    );
};

export { UserCard };
