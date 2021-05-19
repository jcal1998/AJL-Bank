export const Data = () => ([   
    {
        cpf: '06597863119',
        name: 'José Carlos Lee',
        password : '1234',
        transactions : [
            {
                title: 'Netflix',
                amount: 27,
                type: 'withdraw',
                category: 'cobrança',
                createdAt: new Date('2021-05-14 09:01:03'),
            },
            {
                title: 'Salário',
                amount: 1800,
                type: 'deposit',
                category: 'salário',
                createdAt: new Date('2021-05-09 11:01:03'),
            },
            {
                title: 'Aluguel',
                amount: 1200,
                type: 'withdraw',
                category: 'cobrança',
                createdAt: new Date('2021-05-02 11:01:03'),
            }
        ]
    },
    {
        cpf: '06597883144',
        name: 'Amadeu Lee',
        password : '2002',
        transactions : [
            {
                title: 'Aluguel',
                amount: 500,
                type: 'withdraw',
                category: 'Cobrança',
                createdAt: new Date('2021-05-16 11:15:21'),
            },
            {
                title: 'Drogasil',
                amount: 77,
                type: 'withdraw',
                category: 'Saúde',
                createdAt: new Date('2021-05-15 08:02:52'),
            },
            {
                title: 'Amazon Prime',
                amount: 10,
                type: 'withdraw',
                category: 'Entretenimento',
                createdAt: new Date('2021-05-13 06:01:11'),
            },
            {
                title: 'Della Empório',
                amount: 36,
                type: 'withdraw',
                category: 'Alimentícios',
                createdAt: new Date('2021-05-11 10:09:07'),
            },
            {
                title: 'Salário',
                amount: 2400,
                type: 'deposit',
                category: 'salário',
                createdAt: new Date('2021-05-10 09:01:03'),
            }
        ]
    },
    {
        cpf: '70226713113',
        name: 'Luca Santos Martins',
        password : '2001',
        transactions : [
            {
                title: 'Aluguel',
                amount: 27,
                type: 'withdraw',
                category: 'Cobrança',
                createdAt: new Date('2021-05-17 09:01:03'),
            },
            {
                title: 'Salário',
                amount: 1800,
                type: 'deposit',
                category: 'salário',
                createdAt: new Date('2021-05-04 09:01:03'),
            }
        ]
    }
])