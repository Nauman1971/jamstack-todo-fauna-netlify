import React, { useEffect, useState } from 'react';
import * as styles from './index.module.css';
import axios from 'axios';
import Todo from '../components/todo';
import Form from '../components/form';
import Loader from '../components/Loader';

const Home = () => {
  const [status, setStatus] = useState('loading');
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    let canceled = false;

    if (status !== 'loading') return;

    axios('/api/get-all-todos').then(result => {
      if (canceled === true) return;

      if (result.status !== 200) {
        console.error('Error loading todos!');
        console.error(result);
        return;
      }

      setTodos(result.data.todos);
      setStatus('loaded');
    });

    return () => {
      canceled = true
    }

  }, [status])

  const reloadTodos = () => setStatus('loading');
  return (
    <main className="container is-max-desktop">
      <h1 className="title is-2 has-text-centered mt-5">JAMStack Todos</h1>
      <Form reloadTodos={reloadTodos} />
      {todos ? (
        <ul className={styles.todos}>{todos.map((todo => (
          <li key={todo._id} className={styles.todo}>
            <Todo reloadTodos={reloadTodos} todo={todo} />
          </li>
        )))}</ul>
      ) :
        (<Loader loading={status === 'loading'} />)}
    </main>
  )
}
export default Home;