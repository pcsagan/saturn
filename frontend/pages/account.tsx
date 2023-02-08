import { useState } from 'react';
import { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import Box from '@mui/material/Box';
import * as Backend from 'helpers/rest';

const Account: NextPage = (): JSX.Element => {
  const { data: session } = useSession();
  const [test, setTest] = useState('Click Me!');

  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  const privateHandler = async () => {
    const result = await Backend.post('/private', session.authorization);
    if (result) setTest('It worked!');
    else setTest("It didn't work!");
  };

  return (
    <>
      <Box component='img' src={session.user?.image?.toString()} />
      <br />
      {session.user?.name?.toString()} <br /> E-mail:{' '}
      {session.user?.email?.toString()}
      <br />
      <button onClick={() => signOut()}>Sign out</button>
      <br />
      <br />
      <button onClick={privateHandler}>Private</button>
      {test}
    </>
  );
};

export default Account;
