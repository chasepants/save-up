import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LoginPage from './components/login/LoginPage'
import BankAccountsPage from './components/bankaccounts/BankAccountsPage'
import SavingsGoalsPage from './components/savings-goals/SavingsGoalsPage'
import ViewSavingsGoalPage from './components/savings-goals/ViewSavingsGoalPage'
import RequireAuth from './components/RequireAuth'
import AuthListener from './components/AuthListener'

function App(): JSX.Element {
  const notFound = (): JSX.Element => <main style={{ padding: "1rem" }}><p>There's nothing here!</p></main> 
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<AuthListener><LoginPage /></AuthListener>} />
        <Route path="login" element={<AuthListener><LoginPage /></AuthListener>} />
        <Route path="goals" element={<RequireAuth><SavingsGoalsPage /></RequireAuth>} />
        <Route path="goal/:item_name" element={<RequireAuth><ViewSavingsGoalPage /></RequireAuth>} />
        <Route path="bank-accounts" element={<RequireAuth><BankAccountsPage /></RequireAuth>} />        
        <Route path="*" element={notFound()} />
      </Routes>
    </div>
  )
}

export default App;
