import { createContext, useState } from 'react';
import { getOneUserByUsername } from '../utils/userAPI';

// Tạo UserContext
export const UserContext = createContext();

// Tạo Provider component
export const UserProvider = ({ children }) => {
  const [thisUser, setThisUser] = useState(null);

  const fetchThisUserData = async (userName) => {
    try {
      const res = await getOneUserByUsername(userName);
      setThisUser(res);  // Cập nhật thông tin user
    } catch (error) {
      console.error('Error fetch user provider', error);
    }
  };

  return (
    <UserContext.Provider value={{ thisUser, fetchThisUserData }}>
      {children}
    </UserContext.Provider>
  );
};
