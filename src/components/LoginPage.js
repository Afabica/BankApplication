import React from 'raect';
import axios from 'axios';

const LoginPage = () => {
  const [loginemail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  
 
  return (
    <div>
      <section className="LoginForm">
        <div>
        <input 
          placeholder="login or email",
          id="loginemail", 
          value={loginemail}

          
          required
        />
        </div>
      </section>
    </div>
  )
}
