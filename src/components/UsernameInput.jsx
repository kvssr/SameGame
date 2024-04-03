import { useRef } from "react";

const UsernameInput = ({ setUsername }) => {
  let username = useRef();

  const handleOnClick = () => {
    console.log("onClick");
    setUsername(username.current);
  };

  return (
    <div className="username-container">
      <div class="endMessage">
        <p>No more moves.</p>
        <p>Want to submit your score?</p>
      </div>
      <div className="usernameForm">
        <input
          id="usernameInput"
          name="username"
          className="usernameInput"
          placeholder="Username"
          onChange={(e) => (username.current = e.target.value)}
        />
        <button onClick={handleOnClick}>
          <p>Submit</p>
        </button>
      </div>
    </div>
  );
};

export default UsernameInput;
