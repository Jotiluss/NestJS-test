import { Balance } from './balance.model'
import { Movement } from './movement.model'

export enum ReasonType {
  MOVEMENT_MISSING = 'Opération manquante',
  MOVEMENT_DUPLICATE = 'Doublon',
  BALANCE_INCONSISTENCY = 'Incohérence de solde',
}

export class ValidationResultReason {
  type: ReasonType
  description: string
  details:
    | { movement: Movement }
    | { balance: Balance }
    | { balanceSum: number; lastBalance: number }
}

export class ValidationResult {
  message: string
  reasons?: ValidationResultReason[]
}
