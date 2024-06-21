import { useEffect, useState } from 'react'
import { db } from './firebase'
import './App.css'
import { collection, getDocs, deleteDoc, DocumentData, doc } from 'firebase/firestore'
import GoogleLogin from './components/GoogleLogin'
import { useFirebaseAuth } from './hooks/useFirebaseAuth'
import { AddPlayer } from './components/AddPlayer'

interface NameViewProps {
  name: string
  part: string
}

function NameView(props: NameViewProps) {
  return (
    <div>
      <p>{props.name}</p>
      <h2>{props.part}</h2>
    </div>

  )
}

function App() {
  const [firstPart, setFirstPart] = useState('')
  const [secondPart, setSecondPart] = useState('')
  const [thirdPart, setThirdPart] = useState('')

  const [firstPartList, setFirstPartList] = useState<DocumentData[]>([])
  const [secondPartList, setSecondPartList] = useState<DocumentData[]>([])
  const [thirdPartList, setThirdPartList] = useState<DocumentData[]>([])

  const context = useFirebaseAuth() // {user, logout}

  useEffect(() => {
    const fetchData = async (part: string) => {
      const querySnapshot = await getDocs(collection(db, part))
      const dataList = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));

      switch (part) {
        case "first_parts":
          setFirstPartList(dataList)
          break
        case "second_parts":
          setSecondPartList(dataList)
          break
        case "third_parts":
          setThirdPartList(dataList)
          break
        default:
          console.log("Invalid")
      }

      return dataList
    }

    fetchData("first_parts")
    fetchData("second_parts")
    fetchData("third_parts")

  }, [])

  function pickRandomName() {
    const first = firstPartList[Math.floor(Math.random() * firstPartList.length)]
    const second = secondPartList[Math.floor(Math.random() * secondPartList.length)]
    const third = thirdPartList[Math.floor(Math.random() * thirdPartList.length)]

    setFirstPart(first.name)
    setSecondPart(second.name)
    setThirdPart(third.name)
  }

  return (
    <>

      <div style={{display: "flex", flexDirection: "row"}}>
        <ListView title={"Firsts"} collection={"first_parts"} list={firstPartList} />
        <ListView title={"Seconds"} collection={"second_parts"} list={secondPartList} />
        <ListView title={"Thirds"} collection={"third-parts"} list={thirdPartList} />
      </div>

      <div>
        <NameView name={firstPart} part="First Part" />
        <NameView name={secondPart} part="Second Part" />
        <NameView name={thirdPart} part="Third Part" />
      </div>

      <button onClick={pickRandomName}>Selet Players</button>

      {context.user ? (
        <>
          <div>
            <p>Logged in as {context?.user?.email}</p>
            <button onClick={() => context?.logout()}>Logout</button>
          </div>

          <AddPlayer></AddPlayer>

        </>
      ) : (
        <GoogleLogin />
      )}

    </>
  )
}

interface ListViewProps {
  title: string 
  collection: string 
  list: DocumentData[]
}

function ListView(props: ListViewProps) {

  const deletePlayer = async (item: DocumentData) => {
    console.log(item)
    await deleteDoc(doc(db, props.collection, item.id))
    window.location.reload()
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <h4>{props.title}</h4>
      <ul style={{listStyle: "none"}}>
        {props.list.map((item, index) => (
          <div style={{display: "flex"}}>
            <li key={index}>{item.name}</li>
            <button className="deleteButton" onClick={() => deletePlayer(item)}>X</button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default App
