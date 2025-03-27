# Electron Basics

## Repository structure 
electron-app/
├── package.json         # Project metadata, dependencies, and scripts
├── main.js              # Main process entry point
├── preload.js           # (Optional) Preload script for secure communication between main and renderer processes
├── renderer/            # Renderer (UI) code
│   ├── index.html       # The main HTML file loaded into the window
│   ├── renderer.js      # JavaScript for the UI logic
│   └── styles.css       # CSS styles for the UI
├── assets/              # Static files (images, icons, etc.)
└── node_modules/        # Installed npm packages


## Explanation of each component 

`package.json`:
1. Contains metadata such as name, version, description, and scripts 
2. Specifies the main entry point of your Electron app(using the "main" field)
3. Lists dependencies (like Electron) and provides commands to run and package your application.
`main.js (Main Process)`:
1. This file is the starting point for your electron app.
2. It creates application windows using Electron's BrowserWindow and loads your HTML file.
3. It also manages application lifestyle events(like quiting on window close)
`preload.js (Optional)`:
1. Runs in the isolated context between the main and renderer process.
2. It safely exposes specific APIs (via contextBridge) to the renderer, which improves security by preventing direct access to Node.js APIs in the renderer.
`renderer/Folder`:
1. index.html: The HTML file that defined the UI layout.
2. renderer.js: Contains client-side JavaScript to handle user interactions.
3. style.css: Provides CSS styling for the UI.
`assets/Folder`:
- Container static assets such as images, icons, fonts, etc., used by the  UI.
`node_modules/Folder`:
- Container all npm-installed dependencies.

<mark> 

All pages should be located in renderer directory.

</mark>

## Features 

- Optional: use a preload script for secure communication:
nodeInegration: true (be cautions in production)

<mark> 

app.on('window-all-cclosed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(browserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})

</mark>

### Loading the pafes from the renderer folder 
- mainWindow.loadfile(path.join(__dirname), 'renderer', 'login.html');

### preload.js 

Example of code:

<mark>

// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Example: send a message to the main process
  sendMessage: (msg) => ipcRenderer.send('message', msg)
});


</mark>

### renderer/login.js

<mark>

document.getElementById('loginButton').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('message');

  // Simulated authentication: if username and password are 'admin'
  if (username === 'admin' && password === 'admin') {
    messageDiv.style.color = 'green';
    messageDiv.textContent = 'Login successful! Redirecting...';

    // Redirect to dashboard after a brief delay
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Invalid username or password.';
  }
});


</mark>

## Communication between frontend and backend  

Example of Code: 

<mark>

// renderer/login.js

document.getElementById('loginButton').addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('message');

  try {
    const response = await fetch("http://127.0.0.1:8080/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      messageDiv.style.color = 'green';
      messageDiv.textContent = `Login successful! Token: ${data.token}`;
    } else {
      messageDiv.style.color = 'red';
      messageDiv.textContent = 'Login failed!';
    }
  } catch (error) {
    console.error("Error during login:", error);
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Error connecting to backend.';
  }
});

- The Electron frontend (in renderer/login.js) sends POST request to that endpint with JSON data.
- On success, it processes the returned token; on failure, it shows an error message.


</mark>

## Example of Rust backend 

Example: 

<mark>

// backend/src/main.rs
use actix_web::{web, App, HttpResponse, HttpServer};
use actix_web_actors::ws;
use actix::{Actor, StreamHandler};
use std::time::{Duration, Instant};

struct MyWebSocket {
    hb: Instant,
}

impl Actor for MyWebSocket {
    type Context = ws::WebsocketContext<Self>;

    // Optionally start heartbeats, etc.
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for MyWebSocket {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        if let Ok(ws::Message::Text(text)) = msg {
            ctx.text(format!("Echo: {}", text));
        }
    }
}

async fn ws_index(req: actix_web::HttpRequest, stream: web::Payload) -> HttpResponse {
    ws::start(MyWebSocket { hb: Instant::now() }, &req, stream)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/ws", web::get().to(ws_index)))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}


</mark>

## Use of react packages in electron

<mark>

It is possible to use react packages in electron. 

Structure of directories.

my-electron-react-app/
├── package.json            # Contains Electron, React, and other dependencies
├── main.js                 # Main process for Electron
├── preload.js              # (Optional) Preload script for secure communication
├── public/                 # Public assets (if using Create React App)
├── src/
│   ├── index.js            # Entry point for the React app
│   ├── App.js              # Main React component
│   └── ... (other React components)
└── webpack.config.js       # (Optional) Webpack configuration if you’re not using CRA

One common approach is to use create react app to  build your frontend and then integrate it with electron. It is possible to develop React app normally with CRA, then configure Elctron's main process to load the built React files (typically from a build directory).

The integration is widely used in production applications. If you build a polished, well-integrated Electron + React application, it can be a very attractive portfolio piece and such a project is definirely marketable.


</mark>



