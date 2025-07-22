import constants from "../modules/constants.js"

export default {
    name: "version",
    type: "handle",
    handle() {
        return constants.VERSION
    }
}