import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

const TaskToDo = ({ toDo, markDone, setUpdateData, deleteTask }) => {
  return(
    <>
      {toDo && toDo
      .sort((a, b) => a._id > b._id ? 1 : -1)
      .map( (task, index) => {
        return(
          <React.Fragment key={task._id}>
            <div className="col taskBg">
              <div className={ task.isCompleted ? 'done' : '' }>
                <span className="taskNumber">{index + 1}</span>
                <span className="taskText">{task.task}</span>
              </div>
              <div className="iconsWrap">
                <span title="Completed / Not Completed"
                  onClick={ (e) => markDone(task._id) }
                >
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>

                {task.isCompleted ? null : (
                  <span title="Edit"
                    onClick={ () => setUpdateData(task) }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                )}

                <span title="Delete"
                  onClick={() => deleteTask(task._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>
            </div>
          </React.Fragment>
        )
      })
      }  
    </>
  )
}

export default TaskToDo;