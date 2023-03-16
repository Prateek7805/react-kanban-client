import {createContext, useState} from 'react';

export const DeleteContext = createContext({show:false, panelName: '', taskIndex: -1});
export const EditContext = createContext({show:false, editedText:'',oldText:'', panelName:'', taskIndex:-1});
export default function ModalContext ({children}){
    const [deleteItem, setDeleteItem] = useState({show:false, panelName: '', taskIndex: -1});
    const [editItem, setEditItem] = useState({show:false, editedText:'',oldText:'', panelName:'', taskIndex:-1});
    return (
        <DeleteContext.Provider value={{deleteItem, setDeleteItem}}>
            <EditContext.Provider value={{editItem, setEditItem}}>
                {children}
            </EditContext.Provider> 
        </DeleteContext.Provider>
    )
}