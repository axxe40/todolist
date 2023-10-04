import { getPgKnext } from "@/knex"

export default async function handler(req, res) {
    const Todo = req.body.newTodo
    const id = req.body.id

    const result = await getPgKnext().raw(`UPDATE todo SET list = '${Todo}' WHERE id = ${id}`)
    res.status(200).json({ todo: result })

}