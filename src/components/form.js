import React, { useState } from 'react';
import axios from 'axios';
import * as styles from './form.module.css';

const Form = ({ reloadTodos }) => {
    const [text, setText] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        if (text === '') return;
        await axios.post('/api/create-todo', { text });

        setText('');
        reloadTodos();
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
                Add to Todo
                <input
                    type="text"
                    className={styles.input}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className={`${styles.button} mt-2`}>Save Todo</button>
            </label>
        </form>
    );
}

export default Form;