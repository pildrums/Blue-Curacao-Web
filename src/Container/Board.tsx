import { todoState } from "atoms";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  todos: string[];
  boardId: string;
}

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IForm {
  todo: string;
}

function Board({ todos, boardId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm();
  const onValid = (data: IForm) => {
    console.log(data);
    setValue("todo", "");
  };
  return (
    <Container>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(drop, info) => (
          <Area
            ref={drop.innerRef}
            {...drop.droppableProps}
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
          >
            {todos.map((todo, index) => (
              <DraggableCard todo={todo} index={index} key={todo} />
            ))}
            {drop.placeholder}
          </Area>
        )}
      </Droppable>
    </Container>
  );
}

const Container = styled.div`
  background: ${(props) => props.theme.boardColor};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin: 10px 0;
`;

const Area = styled.div<IAreaProps>`
  background: ${(props) =>
    props.isDraggingOver
      ? props.theme.dragColor
      : props.isDraggingFromThis
      ? props.theme.dropColor
      : "none"};
  padding: 10px;
  flex-grow: 1;
  border-radius: inherit;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: inherit;
  }
`;

export default Board;
