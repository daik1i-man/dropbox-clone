import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { ActionsContext } from '../../Provider/ActionsContext/ActionsContext';
import DeleteFolderModal from '../DeleteFolderModal/DeleteFolderModal';
import EditFolderModal from '../EditFolderModal/EditFolderModal';

export function FolderComponent({ folderId, firstFileURL, name, elementsLength }) {
    const { setOpenDeleteFolderModal, setOpenEditFolderModal } = useContext(ActionsContext);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <div className="">
                <div className="w-64 h-64 mt-8 rounded-md cursor-pointer border-2 relative border-solid">
                    <Link to={`/${folderId}`}>
                        <img
                            className="rounded-md h-full w-full"
                            src={firstFileURL}
                            alt=""
                        />
                    </Link>
                    <Menu as="div" className="absolute top-2 right-2">
                        <div>
                            <MenuButton className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                </svg>
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
                                            onClick={() => setOpenEditFolderModal(true)}
                                            className={classNames(focus ? 'bg-gray-100' : '', 'flex items-center gap-5 px-4 py-2 text-sm text-gray-700')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                            Edit Folder
                                        </Link>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ focus }) => (
                                        <Link
                                            onClick={() => setOpenDeleteFolderModal(true)}
                                            className={classNames(focus ? 'bg-gray-100' : '', 'flex items-center gap-5 px-4 py-2 text-sm text-gray-700')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            Delete Folder
                                        </Link>
                                    )}
                                </MenuItem>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
                <div className="m-1.5">
                    <h1 className="font-semibold">{name}</h1>
                    <p className="text-sm">{`${elementsLength} elements`}</p>
                </div>
            </div>
            <DeleteFolderModal id={folderId} />
            <EditFolderModal id={folderId} />
        </>
    );
}
