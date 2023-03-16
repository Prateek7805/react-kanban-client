import { Draggable } from "react-beautiful-dnd";
import './Card.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DeleteContext, EditContext } from "../Context/ModalContext";
import { useContext } from "react";
export default function Card({index, task, holderId}){
    const {deleteItem, setDeleteItem} = useContext(DeleteContext);
    const {editItem, setEditItem} = useContext(EditContext);
    const handleDeleteAlert = (panelName, taskIndex)=>{
        setDeleteItem({
            show: true,
            panelName:[panelName],
            taskIndex:[taskIndex]
        });
    }
    const handleEditAlert = (panelName, taskIndex, oldText)=>{
        setEditItem({
            show: true,
            panelName: [panelName],
            taskIndex: [taskIndex],
            oldText: [oldText],
            editedText: [oldText]
        });
    }
    const getCardColor = (ss)=>{
        if(!ss.isDragging){
            return '';
        }
        if(!ss.draggingOver){
            return '';
        }
        return `${ss.draggingOver}-card-bg`;
    }
    return (
        <Draggable index={index} draggableId={task.id}>
            {
                (provided, snapshot)=>{
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`drag-card ${getCardColor(snapshot)}`}
                        >
                        <div style={{width: '100%'}} className="flex-row justify-content-end card-actions">
                          <span onClick={()=>{handleEditAlert(holderId,index,task.text)}}><EditIcon sx={{color:'#3E54AC'}} /></span>
                          <span onClick={()=>{handleDeleteAlert(holderId,index)}}><DeleteForeverIcon sx={{color: '#DF2E38' }} /></span>
                        </div>
                        <p style={{width: '100%'}} className='text-center'>{task.text}</p>
                        </div>
                    )
                }
            }
        </Draggable>
    )
}