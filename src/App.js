import './App.css'
import {useEffect, useState} from 'react'
import Header from './common/Header'
import Items from './pages/Items'
import View from './pages/View'
import Login from './pages/Login'

function App() {
  let [authenticated, setAuthentication] = useState(false)
  let [page, setPage] = useState({
    number: 0,
    item: ""
  })

  const viewPage = (page) => {
    console.log("trying to view page")
    console.log(page)
    setPage(page)
  }

  useEffect(() => {
    let token = localStorage.getItem('auth')
    console.log(token)
    if (!token) {
      setAuthentication(false)
    }
  })

  return (
    <div>
      <Header/>
      {
        (() => {
          if (!authenticated) 
            return <Login setAuthentication={setAuthentication}/> 

          switch (page.number) {
            case 0: 
              return <Items viewPage={viewPage} />
            case 1: 
              return <View page={page} viewPage={viewPage}/>
            default:
              return <Items viewPage={viewPage} />
          }
        })()
      }
    </div>
  );
}

export default App;
