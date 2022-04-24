import './App.css';
import {useEffect,useState} from 'react';
import getAllUsers from './services/getAllUsers';
import createUser from './services/createUser';
import deleteUser from './services/deleteUser';
import editUser from './services/editUser'
import { useForm} from 'react-hook-form'
import UserItem from './components/UserItem';

function App() {

  const defaultValues = {first_name: '', last_name: '', password: '', birthday: '' , email: ''}


  const [ userList, setUserList ] = useState([])
  const [ user , setUser] = useState({})
  const [ isEditing , setIsEditing ] = useState(false)
  const [ idEdited , setIdEdited ] = useState()

  const { reset , register, handleSubmit} = useForm();
  
  useEffect(()=>{
    getAllUsers()
      .then((resp)=>{
        setUserList(resp.data)
      })
  },[user])


  const onSubmit = (data) => {
    if(isEditing){
      editUser(idEdited,data);
      reset(defaultValues)
      setUser({})
    }
    else{
    createUser(data);
    reset(defaultValues)
    setUser(data)
    }
  };

  const editCanceled = ()=>{
    setIsEditing(false)
    reset(defaultValues)
  }
  const handleDelete = (user)=>{
    console.log('eliminando')
    deleteUser(user.id)
    setUser(user)
  }

  const handleUpdate = (user)=>{
    reset({first_name: user.first_name, last_name: user.last_name, password: user.password, birthday: user.birthday , email: user.email})
    setIdEdited(user.id)
    setIsEditing(true)
  }

  const list = userList.map((user)=><UserItem key={user.id} user={user} onDelete={handleDelete} onUpdate={handleUpdate}/>)

  return (
    <div className="App">
      <div className='usersList'>
      {list}
      </div>
      <div className='formContainer'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          isEditing ? 
          <h2>Editing User</h2>
          : 
          <h2>NewUser</h2>
        }
        <div className='input'>
        <input {...register("first_name")} placeholder="First Name" required/>
        <input {...register("last_name")} placeholder="Last Name" required/>
        </div>
        <div className='input'>
          <input {...register("email")} placeholder="Email" required/>
        </div>
        <div className='input'>
        <input {...register("password")} placeholder="Password" type="password" required/>
        </div>
        <div className='input'>
        <input {...register("birthday")} placeholder="Birthday" type="date" required/>
        </div>
        <div className='input'>
        <input className='ta-center' type="submit" value="Upload" />
        {
          isEditing && <input className='ta-center' value="Cancel" onClick={()=> editCanceled()}/>
        }
        </div>
      </form>
      </div>
    </div>
  );
}

export default App;
