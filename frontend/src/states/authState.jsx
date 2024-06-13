import { useState, useEffect } from 'react';
import UserAuthContext from '../contexts/authContext';
import { message } from 'antd';
import { serverUrl } from '../constants';
import Splash from '../pages/splash';
export default function UserAuthState(props) {
  const User = JSON.parse(sessionStorage?.getItem('user')) || null;
  const [user, setUser] = useState(User);
  const [docketTracking, setDocketTracking] = useState({ show: false });
  const [branches, setBranches] = useState([]);
  const [currBranch, setCurrBranch] = useState(null);
  const [docket, setDocket] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(serverUrl + 'checklogin', {
          credentials: 'include',
        });
        const json = await res.json();
        if (res.ok) {
          console.log(json);
          setUser(json.data);
          setBranches([...json.data.permissions.branchAccess.access]);
          sessionStorage.setItem('user', JSON.stringify(json.data));
        } else if (res.status == 500) {
          message.error('Server Error: ' + json.err);
        } else if (res.status == 401) {
          setUser(null);
          sessionStorage.clear();
          message.error('Session Expired.');
        }
      } catch (error) {
          message.error('Server is not responding. Signing out...');
          setUser(null);
          sessionStorage.clear();
          console.log(error)
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
        currBranch,
        setCurrBranch,
        docketTracking,
        setDocketTracking,
        branches,
        setBranches,
        docket,
        setDocket,
      }}
    >
      {loading ? <Splash /> : props.children}
    </UserAuthContext.Provider>
  );
}
