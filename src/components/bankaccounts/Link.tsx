import { useCallback } from 'react'
import { updateUserPlaidItemsThunk } from '../../redux/thunks/user'
import { useDispatch, useSelector } from 'react-redux'

/** PLAID */
import { usePlaidLink } from 'react-plaid-link';
import { RootState } from '../../redux/store';
import { LinkProps } from './types';

const Link = (props: LinkProps): JSX.Element => {
    const auth_token = useSelector((state: RootState) => state.auth.token)
    const dispatch = useDispatch()
    const onSuccess = useCallback(public_token => {
      // send public_token to server
      fetch('http://localhost:3001/plaid/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': auth_token
        },
        body: JSON.stringify({ public_token }),
      })
      .then(response => response.json())
      .then(data => {
        dispatch(updateUserPlaidItemsThunk(data))
      })
      .catch(err => console.log(err))
    }, [auth_token, dispatch])

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