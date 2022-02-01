import './App.css'
import {useState} from 'react'
import Header from './common/Header'
import Items from './pages/Items'
import View from './pages/View'

function App() {
  let [page, setPage] = useState({
    number: 0,
    item: ""
  })

  const viewPage = (page) => {
    console.log("trying to view page")
    console.log(page)
    setPage(page)
  }

  return (
    <div>
      <Header/>
      {
        (() => {
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
