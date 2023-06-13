import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
})

const openai = new OpenAIApi(configuration)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    if (!configuration.apiKey) {
      return res.status(500).json({
        errorTitle: 'Internal error',
        errorMessage: 'Internal error',
      })
    }

    const prompt = req.body.prompt as string

    if (prompt.trim().length === 0) {
      return res.status(400).json({
        errorTitle: 'Você não forneceu um valor válido',
        errorMessage: 'Por favor envie um valor valido para ao prompt',
      })
    }

    try {
      const completion = await openai.createCompletion({
        model: 'ada',
        max_tokens: 1000,
        prompt: `Relacionado ao mundo da escrita criativa: ${prompt}`,
        temperature: 0.4,
      })

      res.status(200).json({
        data: completion.data,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        errorTitle: 'Error ao se comunicar com o gpt',
        errorMessage:
          'Error ao se comunicar com o gpt. Tente novamente mais tarde',
      })
    }
  } else {
    return res.status(400).json({
      errorTitle: 'Método não aceito',
      errorMessage: 'Método não aceito',
    })
  }
}
