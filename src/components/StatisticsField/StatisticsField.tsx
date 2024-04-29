import { FC } from 'react';
import { cnStatisticsField } from './StatisticsField.classname';

import './StatisticsField.css';

type StatisticsFieldProps = {
    users?: number;
    ages: {
        firstGroup: number;
        secondGroup: number;
        thirdGroup: number;
        fourthGroup: number;
        fifthGroup: number;
    }
    gender: {
        male: number;
        female: number;
    }
}

const StatisticsField: FC<StatisticsFieldProps> = ({ users, ages, gender }) => {

    return (
        <div className={cnStatisticsField()}>
            <div className={cnStatisticsField('Users')}>
                <p className={cnStatisticsField('UsersCount')}>{users} Users</p>
            </div>
            <div className={cnStatisticsField('AgeGroup')}>
                <p className={cnStatisticsField('AgeTitle')}>Age Groups</p>
                <p className={cnStatisticsField('AgeRange')}>11 to 20<span className={cnStatisticsField('AgeValue')}>
                    {ages.firstGroup} Users</span>
                </p>
                <p className={cnStatisticsField('AgeRange')}>21 to 30<span className={cnStatisticsField('AgeValue')}>
                    {ages.secondGroup} Users</span>
                </p>
                <p className={cnStatisticsField('AgeRange')}>31 to 40<span className={cnStatisticsField('AgeValue')}>
                    {ages.thirdGroup} Users</span>
                </p>
                <p className={cnStatisticsField('AgeRange')}>41 to 50<span className={cnStatisticsField('AgeValue')}>
                    {ages.fifthGroup} Users</span>
                </p>
                <p className={cnStatisticsField('AgeRange')}>51+<span className={cnStatisticsField('AgeValue')}>
                    {ages.firstGroup} Users</span>
                </p>
            </div>
            <div className={cnStatisticsField('GenderGroups')}>
                <p className={cnStatisticsField('GenderTitle')}>Age Groups</p>
                <p className={cnStatisticsField('GenderMale')}>Male<span className={cnStatisticsField('GenderValue')}>
                    {gender.male} Users</span>
                </p>
                <p className={cnStatisticsField('GenderFemale')}>Female<span className={cnStatisticsField('GenderValue')}>
                    {gender.female} Users</span>
                </p>
            </div>
        </div>
    );
};

export { StatisticsField }
