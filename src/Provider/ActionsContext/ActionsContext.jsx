import React, { createContext, useState } from 'react'

export const ActionsContext = createContext();

export default function ActionsContextComponent({ children }) {
    const [openCreateFolderModal, setOpenCreateFolderModal] = useState(false);
    const [openAddFileModal, setOpenAddFileModal] = useState(false);
    const [openDeleteFileModal, setOpenDeleteFileModal] = useState(false);
    const [opendeleteFolderModal, setOpenDeleteFolderModal] = useState(false);
    const [openEditFolderModal, setOpenEditFolderModal] = useState(false);
    return (
        <ActionsContext.Provider value={
            {
                openCreateFolderModal,
                setOpenCreateFolderModal,
                openAddFileModal, setOpenAddFileModal,
                openDeleteFileModal, setOpenDeleteFileModal,
                opendeleteFolderModal, setOpenDeleteFolderModal,
                openEditFolderModal, setOpenEditFolderModal,
            }}
        >
            {children}
        </ActionsContext.Provider>
    )
}
