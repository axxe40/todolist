import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import Todolist from "@/Components/Todolist";


export default function Home() {
  return (
    <>

    <Navbar/>
    <div className="App">

    <Todolist/>
     
    </div>
    <Footer/>
   
    </>
  )
}
