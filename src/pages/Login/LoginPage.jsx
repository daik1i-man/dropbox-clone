import { Link } from 'react-router-dom';
import DropBox from '/dropbox.svg';
import { auth } from '../../database/firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export default function LoginPage() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const PostDatas = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(() => {
        setUserEmail('');
        setUserPassword('');
        alert("Successfully");
        navigate('/');
      }).catch((error) => {
        setUserPassword('');
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-28 w-auto"
            src={DropBox}
            alt=""
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={PostDatas}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 placeholder:text-gray-400 "
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 p-2 ring-inset ring-gray-300 placeholder:text-gray-400 "
                />
              </div>
            </div>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
            <div>
              <button
                onClick={PostDatas}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Sending..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not registered yet ?{' '}
            <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
