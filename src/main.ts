import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  const port = process.env.PORT || 3000
  await app.listen(port)

  console.info(
    '\n \x1b[92m ',
    'Server running... \x1b[94m',
    process.env.HOST || `http://localhost:${port}`,
    '\n',
  )
}

bootstrap()
