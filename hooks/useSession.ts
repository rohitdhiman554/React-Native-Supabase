import {useState, useEffect} from 'react';

import {supabase} from '../lib/supabase';

export const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {error} = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }
      setIsLoggedIn(true);
    };

    checkSession();
  }, []);

  return [isLoggedIn, setIsLoggedIn];
};
