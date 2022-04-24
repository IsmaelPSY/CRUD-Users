import './UserItem.css'
const UserItem = ({user,onUpdate,onDelete})=>{
    return(
        <div className="userContainer">
            <div>
            <h1>{user.first_name} {user.last_name}</h1>
            <p>{user.email}</p>
            <p><i className="fa-solid fa-cake-candles"></i> {user.birthday}</p>
            </div>
            <div className='buttons'>
            <button className='fz' title='Eliminar' onClick={() => onDelete(user)}><i className="fa-solid fa-trash-can"></i></button>
            <button className='fz' title='Editar' onClick={() => onUpdate(user)}><i className="fa-solid fa-pen-to-square"></i></button>
            </div>
        </div>
    )
}
export default UserItem