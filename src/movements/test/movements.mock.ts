import { ValidateMovementsDTO } from '../dto/validate-movements.dto'

export const mockValidateMovementsDTO: ValidateMovementsDTO = {
  movements: [
    {
      id: 1,
      date: new Date('2024-03-31T00:00:00.000Z'),
      label: 'Transaction 1',
      amount: 175,
    },
    {
      id: 2,
      date: new Date('2024-03-31T00:00:00.000Z'),
      label: 'Transaction 2',
      amount: -50,
    },
    {
      id: 3,
      date: new Date('2024-03-10T00:00:00.000Z'),
      label: 'Transaction 3',
      amount: -200,
    },
    {
      id: 4,
      date: new Date('2024-03-10T00:00:00.000Z'),
      label: 'Transaction 4',
      amount: 200,
    },
    {
      id: 3,
      date: new Date('2024-03-20T00:00:00.000Z'),
      label: 'Transaction 5',
      amount: 50,
    },
  ],
  balances: [
    { date: new Date('2024-03-10T00:00:00.000Z'), balance: 100 },
    { date: new Date('2024-03-20T00:00:00.000Z'), balance: 50 },
    { date: new Date('2024-03-31T00:00:00.000Z'), balance: 175 },
  ],
}

export const mockValidateMovementsDTOWithErrors: ValidateMovementsDTO = {
  movements: [
    { id: 1, date: new Date('2024-03-01'), label: 'Dépense 1', amount: -100 },
    { id: 2, date: new Date('2024-03-05'), label: 'Revenu 1', amount: 200 },
    { id: 3, date: new Date('2024-03-05'), label: 'Revenu 1', amount: 500 },
    { id: 4, date: new Date('2024-03-15'), label: 'Dépense 3', amount: -75 },
    { id: 5, date: new Date('2024-03-20'), label: 'Revenu 2', amount: 300 },
    { id: 6, date: new Date('2024-03-25'), label: 'Dépense 4', amount: -120 },
  ],
  balances: [
    { date: new Date('2024-03-01'), balance: 0 },
    { date: new Date('2024-03-05'), balance: 100 },
    { date: new Date('2024-03-10'), balance: 150 },
    { date: new Date('2024-03-15'), balance: 75 },
    { date: new Date('2024-03-20'), balance: 225 },
    { date: new Date('2024-03-25'), balance: 105 },
  ],
}
