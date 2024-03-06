import ChatBot from "react-simple-chatbot";
const Mychatbot = ({updatedSteps ,botAvatar}) => {
  

  return (
    <ChatBot
      botAvatar={botAvatar}
      enableMobileAutoFocus={true}
      floating={true}
      steps={updatedSteps}
      enableSmoothScroll={true}
    />
  );
};

export default Mychatbot;


