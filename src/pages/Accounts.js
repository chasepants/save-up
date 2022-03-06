import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from '../common/Link'

function Accounts() {
  const [linkToken, setLinkToken] = useState(null);
  const user = useSelector(state => state.auth.user)
  const public_token = useSelector(state => state.auth.token)

  const generateToken = async () => {
    const response = await fetch('http://localhost:8081/api/create_link_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': public_token
      },
    });
    console.log(response)
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
            user.plaid_items.map(plaidItem => {
              return plaidItem.accounts.map(account => {
                console.log(account)
                return (
                  <div key={account.account_id} className='row'>
                    <div className='col-sm-12'>
                      <div className="input-group">
                        <p className="form-control">{account.name}</p>
                        <p className="form-control">{account.subtype}</p>
                        <p className="form-control">{account.mask}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            })
          }
          {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
        </div>
      </div>
    </div>
  )
}


export default Accounts;
