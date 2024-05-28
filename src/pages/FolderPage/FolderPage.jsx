import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FolderPageComponent from '../../components/FolderPageComponent/FolderPageComponent'
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { store } from '../../database/firebase';
import LoaderComponent from '../../LoaderComponent/LoaderComponent';
import { ActionsContext } from '../../Provider/ActionsContext/ActionsContext';
import AddFileModal from '../../components/AddFileModal/AddFileModal';

export default function FolderPage() {
    const { setOpenAddFileModal, setOpenDeleteFolderModal } = useContext(ActionsContext);
    const { id } = useParams();
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const BackHandler = () => {
        navigate('/');
    }


    const docRef = doc(store, "folders", id);

    useEffect(() => {
        setLoading(true);
        const fetchDatas = async () => {
            const docSnap = onSnapshot(docRef, (snap) => {
                const tempData = snap.data();
                tempData.id = snap.id;
                setDatas(tempData);
            });
            setLoading(false);
        }
        fetchDatas();
    }, [id])

    if (loading) {
        return <LoaderComponent />
    }

    return (
        <div>
            <AddFileModal />
            <div className="w-full h-full justify-center">
                <div className="max-w-[1380px] h-20 mx-auto">
                    <div className="flex justify-between h-full items-center">
                        <div className='cursor-pointer' onClick={BackHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setOpenAddFileModal(true)}
                                className='flex items-center gap-3 bg-blue-700 text-gray-50 py-2 rounded-md px-4'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                +
                                add file
                            </button>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <h1 className='text-3xl font-semibold'>{datas.folderName && datas.folderName}</h1>
                            <p className='text-[14px]'>{`Created date: ${datas.createdDate && datas.createdDate}`}</p>
                        </div>
                        <div className="my-10 grid grid-cols-5 gap-8 justify-center">
                            {datas.files && datas.files.length === 0 ? (
                                <div className="w-full h-full my-10">
                                    <img className='w-80 h-80' src="https://i.pinimg.com/564x/0b/6e/21/0b6e21ce4af414abfa33d596720dc6f2.jpg" alt="" />
                                    <div className="w-full h-full">
                                        <button
                                            onClick={() => setOpenAddFileModal(true)}
                                            className='flex items-center gap-3 bg-blue-700 text-gray-50 py-2 rounded-md px-4'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>
                                            +
                                            add file
                                        </button>
                                        <p className='my-2 text-gray-500'>Folder is empty</p>
                                    </div>
                                </div>
                            ) : (datas.file && datas.file.map((file, i) => (
                                <FolderPageComponent
                                    key={i}
                                    imgUrl={file}
                                />
                            )))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}