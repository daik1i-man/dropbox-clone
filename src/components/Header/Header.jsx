import { Disclosure, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import Dropbox from '/dropbox.svg';
import { useState } from 'react';
import { auth } from '../../database/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const SignOutHadler = async () => {
        setLoading(true);
        await signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                alert(error);
            })
    }

    return (
        <Disclosure as="nav" className="bg-blue-700">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <Link to='/'>
                                    <div className="flex flex-shrink-0 space-x-4 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src={Dropbox}
                                            alt="Your Company"
                                        />
                                        <h1 className='text-xl text-gray-50 font-semibold'>Dropbox</h1>
                                    </div>
                                </Link>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Menu as="div" className="relative ml-3">
                                    <div className=''>
                                        <MenuButton className="relative flex rounded-full bg-gray-50 w-12 h-12">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className='rounded-full'
                                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt=""
                                            />
                                        </MenuButton>

                                    </div>
                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <Link
                                                        onClick={SignOutHadler}
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'flex items-center gap-2 px-8 py-2 text-sm text-red-700')}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                                        </svg>

                                                        {loading ? 'Log outing...' : 'Log out'}
                                                    </Link>
                                                )}
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}
