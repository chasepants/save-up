import { useCallback } from 'react'
import { updateUserAccounts } from '../redux/thunks/user'
import { useDispatch } from 'react-redux'

/** PLAID */
import { usePlaidLink } from 'react-plaid-link';

const Link = (props) => {
    const dispatch = useDispatch()
    const onSuccess = useCallback(public_token => {
      // send public_token to server
      fetch('http://localhost:8081/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        dispatch(updateUserAccounts(data))
      })
      .catch(err => console.log(err))
    }, [])

    const config = {
      token: props.linkToken,
      onSuccess,
    };
    
    const { open, ready } = usePlaidLink(config);

    return (
      <button className='btn btn-primary' onClick={() => open()} disabled={!ready}>
        Add Account
      </button>
    );
};

export default Link;