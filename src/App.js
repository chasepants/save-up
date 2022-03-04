import './App.css'
import { useSelector, connect } from 'react-redux'
import checkAuthToken from './utils/auth'
import Header from './common/Header'
import Items from './pages/Items'
import View from './pages/View'
import Login from './pages/Login'
import Accounts from './pages/Accounts'
function App() {
  const page = useSelector(state => state.page)

  return (
    <div>
      <Header/>
      {
        (() => {
          if (!checkAuthToken()) {
            return <Login/> 
          }
          switch (page.number) {
            case 0: 
              return <Items/>
            case 1: 
              return <View/>
            case 2: 
              return <Accounts/>
            default:
              return <Items/>
          }
        })()
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App);
