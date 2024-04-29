import { Group, Statistics } from './components/StatisticsField/StatisticsTypes';
import type { ResponseUser, User } from './components/UserCard/UserTypes';

const formatDate = (dateString: string) => {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};

const fieldSorting = (data: ResponseUser[]): User[] => {
    const sortedData: User[] = [];

    for (let card of data) {
        sortedData.push(
            {
                id: card.login.uuid,
                name: card.name.first + ' ' + card.name.last,
                email: card.email,
                phone: card.phone,
                birthday: formatDate(card.dob.date),
                address: card.location.city + ',' + card.location.state + ',' + card.location.country,
                avatar: card.picture.large,
                gender: card.gender
            }
        )
    }

    return sortedData;
}

const getCurrentAgeUser = (ageUser: number): Group => {
    let value: Group;
    if (ageUser >= 11 && ageUser <= 20) {
        value = 'firstGroup';
    } else if (ageUser >= 21 && ageUser <= 30) {
        value = 'secondGroup';
    } else if (ageUser >= 31 && ageUser <= 40) {
        value = 'thirdGroup';
    } else if (ageUser >= 41 && ageUser <= 50) {
        value = 'fourthGroup';
    } else {
        value = 'fifthGroup';
    }
    return value;
}

const getUserStats = (usersData: User[]): Statistics => {
    const usersStat = {
        users: 0,
        ages: {
            firstGroup: 0,
            secondGroup: 0,
            thirdGroup: 0,
            fourthGroup: 0,
            fifthGroup: 0
        },
        gender: {
            male: 0,
            female: 0,
        }
    };

    const currentYear = new Date().getFullYear();

    for (let user of usersData) {
        usersStat.users += 1;

        user.gender === 'male' ? usersStat.gender.male += 1 : usersStat.gender.female += 1;

        const currentUserAge = currentYear - Number(user.birthday.split(' ')[2]);
        const currentGroupAge = getCurrentAgeUser(currentUserAge);
        usersStat.ages[currentGroupAge as Group] += 1;
    }

    return usersStat;
}

const DEFAULT_VALUE = {
    users: 0,
    ages: {
        firstGroup: 0,
        secondGroup: 0,
        thirdGroup: 0,
        fourthGroup: 0,
        fifthGroup: 0
    },
    gender: {
        male: 0,
        female: 0
    }
}

export { fieldSorting, getUserStats, DEFAULT_VALUE }
