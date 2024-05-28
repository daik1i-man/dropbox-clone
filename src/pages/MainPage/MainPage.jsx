import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { FolderComponent } from '../../components/FolderComponet/FolderComponent'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import LoaderComponent from '../../LoaderComponent/LoaderComponent';
import { UserAuthContext } from '../../Provider/Provider';
import { store } from '../../database/firebase';
import CreateFolderModal from '../../components/CreateFolderModal/CreateFolderModal';
import { ActionsContext } from '../../Provider/ActionsContext/ActionsContext';
import DeleteFolderModal from '../../components/DeleteFolderModal/DeleteFolderModal';

function MainPage() {
  const { userDatas } = useContext(UserAuthContext);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setOpenCreateFolderModal } = useContext(ActionsContext);

  useEffect(() => {
    setLoading(true);
    const folderRef = query(collection(store, "folders"), where("userId", "==", userDatas.uid));
    const FolderSnap = onSnapshot(folderRef, (folderSnap) => {
      const temp = [];
      folderSnap.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        temp.push(data);
      })


      setDatas(temp);
      setLoading(false);
    })

    return () => FolderSnap;
  }, [userDatas.uid])


  if (loading) {
    return <LoaderComponent />
  }

  return (
    <main>
      <Header />
      <CreateFolderModal />
      <div className="w-full h-full justify-center">
        <div className="max-w-7xl h-full mx-auto">
          <div className='border-b border-solid'>
            <div className="mx-auto flex justify-between items-center h-full py-8">
              <h1 className='text-2xl font-semibold px-2'>{`Folders ${datas.length}`}</h1>
              <button
                onClick={() => setOpenCreateFolderModal(true)}
                className="rounded-md bg-blue-700 flex items-center gap-4 px-4 py-2 h-[25] text-sm font-semibold text-gray-50 shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
                Create folder
              </button>
            </div>
          </div>

          <div className="">
            {datas.length === 0 ? (
              <div className="w-full h-full justify-center">
                <img className='w-80 h-80 mx-auto mt-10' src="https://i.pinimg.com/564x/20/6a/07/206a07c4104b5195664e2d4877ac2e0e.jpg" alt="" />
                <div className="text-center space-y-4">
                  <button
                    onClick={() => setOpenCreateFolderModal(true)}
                    className="rounded-md bg-blue-700 flex mx-auto items-center gap-4 px-4 py-2 h-[25] text-sm font-semibold text-gray-50 shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    Create folder
                  </button>
                  <p className='text-gray-600'>All your folders will be shown here</p>
                </div>
              </div>
            ) : (
              <div className="my-8 grid grid-cols-5 gap-20">
                {datas.map((folder, i) => (
                  <FolderComponent
                    key={i}
                    name={folder.folderName}
                    folderId={folder.id}
                    firstFileURL={folder.file && folder.file.length > 0 ? folder.file[0] : null}
                    elementsLength={folder.file ? folder.file.length : 0}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainPage