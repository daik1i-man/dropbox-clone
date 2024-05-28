import React, { useContext, useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { ActionsContext } from '../../Provider/ActionsContext/ActionsContext'
import { UserAuthContext } from '../../Provider/Provider';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, store } from '../../database/firebase';
import { addDoc, arrayUnion, collection, query, where, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';

export default function CreateFolderModal() {
    const [file, setFile] = useState(null);
    const [folderName, setFolderName] = useState('');
    const [loading, setLoading] = useState(false);
    const { openCreateFolderModal, setOpenCreateFolderModal } = useContext(ActionsContext);
    const { userDatas } = useContext(UserAuthContext);

    const date = new Date();
    const formatted = format(date, 'MMMM yyyy');

    const ChageHandler = (e) => {
        setFile(e.target.files[0]);
    }

    const CloseModalHandler = () => {
        setOpenCreateFolderModal(false);
        setFolderName('');
        setFile(null);
    }

    async function UploadFile(file) {
        if (file === null) {
            return null;
        }

        const storageRef = ref(storage, 'folders/' + file.name);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    }

    const CreateFolderHandler = async () => {
        setLoading(true);
        if (folderName !== '' && file !== null) {
            try {
                const url = await UploadFile(file);
                const folderRef = collection(store, "folders");
                const q = query(folderRef, where("userId", "==", userDatas.uid));
                const folderSnap = await getDocs(q);

                await addDoc(folderRef, {
                    userId: userDatas.uid,
                    createdDate: formatted,
                    folderName: folderName,
                    file: arrayUnion(url),
                });
            } catch (error) {
                console.log(error);
                alert(error.message);
            } finally {
                setLoading(false);
                CloseModalHandler();
            }
        } else {
            alert("Please provide both folder name and file.");
            setLoading(false);
        }
    }

    return (
        <Transition show={openCreateFolderModal}>
            <Dialog className="relative z-10" onClose={setOpenCreateFolderModal}>
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
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="text-left my-8 w-[450px] mx-auto">
                                    <form className="space-y-6">
                                        <div>
                                            <label htmlFor="text" className="block text-sm font-medium text-gray-900">
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
                                                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="w-[450px] mx-auto items-center justify-center">
                                    <p className='my-2 text-start text-sm font-medium'>Add file to your folder :</p>
                                    {file === null ? (
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" onChange={ChageHandler} />
                                        </label>
                                    ) : (
                                        <div className="w-full justify-center items-center relative">
                                            <button onClick={() => setFile(null)} className="absolute top-2 right-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            <img src={URL.createObjectURL(file)} className='items-center justify-center w-full rounded-lg bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100' alt="Selected file" />
                                        </div>
                                    )}
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        onClick={CreateFolderHandler}
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-700 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
                                    >
                                        {loading ? 'Creating...' : 'Create folder'}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-8 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={CloseModalHandler}
                                        data-autofocus
                                    >
                                        Close
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
