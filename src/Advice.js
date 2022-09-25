import { useState , useEffect} from "react"
import {ReactComponent as Divider_Mobile} from './images/pattern-divider-mobile.svg'
import {ReactComponent as Icon} from './images/icon-dice.svg'
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';

const Advice = () => {
  
    const [datata,setDatata] = useState('')

    const [data , setData] = useState('')
    const [isPending , setIsPending] = useState(true)
    const [error , setError] = useState(null)
    const [counter , setCounter] = useState(0)


   
    const fetchData  = async(url) => {
      setData(null)
      setIsPending(true)
      try{
         let response = await fetch(url)
         if(!response.ok) {
          throw new Error(response.statusText)
         }
         else{
          let data = await response.json()
          setError(null)
          setIsPending(false)
          setCounter(counter+1)
          setData(data.slip.advice)
          
         }
      } catch (err){
         setIsPending(false)
         setData(null)
         setError('Could Not Fetch The Data')
      }
    }

    useEffect(()=>{
      
      fetchData('https://api.adviceslip.com/advice')

    },[])
  
  
  
  return (
    <div className="flex justify-center justify-items-center justify-content-center  bg-[#1f2632] h-screen w-screen">
      <div className="flex justify-items-center justify-content-center justify-between flex-col my-auto rounded-lg bg-[#323a49] h-3/5 md:w-1/3 w-4/5 p-5 mx-auto relative">
        <p className="text-center text-[#52ffa8] mb-3">{`ADVICE #${counter}`}</p>
        {data && (<h3 className="text-center text-[#cee3e9] md:text-2xl text-lg font-semibold mb-8"> {data} </h3>)}
        {error && <h3 className="text-center text-[#cee3e9]"> {error} </h3>}
        {isPending && <h3 className="text-center fill-[#cee3e9]"> Loading...</h3>}
        
        <span className="h-[1px] w-1/2 bg-slate-300 mx-auto mb-10"></span>
        <button onClick={()=>fetchData('https://api.adviceslip.com/advice')} className="mx-auto bg-[#52ffa8] p-4 rounded-full shadow-[#52ffa8] hover:shadow-5xl absolute -bottom-6 left-1/2 -translate-x-1/2"><Icon className=""/></button>
      </div>
    </div>
  )
}

export default Advice
