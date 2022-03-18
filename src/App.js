import './App.css'
import * as navigation from './utils/navigation'
import { useSelector, connect } from 'react-redux'
import checkAuthToken from './utils/auth'
import Header from './components/Header'
import Items from './components/Items'
import View from './components/View'
import Login from './components/Login'
import Accounts from './components/Accounts'

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
            case navigation.SAVINGS_GOALS_PAGE: 
              return <Items/>
            case navigation.VIEW_SAVINGS_ITEMS_PAGE: 
              return <View/>
            case navigation.BANK_ACCOUNTS_PAGE: 
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
