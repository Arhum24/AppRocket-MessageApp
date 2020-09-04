const faker = require('faker')

// class User {
//     constructor() {
//         this.id = faker.random.uuid()
//         this.name = faker.name.findName()
//         // this.avatar = faker.internet.avatar()
//     }
// }
class User {
    constructor() {
        fetch("https://approcketmessaging-node.herokuapp.com/api/userdata", {
            method: 'GET',
        }).then((response) => response.json()).then( (err,data) => {
            if(err){
                console.error(err);
            }
            else{
             return data;
            }
        })
    }
}

function AllUser(userId) {
    
        fetch("https://approcketmessaging-node.herokuapp.com/api/allusersdata", {
            method: 'GET',
            body: new URLSearchParams({
                _id : userId,

            }),
        }).then((response) => response.json()).then( (err,data) => {
            if(err){
                console.error(err);
            }
            else{
             return data;
            }
        })
    
}

export class Message {
    constructor(isMainUser, msg) {
        this.id = faker.random.uuid()
        this.msg = msg || faker.lorem.words(faker.helpers.randomize([...Array(20).keys()]))
        this.isMainUser = isMainUser
    }
}

export const mainUser = new User()

export const contacts = [...Array(5).keys()].map(() => AllUser(localStorage.getItem("profile._id")))

export const contactsMessages = contacts.map((contact) => {
    return {
        contact,
        messages: [...Array(12).keys()]
            .map((_, i) => {
                return (i + 1) % 2 === 0 ? new Message(true) : new Message(false)
            })
            .filter((m) => m.msg),
    }
})
