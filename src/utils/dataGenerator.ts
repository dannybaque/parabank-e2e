export interface UserData{
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
}

export function generateUser(): UserData{
    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return{
        firstName: 'Danny',
        lastName: `QA${uniqueId.slice(-6)}`,
        address: 'Isla trinitaria',
        city: 'Guayaquil',
        state: 'Guayas',
        zipCode: '090120',
        phone: '0990189316',
        ssn: uniqueId.slice(-9),
        username: `qa_${uniqueId}`,
        password: `Pw${uniqueId.slice(-8)}`,
    };
}