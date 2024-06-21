import { useEffect, useState } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { getIdTokenResult } from 'firebase/auth';

const useAdminStatus = () => {
  const { user } = useFirebaseAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      getIdTokenResult(user).then((idTokenResult) => {
        setIsAdmin(idTokenResult.claims.admin === true);
      });
    }
  }, [user]);

  return isAdmin;
};

export default useAdminStatus;
