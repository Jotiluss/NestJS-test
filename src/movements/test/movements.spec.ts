import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { MovementsController } from '../movements.controller'
import { MovementsService } from '../movements.service'
import {
  mockValidateMovementsDTO,
  mockValidateMovementsDTOWithErrors,
} from './movements.mock'

describe('MovementsModule', () => {
  let app: INestApplication
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [MovementsController],
      providers: [MovementsService],
    }).compile()
    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })

  describe('Test movement Controller', () => {
    it('Validation Accepted', () => {
      return request(app.getHttpServer())
        .post('/movements/validation')
        .send(mockValidateMovementsDTO)
        .expect(HttpStatus.ACCEPTED)
        .expect({ message: 'Accepted' })
    })

    it('Validation without data', () => {
      return request(app.getHttpServer())
        .post('/movements/validation')
        .send({})
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          message: ['movements must be an array', 'balances must be an array'],
          error: 'Bad Request',
          statusCode: 400,
        })
    })

    it('Validation bad data', () => {
      return request(app.getHttpServer())
        .post('/movements/validation')
        .send({
          movements: [
            { id: 'test', label: 'test' },
            { amount: '30', date: 55765675 },
          ],
          balances: [
            {
              balance: '200',
              date: 54454654,
            },
          ],
        })
        .expect(HttpStatus.BAD_REQUEST)
    })

    it('Validation is a Teapot', () => {
      return request(app.getHttpServer())
        .post('/movements/validation')
        .send(mockValidateMovementsDTOWithErrors)
        .expect(HttpStatus.I_AM_A_TEAPOT)
        .expect((res) => {
          expect(res.body.message).toEqual('I’m a teapot')
          expect(res.body.reasons.length).toBe(3)
        })
    })
  })

  describe('Test movement Service', () => {
    let service: MovementsService

    beforeEach(async () => {
      service = module.get<MovementsService>(MovementsService)
    })

    it('validation() with valid data', () => {
      const { movements, balances } = mockValidateMovementsDTO
      const { isValid } = service.validation(movements, balances)
      expect(isValid).toBeTruthy()
    })

    it('validation() with bad movements', () => {
      const { movements, balances } = mockValidateMovementsDTOWithErrors
      const { isValid, reasons } = service.validation(movements, balances)
      expect(isValid).toBeFalsy()
      expect(reasons.length).toBe(3)
    })
  })
})
