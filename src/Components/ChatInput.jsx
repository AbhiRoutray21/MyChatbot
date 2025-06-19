import { useState } from 'react';
import {Chatbot} from 'supersimpledev';
import lodingImage from '../assets/loading-spinner.gif';
import dayjs from 'dayjs';

function ChatInput({chatMessages,setchatMessages}){
 let [inputText, setinputText] = useState('');
 let [isloading,setisloding] = useState(false);

 let currentTime = dayjs().format('h:mma');

  function inputValue(event){
    setinputText(event.target.value);
  }
  
  async function sendMessages(){
    if(isloading || inputText === ''){
        return;
    }
    
    setisloding(true);
    setinputText('');

    const userMessage = [
        ...chatMessages,
        {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: currentTime 
        }
    ]
    setchatMessages(userMessage);
    setchatMessages([
        ...userMessage,
        {
        message: <img className="loadingImage" src={lodingImage}></img>,
        sender: 'robot',
        id: crypto.randomUUID()
        }
    ]);

    let response = await Chatbot.getResponseAsync(inputText);
    setchatMessages([
        ...userMessage,
        {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: currentTime
        }
    ]);
    setisloding(false);
  }

  function clearMessages(){
    setchatMessages([]);
    setinputText('');
  }

  return(
     <div className="input-div">
       <input 
          onChange={inputValue} 
          onKeyDown={(e)=>{
            (e.key === 'Enter') && sendMessages();
            (e.key === 'Escape') && setinputText('');
          }}
          type="text" 
          id="input" 
          placeholder={(chatMessages.length === 0)?"Welcome to the chatbot project! Send a message using the textbox below":"Send a message to Chatbot"} 
          size="30" 
          value={inputText}/>
       <button className='sendMessage' onClick={sendMessages}>Send</button>
       <button className='clearMessage' onClick={clearMessages} >Clear</button>
     </div>
  )
 }

 export default ChatInput;
