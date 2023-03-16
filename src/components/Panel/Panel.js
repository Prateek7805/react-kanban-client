import { Droppable } from 'react-beautiful-dnd';
import './Panel.css';
import Card from '../Card/Card';
export default function Panel({title, id, items}){
    return (
        <div className="d-flex flex-column panel-body mt-3">
            <p className={`panel-title title-${id}`}>{title}</p>
            <Droppable
                droppableId={id}
            >
            {
                (provided)=>{
                    return (
                        <div ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`droppable-panel droppable-panel-${id}`}
                        >
                        {
                            items.map((item, index)=>{
                                return (
                                    <Card key={item.id} index={index} task={item} holderId={id}/>
                                )
                            })
                        }
                        {provided.placeholder}
                        </div>
                    )
                }
            }
            </Droppable>
        </div>
    )
}