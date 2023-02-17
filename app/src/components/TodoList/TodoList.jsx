import {useState, useEffect} from 'react';
import { api } from '../../service/api';
import { Section } from './styles';

export const TodoList = () => {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState(null);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');
  const [completedItems, setCompletedItems] = useState({});

  const token = localStorage.getItem('@TOKEN');
  const id = localStorage.getItem('@USERID');

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    const id = localStorage.getItem('@USERID');
    if (token && id) {
      api.get(`/todos`, { headers: { Authorization: `Token ${token}`} })
        .then(response => {
          setListItems(response.data);
        })
        .catch(error => console.log(error));
      }
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    try{
      const res = await api.post('/todo', {text: itemText}, { headers: { Authorization: `Token ${token}`} })
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    }catch(err){
      console.log(err);
    }
  }

  const deleteItem = async (id) => {
    try{
      await api.delete(`todo/${id}`, { headers: { Authorization: `Token ${token}`}})
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
    }catch(err){
      console.log(err);
    }
  }

  const updateItem = async (e) => {
    e.preventDefault()
    try{
      const res = await api.patch(`/todo/${isUpdating}`, {text: updateItemText}, { headers: { Authorization: `Token ${token}`} })
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].text = updateItemText;
      setUpdateItemText(updateItemText);
      setIsUpdating(updatedItem);
    }catch(err){
      console.log(err);
    }
  }


  const toggleClassTraco = (itemId) => {
    setCompletedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
      <input className="update-new-input" type="text" placeholder="Nova tarefa" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="update-new-btn" type="submit">Update</button>
    </form>
  )

  return (
    <Section>
      <div className="App">
        <h1>Lista de afazeres</h1>
        
        <form className="form" onSubmit={e => addItem(e)}>
          <input type="text" placeholder='Adicionar tarefa' onChange={e => {setItemText(e.target.value)} } value={itemText} />
          <button type="submit">+</button>
        </form>
        <div className="todo-listItems">
        {
          listItems?.map(item => (
            <div key={item._id} className={'divAll'}>
              <input type={'checkbox'} className="todo-item" onClick={() => toggleClassTraco(item._id)} />
              {
                isUpdating === item._id
                ? renderUpdateForm()
                : <>
                  <div className='all'>
                    <p className={`item-content ${completedItems[item._id] ? 'tracejado' : ''}`}>{item.text}</p>
                    <div className='buttons'>
                      <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>atualizar</button>
                      <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>deletar</button>
                    </div>
                  </div>
                </>
              }
            </div>
          ))
        }
        </div>
      </div>
    </Section>
  );
}

export default TodoList;
