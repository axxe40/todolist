import { getPgKnext } from "@/knex"

export default async function handler(req, res) {
    const newTodo = req.body.newTodo;
    const newID = req.body.newID;

    const result = await getPgKnext().raw(`INSERT INTO todo (list, id) VALUES ('${newTodo}', ${newID})`)
    res.status(200).json({ todo: result })

}