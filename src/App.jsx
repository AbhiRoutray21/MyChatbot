import { useEffect, useState } from 'react';
import ChatInput from './Components/ChatInput';
import ChatMessages from './Components/ChatMessages'; 
import './App.css';


function App(){
  const [chatMessages,setchatMessages] = useState(JSON.parse(localStorage.getItem('chatMessages')) || []);

  useEffect(()=>{
     localStorage.setItem('chatMessages',JSON.stringify(chatMessages));
  },[chatMessages]);
  
   return( 
    <div className="js-container">
      <ChatMessages chatMessages={chatMessages}/>
      <ChatInput chatMessages={chatMessages} setchatMessages={setchatMessages}/>
    </div>
   ) 
}     

export default App;
