import { Request, Response } from "express"

const home = (req: Request, res: Response) => {
    res.json({
        data: 'dummy'
    })
}

export default home