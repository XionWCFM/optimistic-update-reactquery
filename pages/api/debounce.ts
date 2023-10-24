import { NextApiRequest, NextApiResponse } from 'next';

const MOCK_DATA = ['todos1', 'todos2'];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return res.status(201).json({
        data: MOCK_DATA,
      });
    case 'GET':
      return res.status(200).json('hello world');
  }
}
