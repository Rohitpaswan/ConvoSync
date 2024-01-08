import "./search.css";

const Search = () => {
  return (
    <div className="serach">
      <div className="searchForm">
        <input type="text" placeholder="Find User" />
      </div>
      <div className="userChat">
        <div className="userAvatar">
          <img
            src="https://picsum.photos/id/237/200/300"
            className="userImg"
            alt=""
          />
        </div>
        <div className="messageContent" >
          <span className="username"> noodles</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
