import { getPgKnext } from "@/knex"

export default async function handler(req, res) {
    const id = req.body.id;

    const result = await getPgKnext().raw(`DELETE FROM todo WHERE id = ${id}`)
    res.status(200).json({ todo: result })

}