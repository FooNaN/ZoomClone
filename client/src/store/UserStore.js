import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._id = undefined
        makeAutoObservable(this)
    }
    setId(id) {
        this._id = id
    }
    get id() {
        return this._id
    }
}