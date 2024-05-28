import { Fragment, useContext, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { ActionsContext } from '../../Provider/ActionsContext/ActionsContext'
import { useParams } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage, store } from '../../database/firebase'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'

export default function AddFileModal() {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { openAddFileModal, setOpenAddFileModal } = useContext(ActionsContext);

    const ChangeHandler = (e) => {
        setFile(e.target.files[0]);
    }

    const CloseModalHandler = () => {
        setOpenAddFileModal(false);
        setFile(null);
    }

    async function UploadFile(file) {
        if (!file) {
            throw new Error("File is null");
        }

        const storageRef = ref(storage, 'folders/' + file.name);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    }

    const AddFileHandler = async () => {
        if (!file) {
            alert("Please choose a file");
            return;
        }

        setLoading(true);

        try {
            const url = await UploadFile(file);
            const docRef = doc(store, "folders", id);
            await updateDoc(docRef, { file: arrayUnion(url) });
            setOpenAddFileModal(false);
            alert("File added successfully");
        } catch (error) {
            alert("Error adding file: " + error.message);
        } finally {
            setLoading(false);
            setFile(null);
        }
    }

    return (
        <Transition show={openAddFileModal}>
            <Dialog className="relative z-10" onClose={setOpenAddFileModal}>
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
                                <div className="w-[450px] mx-auto items-center justify-center">
                                    <p className='my-2 text-start text-sm font-medium'>Add file :</p>
                                    {file === null ? (
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" onChange={ChangeHandler} />
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
                                        onClick={AddFileHandler}
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-700 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
                                    >
                                        {loading ? 'Adding...' : 'Add file'}
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
