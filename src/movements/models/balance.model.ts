import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator'

export class Balance {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date

  @IsNumber()
  @IsNotEmpty()
  balance: number
}
