import express, { type Application, type NextFunction, type Request, type Response } from 'express'

const app: Application = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: true,
    statusCode: 200,
    result: []
  })
})

app.listen(3000, () => {
  console.info('Listening Server On Port 3000')
})
