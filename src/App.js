import { useState } from "react";


const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


function Button({children, onClick}) {
  return (
    <button className="button" onClick={onClick} >{children}</button>
  )
}

export default function App() {
const [friends, setFriends] = useState(initialFriends)
const [showAddFriend, setShowSddFriend] = useState(false);
const [selectedFriend, setSelectedFriend] = useState(null);

function handleShowAddFriend() {
  setShowSddFriend((show) => !show);
}

function handleAddFriend(friend) {
  setFriends((friends) => [...friends, friend]);
  setShowSddFriend(false);
}

function handleSelection(friend) {
  // setSelectedFriend(friend);
setSelectedFriend((cur) => cur?.id === friend.id
  ? null : friend
);
} 

function handleSplitBill(value) {

  console.log(value);
  setFriends((friends) => 
    friends.map((friend) =>
     friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} 
     : friend))
}

  return (
<div className="app">
  <div className="sidebar">
<FridnsList 
friends={friends} 
onSelection={handleSelection} 
selectedFriend={selectedFriend}
/>
{showAddFriend && <FormFriend  onAddFriend={handleAddFriend} />}
<Button onClick={handleShowAddFriend}>

  {showAddFriend ? "Закрыть" : "Добовлять друга"}
  </Button>
</div>
{selectedFriend && (
<FormSplitBill 
selectedFriend={selectedFriend} 
onSplitBill={handleSplitBill}
//сбрасываем состояние с помощью ключа
key={selectedFriend.id}
/>)}
</div>
  )
}

function FridnsList({friends, onSelection, selectedFriend}) {

 return (
  <ul>
    {friends.map((friend) => (
      <Friend friend={friend} key={friend.id} 
      onSelection={onSelection}
      selectedFriend={selectedFriend}
       />
    ))}
    </ul>
  )
}


function Friend({friend, onSelection, selectedFriend}) {

  const isSelected = selectedFriend?.id === friend.id;
   return (
    <li className={isSelected ? 'Выбирать' : ""} >
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>

    {friend.balance < 0 && (
      <p className="red" >
        Ты должен {friend.name} {Math.abs(friend.balance)}$
      </p>
    )}
      {friend.balance > 0 && (
      <p className="green" >
      {friend.name} Должен тебе {Math.abs(friend.balance)}$
      </p>
    )}
      {friend.balance === 0 && (
      <p>
        Ты должен {friend.name} $
      </p>
    )}

    <Button onClick={() => onSelection(friend)} >{isSelected ? "Закрывать" : "Выбирать"}</Button>
    </li>
  )
}



function FormFriend({onAddFriend}) {
const [name, setName] = useState("");
const [image, setImage] = useState ("https://i.pravatar.cc/48?u=933372");

function handleSubmit(e) {
  e.preventDefault()

  if (!name || !image) return;

const id = crypto.randomUUID();  
const newFriend ={
  name,
  image: `${image} ? = ${id}`,
  balance: 0,
  id:crypto.randomUUID
}
onAddFriend(newFriend);

setName("");
setImage("https://i.pravatar.cc/48?u=933372");
}

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👨‍👩 Имя друга </label>
      <input type="text" value={name} 
      onChange={(e) => setName(e.target.value)} />

      
      <label>🏖Image URL</label>
      <input type="text" value={image}
      onChange={(e) => setImage(e.target.value)} />
     
      <Button>Добовлять</Button>
    </form>
  )
}

function FormSplitBill({selectedFriend, onSplitBill}) {
const [bill, setBill] = useState("");
const [paidByUser, setPaidByUser] = useState("");
const paidByFriend = bill ? bill - paidByUser : "";
const [whoisPaying, setWhoIsPaying] = useState("user");

function handleSubmit(e) {
  e.preventDefault();

if(!bill || !paidByUser) return;
onSplitBill(whoisPaying === "user" ? paidByFriend : -paidByUser);
}
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Разделить счет с {selectedFriend.name} </h2>

        <label>Стоимость счета💵</label>
      <input type="text" value={bill}
      onChange={(e) => setBill(Number(e.target.value))}
      />
     
      <label>Ты оплачиваешь 🧒</label>
      <input type="text" value={paidByUser}
      onChange={(e) => setPaidByUser(
       Number(e.target.value) > bill ? paidByUser :
       Number(e.target.value)
    )}
      />

      <label>👫 {selectedFriend.name}</label>
      <input type="text" disabled value={paidByFriend}/>

      <label>🤑 Кто оплачивает счет</label>
      <select  value={whoisPaying} 
      onChange={(e) => setWhoIsPaying(e.target.value)}>

        <option value="user"> Ты</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Разделеный счет</Button>
    </form>
  )
}