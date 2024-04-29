export type AgeGroup = {
    firstGroup: number;
    secondGroup: number;
    thirdGroup: number;
    fourthGroup: number;
    fifthGroup: number;
}

export type Statistics = {
    users: number;
    ages: AgeGroup;
    gender: {
        male: number;
        female: number;
    }
}

export type Group = "firstGroup" | 'secondGroup' | 'thirdGroup' | 'fourthGroup' | 'fifthGroup';

export type StatisticsFieldProps = Statistics;
