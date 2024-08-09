import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { tutorialId } = req.query;
    const token = req.headers.authorization;

    if (!tutorialId || typeof tutorialId !== 'string') {
      return res.status(400).json({ message: 'ID do tutorial não fornecido ou inválido' });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutorial/delete/${tutorialId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}