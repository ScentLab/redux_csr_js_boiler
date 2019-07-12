import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../hooks';

import { signIn } from '../modules';
import { Layout } from '../components';

export default () => {
  const login = useAction(signIn);
  const userInfo = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    const user = {
      id: 'abcd4',
      password: 'asdf',
    };
    login(user);
  }, [login]);

  console.log(userInfo);
  return <Layout haveJoin>this is Main Page!!!</Layout>;
};
