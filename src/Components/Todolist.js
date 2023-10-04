import { Button } from '@chakra-ui/react';
import { useEffect, useState } from "react";

function Todolist() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setnewTodo] = useState("");

   function handleAddtodo() {
    if (newTodo.trim() !== "") {
      // todos[todos.length-1]
      //todos[todos.length-1] ->undefined
      // undefined.id agar tidak error dikasi ? (optional chaining)
      // dapatlah undefined dari undefined?.id
      // undefined + 1 jadi NaN 
      // agar id nya tidak NaN pakailah operator OR ||, dia bakal milih value yang dikanan
      // kalau misalkan yang di sebelah kiri OR itu NaN, undefined, NULL, "", 0
      insertTodoDB()

  
    }
  };

  async function insertTodoDB() {
    const newID = todos[todos.length - 1]?.id + 1 || 0;
    
    fetch('/api/add-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newTodo: newTodo.trim(),
        newID: newID

      })
    }).then((response) => {

      setTodos([...todos, { list: newTodo.trim(), id: newID }])
      setnewTodo("")

    })
  }

  // fungsinya untuk ngejalanin baris code yang ada didalam arrow-function
  // jadi useEffect ada 2 parameter yang satu function yang dua array of dependency
  // fungsi parameter yang kedua sebagai variabel yang dependen terhadap parameter 1
  useEffect(() => {
    fetch('/api/todo').then((response) => {
      return response.json();
    }).then((result) => {
      setTodos(result.todo.rows)
    })
  }, [])


  return (
    <>
      <h1 style={{
        display: 'block',
        fontSize: '2em',
        marginTop: '0.67em',
        marginBottom: '0.67em',
        marginLeft: 0,
        marginRight: 0,
        fontWeight: 'bold'
      }}>To do List</h1>
      <div style={{ marginBottom: '1.5rem' }}>
        <input text="text" className="input type" value={newTodo} style={{ border: '2px solid #ccc', fontFamily: 'Arial' }} onChange={(e) => setnewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddtodo();
            }
          }} />
        <Button className="btn add" colorScheme="blue" style={{ marginLeft: '0.50em' }} onClick={handleAddtodo}>Add</Button>
      </div>
      <ul style={{ listStyleType: 'none' }}>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <Todoedit todo={todo} setTodos={setTodos} index={index}  todos={todos} />

          </li>
        ))}
      </ul>
    </>
  );

};




function Todoedit({ todo, todos, setTodos, index }) {
  const [editText, setEditText] = useState(todo.list);
  const [disable, setdisable] = useState(true)
  
  function handleDeletetodo(index) {
    const newTodos = [...todos];
    const deletedRows = newTodos.splice(index, 1);
    
    
    
    fetch('/api/delete-todo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: deletedRows[0].id,
        
      })
    }).then(() => {
      
      setTodos(newTodos);
      
      
    })
    
  }
  
  function handleSavetodo() {
    const newTodos = [...todos];
    newTodos[index] = {list: editText, id: todo.id};
    
    
    fetch('/api/edit-todo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        
        newTodo: editText,
        id: index
        
      })
    }).then(() => {
      
      setTodos(newTodos);

      
    })
  }
  
  
  return (
    <div style={{ marginBottom: "12px" }}>
      <input readOnly={disable} text="text" className="input edit" value={editText} style={{ border: '2px solid #ccc', fontFamily: 'Arial' }}
        onChange={(e) => setEditText(e.target.value)} />
      <Button colorScheme="blue"
        onClick={() => { setdisable(false); }} >Edit</Button>
      <Button className="btn delete" colorScheme='red' style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "5px", colorScheme: 'Red' }}
        onClick={() => handleDeletetodo(index)} >Delete</Button>
      <Button className="btn save" colorScheme="green" style={{ marginTop: "5px", marginBottom: "5px", marginLeft: "5px" }}
        onClick={() => { handleSavetodo(index); setdisable(true); }} >Save</Button>
    </div>

)

}

export default Todolist;