import { todoState } from "atoms";
import Board from "Container/Board";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";

function App() {
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    // same board movement
    if (destination?.droppableId === source.droppableId) {
      setTodos((current) => {
        const copyBoard = [...current[source.droppableId]];
        // 1) Delete item on source.index
        copyBoard.splice(source.index, 1);
        // 2) Put back the item on destination.index
        copyBoard.splice(destination.index, 0, draggableId);
        return {
          ...current,
          [source.droppableId]: copyBoard,
        };
      });
    }

    // cross board movement
    if (destination?.droppableId !== source.droppableId) {
      setTodos((current) => {
        // 1) Delete item on source.index
        const sourceBoard = [...current[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        // 2) Put back the item on destination.index
        const destinationBoard = [...current[destination?.droppableId]];
        destinationBoard.splice(destination.index, 0, draggableId);
        return {
          ...current,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  const [todos, setTodos] = useRecoilState(todoState);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
          ))}
        </Boards>
      </Container>
    </DragDropContext>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 680px;
  height: 100vh;
  margin: 0 auto;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export default App;
