import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  todo: string;
  index: number;
}

function DraggableCard({ todo, index }: IDraggableCardProps) {
  return (
    <Draggable draggableId={todo} index={index} key={todo}>
      {(drag, snapshot) => (
        <Card
          ref={drag.innerRef}
          {...drag.dragHandleProps}
          {...drag.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div<{ isDragging: boolean }>`
  background: ${(props) => props.theme.cardColor};
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  user-select: none;
  box-shadow: ${(props) =>
    props.isDragging ? "0 2px 5px rgba(0, 0, 0, 0.2)" : "none"};
`;

export default memo(DraggableCard);
