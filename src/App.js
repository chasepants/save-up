import './App.css'
import {useEffect, useState} from 'react'
import checkAuthToken from './utils/auth'
import Header from './common/Header'
import Items from './pages/Items'
import View from './pages/View'
import Login from './pages/Login'

function App() {
  let [authentication, setAuthentication] = useState({
    valid: false,
    token: "",
    error: "",
    user: {
      username: "",
      password: "",
      items: [],
      _id: ""
    }
  })

  let [page, setPage] = useState({
    number: 0,
    item: {}
  })

  const viewPage = (page) => {
    console.log("trying to view page")
    console.log(page)
    setPage(page)
  }

  useEffect(() => {
    console.log('page updated')
    let auth = checkAuthToken()
    if (null === auth && true === authentication.valid) {
      setAuthentication({
        valid: false,
        token: "",
        error: "",
        user: {}
      })
    }
  }, [page])

  console.log(authentication.user)

  return (
    <div>
      <Header page={page} setPage={setPage} authentication={authentication}/>
      {
        (() => {
          if (!authentication.valid) 
            return <Login authentication={authentication} setAuthentication={setAuthentication}/> 

          switch (page.number) {
            case 0: 
              return <Items user={authentication.user} viewPage={viewPage} />
            case 1: 
              return <View page={page} viewPage={viewPage}/>
            default:
              return <Items user={authentication.user} viewPage={viewPage} />
          }
        })()
      }
    </div>
  );
}

export default App;
