// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios'

export default async function helloAPI(req, res) {
  const { cnpj } = req.query
  const response = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)
  const { nome } = response.data
  res.status(200).json({ name: nome })
}
