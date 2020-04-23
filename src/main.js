
import ReactDOM from "react-dom"
import {e} from "./ui-tools"
import App from "./ui/app.coffee"

window.onload = () => {

  ReactDOM.render(e(App), document.getElementById('app-mount'));
}
