export type CasesType = 'cases' | 'deaths' | 'recovered';

export const casesTypes: { [key in CasesType]: CasesType } = {
    cases: 'cases',
    deaths: 'deaths',
    recovered: 'recovered',
};

export interface CasesTypeColors {
    [key: string]: {
        hex: string;
        rgb: string;
        half_op: string;
        multiplier: number;
    };
}

export const CasesTypeColors = (): Record<CasesType, {
    hex: string;
    rgb: string;
    half_op: string;
    multiplier: number;
}> => {
    const casesTypeColors: CasesTypeColors = {
        cases: {
            hex: '#CC1034',
            rgb: 'rgb(204, 16, 52)',
            half_op: 'rgba(204, 16, 52, 0.5)',
            multiplier: 180,
        },
        recovered: {
            hex: '#7dd71d',
            rgb: 'rgb(125, 215, 29)',
            half_op: 'rgba(125, 215, 29, 0.5)',
            multiplier: 180,
        },
        deaths: {
            hex: '#fb4443',
            rgb: 'rgb(251, 68, 67)',
            half_op: 'rgba(251, 68, 67, 0.5)',
            multiplier: 780,
        },
    };
    return casesTypeColors as Record<CasesType, {
        hex: string;
        rgb: string;
        half_op: string;
        multiplier: number;
    }>;
};
