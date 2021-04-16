import { Request, Response} from 'express'

export default async function uploadCsvController(request: Request, response: Response) {

  response.status(200).json({ result: true });

}