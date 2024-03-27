import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class Movement {
  @IsNumber()
  @IsNotEmpty()
  id: number

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date

  @IsString()
  @IsNotEmpty()
  label: string

  @IsNumber()
  @IsNotEmpty()
  amount: number
}
