// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export type StateType = {
  isOn: boolean;
};

const state: StateType = {
  isOn: false,
};

let count = 0;

const randomChange = () => {
  count += 1;
  let success = false;
  if (count % 2 === 0) {
    success = true;
    state.isOn = !state.isOn;
  }
  return {
    success: success,
    state: state,
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const result = randomChange();
      if (result.success) {
        return res.status(201).json(result.state);
      } else {
        return res.status(500).json({ error: '변경에 실패했습니다.' });
      }
    case 'GET':
      return res.status(200).json(state);
    default:
      return res.status(403).json({ error: '허용되지 않는 메서드입니다.' });
  }
}
