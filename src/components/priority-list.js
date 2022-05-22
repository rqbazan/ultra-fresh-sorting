import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export function PriorityList({ dataSource, onChange }) {
  function onDragEnd(result) {
    if (!result.destination) {
      return
    }

    const newItems = reorder(
      dataSource,
      result.source.index,
      result.destination.index
    )

    onChange(newItems)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {dataSource.map((value, index) => {
              return (
                <Draggable key={value} draggableId={value} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex"
                    >
                      <div className="bg-black text-white px-2 flex items-center">
                        {index + 1}
                      </div>
                      <div className="w-full px-3 py-2 border border-dashed border-gray-500 text-xs focus:border-transparent bg-white">
                        {value}
                      </div>
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
