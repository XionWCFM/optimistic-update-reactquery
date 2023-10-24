import { NextApiRequest, NextApiResponse } from 'next';

const MOCK_DATA = ['todos1', 'todos2'];

export type MockApiType = typeof MOCK_DATA;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      MOCK_DATA.push(req.body?.test);
      return res.status(201).json(MOCK_DATA);
    case 'GET':
      return res.status(200).json(MOCK_DATA);
  }
  return res.status(405).json({
    error: '허용되지 않는 메서드입니다.',
  });
}
