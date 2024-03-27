import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { Balance, Movement } from '../models'

export class ValidateMovementsDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Movement)
  movements: Movement[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Balance)
  balances: Balance[]
}
