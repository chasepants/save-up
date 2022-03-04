import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from '../common/Link'

function Accounts() {
  const [linkToken, setLinkToken] = useState(null);
  const user = useSelector(state => state.auth.user)

  const generateToken = async () => {
    const response = await fetch('http://localhost:8081/api/create_link_token', {
      method: 'POST',
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
          {user.accounts.map(account => {
              if (account) {
                return (
                  <div key={account.item_id} className='row'>
                    <div className='col-sm-12'>
                      <div className="input-group">
                        <p className="form-control">{account.item_id}</p>
                        <p className="form-control">{account.access_token}</p>
                        <p className="form-control">{account.request_id}</p>
                      </div>
                    </div>
                  </div>
                )
              }
              return ''
            })
          }
          {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
        </div>
      </div>
    </div>
  )
}


export default Accounts;
