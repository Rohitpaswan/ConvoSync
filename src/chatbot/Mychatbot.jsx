import ChatBot from "react-simple-chatbot";
import './chatbot.css'
const Mychatbot = ({updatedSteps ,botAvatar}) => {
  

  return (
    <ChatBot
      botAvatar={botAvatar}
      enableMobileAutoFocus={true}
      floating={true}
      steps={updatedSteps}
      enableSmoothScroll={true}
      hideUserInput={true}
      disableUserInput={true}
    />
  );
};

export default Mychatbot;


