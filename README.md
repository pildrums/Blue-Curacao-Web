droppable: 어떤 것을 드롭할 수 있는 영역 (Board 영역)  
draggable: 어떤 것을 드래그 할 수 있는 영역 (Card 영역)  
droppable, draggable 안에 children은 반드시 함수로 넣어줘야 함  
children 안에 함수의 첫번째 인자는 innerRef, placeholder, droppableProps를 가지고 있음  
draggable의 속성 중 dragHandleProps는 특정 영역을 통해서만 드래그를 가능하도록 하고 싶을 때 사용(그것이 아니라 Card 자체를 드래그 하고 싶으면 Card component에 적용)  

DragDropContext는 onDragEnd props를 넣어줘야 함  
onDragEnd는 드래그가 끝나고 무엇을 해야 할 지 결정하는 함수  
map 함수를 사용할 때는 반드시 array여야 함  
ui를 만들 때는 일단 dummy data로 array를 만들고 map 함수 적용  

result: DropResult  
result.draggableId: 드래그 되었던 Draggable의 id  
result.type: 드래그 되었던 Draggable의 type  
result.source: Draggable 이 시작된 위치(location)  
result.destination: Draggable이 끝난 위치(location). 만약에 Draggable이 시작한 위치와 같은 위치로 돌아오면 이 destination값은 null이 될 것
