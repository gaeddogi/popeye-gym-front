import { createApp } from "vue"
import App from "./App.vue"
import store from "./store/store.js"
import router from "./router"



// element-plus, bootstrap utilities.css
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import 'bootstrap/dist/css/bootstrap-utilities.css'

const app = createApp(App);

app.use(store)
app.use(router)
// app.use(ElementPlus)

app.mount("#app");
