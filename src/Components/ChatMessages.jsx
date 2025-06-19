import { useEffect,useRef } from 'react';
import robotImage from '../assets/robot.png';
import userImage from '../assets/user.png';

function useAutoScroll(chatMessages){ 
  const containerRef = useRef();

  useEffect(()=>{
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  },[chatMessages]);

  return containerRef;
}  
      
 function ChatMessages({chatMessages}){
    const ChatMessageRef = useAutoScroll(chatMessages);

   return(
    <div ref={ChatMessageRef} className="ChatMesages">
      {chatMessages.map((messages)=>{
          return (
            <RenderMessage 
              message = {messages.message} 
              sender ={messages.sender}
              key={messages.id}
              time = {messages.time}
            />
          )
      })} 
    </div>
   )
 }


function RenderMessage({message,sender,time}){
  // let {message,sender} = prop; // In react we can directly use destructing on props;
   

  return (
    <div className={sender==="user"?'user-message-div':'bot-message-div'}>
      {sender === 'robot' && <img className='robotImage' src={robotImage} alt="robot" />}
        <div className="messages">
          {message}
          <div className='messageTime'>{time}</div>
        </div>
      {sender === 'user' &&   <img className='userImage' src={userImage} alt="user"/>}
    </div>
  )
 }  


export default ChatMessages; 