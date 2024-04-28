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
            }
        )
    }

    return sortedData;
}

export {fieldSorting}
