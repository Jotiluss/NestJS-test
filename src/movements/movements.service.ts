import { Injectable } from '@nestjs/common'
import { Balance, Movement, ReasonType, ValidationResultReason } from './models'

@Injectable()
export class MovementsService {
  validation(
    movements: Movement[],
    balances: Balance[],
  ): { isValid: boolean; reasons?: any[] } {
    const reasons: ValidationResultReason[] = []

    // Check for missing transactions
    balances.forEach((balance) => {
      const matchingMovement = movements.find(
        (movement) => movement.date.toString() === balance.date.toString(),
      )
      if (!matchingMovement) {
        reasons.push({
          type: ReasonType.MOVEMENT_MISSING,
          description:
            'Opération bancaire manquante détectée pour la date spécifiée',
          details: { balance },
        })
      }
    })

    // Check for duplicates
    const seenDates: string[] = []
    const seenLabel: string[] = []
    // Check the integrity of the balances
    let balanceSum = 0
    movements.forEach((movement) => {
      const dateTime = movement.date.toString()
      const seenDateIndex = seenDates.findIndex(
        (dt) => dt.toString() === dateTime,
      )
      if (seenDateIndex !== -1 && seenLabel[seenDateIndex] === movement.label) {
        reasons.push({
          type: ReasonType.MOVEMENT_DUPLICATE,
          description: 'Opération bancaire en double détectée',
          details: { movement },
        })
      } else {
        seenDates.push(dateTime)
        seenLabel.push(movement.label)
      }
      balanceSum += movement.amount
    })

    const lastBalance = balances[balances.length - 1].balance
    if (balanceSum !== lastBalance) {
      reasons.push({
        type: ReasonType.BALANCE_INCONSISTENCY,
        description:
          'Incohérence entre le solde calculé à partir des mouvements et le dernier solde enregistré',
        details: { balanceSum, lastBalance },
      })
    }

    return { isValid: reasons.length === 0, reasons }
  }
}
