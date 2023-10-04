// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getPgKnext } from "@/knex"

export default async function handler(req, res) {
    const result = await getPgKnext ().raw ("SELECT * FROM todo")
    res.status(200).json({ todo: result })
}