import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

const BLOGS_DIR = '../../blogs'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  fs.readdir(BLOGS_DIR, (err, files) => {

  })
}

export default handler