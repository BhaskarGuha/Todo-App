import React from "react";
import Button from "../UI/Button";
import styles from "./TodoModal.module.css";
import Wrapper from "../UI/Wrapper";
import { createPortal } from "react-dom";
import { useTodosStore } from "../../../utils/store";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Backdrop = ({ onConfirm }) => {
    return <div className={styles.backDrop} onClick={onConfirm} />;
};

const ModalOverlay = ({ onConfirm, id }) => {
    const addTodo = useTodosStore(state => state.addTodo);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const _showToast = () => {
        toast.warn("Can't leave both fileds empty & submit");
    }

    const handleAddTodo = () => {
        if(title.length === 0 || description.length === 0) {
            _showToast()
            return;
        }
        console.log({catId: id, name: title, description: description});
        addTodo({catId: id, name: title, description: description})
        setTitle('');
        setDescription('');
    }

    return (
        <form className={styles.form}>
            <div className={styles.title}>Todo Form</div>
            <div className={styles.first_part}>
                <label htmlFor="Title" >Title</label>
                <input type="text" placeholder="Enter todo name..." value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className={styles.second_part}>
                <label htmlFor="Description">Description</label>
                <input type="text" placeholder="Enter todo description..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className={styles.btnContainer}>
                <Button
                    onClick={handleAddTodo}
                >Okay</Button>
                <Button className={styles.btn_close} onClick={onConfirm}>
                    Close
                </Button>
            </div>
        </form>
    );
};


const TodoModal = ({ onConfirm, id }) => {
    return (
        <Wrapper>
            {createPortal(
                <Backdrop onConfirm={onConfirm} />,
                document.getElementById("backdrop-root")
            )}
            {createPortal(
                <ModalOverlay onConfirm={onConfirm} id={id} />,
                document.getElementById("modal-root")
            )}
            <ToastContainer />
        </Wrapper>
    );
};

export default TodoModal;
