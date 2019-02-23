// import App from './App'
import Main from "./Main";
//const app = new App(document.getElementById('game'), 100)
// app.run()

const app = new Main(document.getElementById('game'),
    {
        key: "app",
        width: 576,
        height: 512
    })
