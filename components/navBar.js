import { useContext } from 'react';
import { AuthContext } from '../services/auth';
import { signInWithGoogle } from '../services/firebase';

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser, 'currentUser');
  return (
    <div>
      <div>this will be a navbar</div>
      {currentUser ? (
        <div>
        <span>User logged in</span>
        <button>Sign out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>sign In</button>
      )}
    </div>
  );
}
