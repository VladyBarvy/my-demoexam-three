import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, firstName: '', lastName: '', age: '' });
  const [isEditing, setIsEditing] = useState(false);




  // Загрузка пользователей при монтировании компонента
  useEffect(() => {
    fetchUsers();
  }, []);




/*
  const fetchUsers = async () => {
    try {
        const users = await window.electronAPI.getUsers();
        setUsers(users);
    } catch (error) {
        console.error('Ошибка загрузки пользователей:', error);
    }
};

const addUser = async (user) => {
    try {
        await window.electronAPI.addUser(user);
        fetchUsers(); // Обновляем список пользователей
    } catch (error) {
        console.error('Ошибка добавления пользователя:', error);
    }
};

const deleteUser = async (id) => {
    try {
        await window.electronAPI.deleteUser(id);
        fetchUsers(); // Обновляем список пользователей
    } catch (error) {
        console.error('Ошибка удаления пользователя:', error);
    }
};

const updateUser = async (user) => {
    try {
        await window.electronAPI.updateUser(user);
        fetchUsers(); // Обновляем список пользователей
    } catch (error) {
        console.error('Ошибка обновления пользователя:', error);
    }
};



const handleInputChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};
*/















//-------------------------------------------------------------------------------------





/*
  const fetchUsers = async () => {
    try {
      const users = await ipcRenderer.invoke('get-users');
      setUsers(users);
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  };
*/
const fetchUsers = async () => {
  try {
      const users = await window.electronAPI.getUsers();
      setUsers(users);
  } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
  }
};



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };







 



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await window.electronAPI.updateUser(form);  //await ipcRenderer.invoke('update-user', form);
      } else {
        await window.electronAPI.addUser(form);  //await ipcRenderer.invoke('add-user', form);
      }
      setForm({ id: null, firstName: '', lastName: '', age: '' });
      setIsEditing(false);
      fetchUsers();
    } catch (error) {
      console.error('Ошибка сохранения пользователя:', error);
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await window.electronAPI.deleteUser(id);  //await ipcRenderer.invoke('delete-user', id);
      fetchUsers();
    } catch (error) {
      console.error('Ошибка удаления пользователя:', error);
    }
  };
   /*
        getUsers: () => ipcRenderer.invoke('get-users'),
      addUser: (user) => ipcRenderer.invoke('add-user', user),
      deleteUser: (id) => ipcRenderer.invoke('delete-user', id),
      updateUser: (user) => ipcRenderer.invoke('update-user', user),
      */


  return (

    <div>
      <h1>Управление пользователями</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Имя"
          value={form.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Фамилия"
          value={form.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Возраст"
          value={form.age}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? 'Обновить' : 'Добавить'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Возраст</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Редактировать</button>
                <button onClick={() => handleDelete(user.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>




  /*
  fetchUsers
addUser
deleteUser
updateUser
*/



  );
};

export default UserList;
