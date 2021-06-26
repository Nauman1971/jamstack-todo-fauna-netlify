import React, { useState } from 'react';
import * as styles from './todo.module.css';
import axios from 'axios';
const Todo = ({ todo, reloadTodos }) => {
    const [inputText, setInputText] = useState('');

    const toggleCompleted = () => {
        axios.post('/api/toggle-completed', {
            id: todo._id,
            text: todo.text,
            completed: !todo.completed,
        })
            .then(reloadTodos)
    }

    const handleDelete = () => {
        axios.post('/api/delete-todo', { id: todo._id }).then(reloadTodos)
    }

    const handleUpdate = () => {
        axios.post('/api/update-toggle', {
            id: todo._id,
            text: inputText,
        })
            .then(reloadTodos)
        setInputText('')
    }
    return (
        <>
            <label
                htmlFor={`todo-toggle-${todo._id}`}
                className={styles.label}
            >
                Mark Complete
            </label>
            <input
                id={`todo-toggle-${todo._id}`}
                type="checkbox"
                checked={todo.completed}
                onChange={toggleCompleted}
                className={styles.toggle}
            />
            <p className={`${styles.text} ${todo.completed &&
                styles.completed}`}>
                {todo.text}
            </p>

            <label
                htmlFor={`todo-delete-${todo._id}`}
                className={styles.label}>delete</label>
            <button
                onClick={handleDelete}
                className={styles.deleteBtn}
            >

                <span
                    role="img"
                    aria-label="delete"
                    title="delete this todo"
                >❎
            </span>
            </button>
            <button
                onClick={handleUpdate}
                className={styles.deleteBtn}
            >

                <span
                    role="img"
                    aria-label="delete"
                    title="update this todo"
                >🧰
            </span>
            </button>
            <input
                className="input is-danger"
                required
                placeholder="Enter text to update"
                type="text"
                defaultValue={todo.text}
                onChange={(e) => setInputText(e.target.value)}
            />
        </>
    )
}

export default Todo;