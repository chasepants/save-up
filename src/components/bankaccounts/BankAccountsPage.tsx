import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers';
import Link from './Link'
import { BankAccountRowProps } from './types';
import { BankAccount, PlaidItem } from '../../library/types';

function BankAccountRow(props: BankAccountRowProps): JSX.Element {
  return (
    <div key={props.account.account_id} className='row'>
      <div className='col-sm-12'>
        <div className="input-group">
          <p className="form-control">{props.account.name}</p>
          <p className="form-control">{props.account.subtype}</p>
          <p className="form-control">{props.account.mask}</p>
        </div>
      </div>
    </div>
  )
}

function BankAccountsPage(): JSX.Element {
  const [linkToken, setLinkToken] = useState(null);
  const user = useSelector((state: RootState) => state.user)
  const public_token = useSelector((state: RootState) => state.auth.token)

  const generateToken = async () => {
    const response: Response = await fetch('http://localhost:3001/plaid/create_link_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': public_token
      },
    });

    const data = await response.json();
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
  }, []);

  return (    
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-sm-12 text-center'>
          <h3>Accounts</h3>
          {
            user.plaid_items && user.plaid_items.map((plaidItem: PlaidItem) => {
                return plaidItem.accounts.map((account: BankAccount) => <BankAccountRow key={account.account_id} account={account} />)
              })
          }
          {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
        </div>
      </div>
    </div>
  )
}


export default BankAccountsPage;
