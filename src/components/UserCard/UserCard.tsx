import React from 'react';
import type { FC } from 'react';
import { cnUserCard } from './UserCard.classname';
import type { UserCardProps } from './UserTypes';

// import Icon from './icon.svg';


const UserCard: FC<UserCardProps> = ({ user, onDelete, toggle }) => {
    const { id, name, email, phone, birthday, address } = user;
    console.log(user)

    return (
        <div className={cnUserCard()}>
            <div className={cnUserCard('Avatar')}>
                <img className={cnUserCard('Image')} src='/' alt='avatar' />
                <div className={cnUserCard('AvatarInfo')}>
                    {/* <p className={cnUserCard('AvatarName')}>{name}</p>
                    <p className={cnUserCard('AvatarEmail')}>{email}</p> */}
                </div>
            </div>
            <div className={cnUserCard('UserInfo')}>
                {/* <p className={cnUserCard('UserPhone')}><strong>Phone No</strong> {phone}</p>
                <p className={cnUserCard('UserBirthday')}><strong>Birthday:</strong> {birthday}</p>
                <p className={cnUserCard('UserAddress')}><strong>Address</strong> {address}</p> */}
            </div>
            <button onClick={() => onDelete()}><img src={'/'} alt='icon' /></button>
        </div>
    );
};

export { UserCard };
