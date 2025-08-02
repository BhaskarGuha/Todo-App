import React from "react";
import styles from "./Category.module.css";
import { useTodosStore } from "../../../utils/store";
import Wrapper from "../UI/Wrapper";
import TodoModal from "../Modal/TodoModal";

const Category = ({ name, id, showItems, setShowItems }) => {
    const todos = useTodosStore((state) => state.todos);
    const deleteTodo = useTodosStore((state) => state.removeTodo);
    const deleteAllTodoById = useTodosStore((state) => state.removeAllTodoById);
    const deleteCategory = useTodosStore((state) => state.removeCategory);
    const [showModal, setShowModal] = React.useState(false);
    const toggleModal = () => {
        setShowModal(true);
    };

    return (
        <div className={styles.CategoryContainer}>
            {showModal && (
                <TodoModal id={id} onConfirm={() => setShowModal(false)} />
            )}

            {/* Header */}
            <div className={styles.header} onClick={() => setShowItems()}>
                <h1>{name}</h1>
                <div
                    className={styles.delete_btn_container}
                    onClick={() => {
                        deleteCategory({ catId: id });
                        deleteAllTodoById({ catId: id });
                    }}
                >
                    <button className={styles.delete_btn}>X</button>
                </div>
                <p>⬇️</p>
            </div>
            {/* Body */}
            {showItems && (
                <Wrapper>
                    <hr />
                    <div className={styles.body}>
                        <div className={styles.todoContainer}>
                            {todos.map(
                                (todo) =>
                                    todo.catId === id && (
                                        <div
                                            key={todo.todoId}
                                            className={styles.todo}
                                        >
                                            <div className={styles.heading}>
                                                <h1>{todo.name}</h1>
                                                <p>{todo.description}</p>
                                            </div>
                                            <button
                                                className={styles.btn2}
                                                onClick={() =>
                                                    deleteTodo({
                                                        todoId: todo.todoId,
                                                    })
                                                }
                                            >
                                                X
                                            </button>
                                        </div>
                                    )
                            )}
                        </div>
                        <button className={styles.btn} onClick={toggleModal}>
                            +
                        </button>
                    </div>
                </Wrapper>
            )}
        </div>
    );
};

export default Category;
