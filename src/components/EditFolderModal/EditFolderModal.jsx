import { Fragment, useContext, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { ActionsContext } from '../../Provider/ActionsContext/ActionsContext'
import { doc, updateDoc } from 'firebase/firestore';
import { store } from '../../database/firebase';

export default function EditFolderModal({ id }) {
    const [folderName, setFolderName] = useState('');
    const [loading, setLoading] = useState(false);
    const { openEditFolderModal, setOpenEditFolderModal } = useContext(ActionsContext);
    const folderRef = doc(store, "folders", id);

    const EditFolderHandler = async () => {
        setLoading(true);
        if (folderName !== '') {
            await updateDoc(folderRef, { folderName: folderName })
            setOpenEditFolderModal(false);
            console.log("Succesfully");
            setLoading(false);
        }
    }

    return (
        <Transition show={openEditFolderModal}>
            <Dialog className="relative z-10" onClose={setOpenEditFolderModal}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div>
                                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                            Folder Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="text"
                                                name="text"
                                                type="text"
                                                autoComplete="text"
                                                value={folderName}
                                                onChange={(e) => setFolderName(e.target.value)}
                                                required
                                                className="block w-full rounded-md py-1.5 px-3 text-gray-900 shadow-sm border border-gray-600 ring-gray-300 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={EditFolderHandler}
                                    >
                                        {loading ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-8 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpenEditFolderModal(false)}
                                        data-autofocus
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
