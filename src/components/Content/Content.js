import { useContext, useState } from "react"
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import Panel from "../Panel/Panel";
import _ from 'lodash';
import './Content.css';
import { v4 } from 'uuid';
import { DeleteContext, EditContext } from "../Context/ModalContext";
export default function Content() {
    const [panels, setPanels] = useState({
        "toDo": {
            title: "To Do",
            tasks: [{
                id: v4(),
                text: "drag me!"
            }]
        },
        "inProgress": {
            title: "In Progress",
            tasks: []
        },
        "done": {
            title: "Done!",
            tasks: []
        }
    });

    const [text, setText] = useState('');
    const { deleteItem, setDeleteItem } = useContext(DeleteContext);
    const {editItem, setEditItem} = useContext(EditContext);
    const handleDragEnd = ({ source, destination }) => {
        if (destination == null) { return; }
        if (destination.droppableId === source.droppableId && destination.index === source.index) { return; }

        const sourceStatus = source.droppableId;
        const sourceIndex = source.index;
        const destStatus = destination.droppableId;
        const destIndex = destination.index;
        setPanels(prev => {
            const ret = prev[sourceStatus].tasks.splice(sourceIndex, 1);
            prev[destStatus].tasks.splice(destIndex, 0, ret[0]);
            return prev;
        });
    }

    const handleTaskAdd = () => {
        const textCpy = text;
        if (!textCpy || textCpy === '') {
            return;
        }

        setPanels(prev => {
            prev.toDo.tasks.splice(0, 0, {
                id: v4(),
                text: textCpy
            })
            return prev;
        });
        setText('');
    }

    const handleDelete = () =>{
        setPanels(prev=>{
            prev[deleteItem.panelName].tasks.splice(deleteItem.taskIndex, 1);
            return prev;
        });
        setDeleteItem(prev=>{return {...prev, show:false}});
    }
    const handleCancelEdit = ()=>{
        setEditItem(prev=>{return {...prev, show:false}});
    }
    const handleTaskEdit = ()=>{
        const panelName = editItem.panelName;
        const taskIndex = editItem.taskIndex;
        if(editItem.editedText !== editItem.oldText && editItem.editedText !== ''){
            setPanels(prev=>{
                prev[panelName].tasks[taskIndex].text = editItem.editedText;
                return prev;
            });
        }
        handleCancelEdit();
    }
    
    return (
       <>

       
                <Modal show={deleteItem.show} onHide={()=>{setDeleteItem(prev=>{return {...prev, show: false}})}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to Delete the task</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{setDeleteItem(prev=>{return {...prev, show: false}})}}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={editItem.show} onHide={handleCancelEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Form.Control type='text' className='edit-task-input' placeholder='Enter edited task' value={editItem.editedText} onKeyDown={(e)=>{if(e.key==='Enter') handleTaskEdit()}} onInput={({target})=>{setEditItem(prev=>{return {...prev, editedText:target.value}})}}/></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancelEdit}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleTaskEdit}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
        <Container className = 'main-container' fluid >
                <div className="d-flex flex-column flex-md-row justify-content-start justify-content-md-evenly align-items-center p-1">
                    <Form.Control type='text' className='task-input' placeholder='Enter a new task' value={text} onKeyDown={(e)=>{if(e.key==='Enter') handleTaskAdd()}} onInput={({target})=>{setText(target.value)}}/>
                    <Button variant="primary" className="mt-2 mt-md-0 task-add-btn" onClick={handleTaskAdd}>Add</Button>
                </div>
                
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="d-flex flex-column flex-md-row justify-content-evenly panels-space">
                    {
                        _.map(panels, (data, key)=>{
                            return (
                                <Panel key={key} title={data.title} id={key} items={data.tasks}/>
                            )
                        })
                    }
                    </div>
                </DragDropContext>
            </Container>
           
            </>
    )
}