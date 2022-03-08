import './App.css'
import pageNumbers from './utils/navigation'
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
            case pageNumbers.SAVINGS_GOALS_PAGE: 
              return <Items/>
            case pageNumbers.VIEW_SAVINGS_ITEMS_PAGE: 
              return <View/>
            case pageNumbers.BANK_ACCOUNTS_PAGE: 
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
