import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { ValidateMovementsDTO } from './dto/validate-movements.dto'
import { ValidationResult } from './models'
import { MovementsService } from './movements.service'

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post('validation')
  validateMovements(
    @Body() input: ValidateMovementsDTO,
    @Res() res: Response,
  ): Response<ValidationResult> {
    const { movements, balances } = input
    const { isValid, reasons } = this.movementsService.validation(
      movements,
      balances,
    )

    if (isValid) {
      return res.status(HttpStatus.ACCEPTED).send({ message: 'Accepted' })
    } else {
      return res.status(HttpStatus.I_AM_A_TEAPOT).send({
        message: 'I’m a teapot',
        reasons,
      })
    }
  }
}
