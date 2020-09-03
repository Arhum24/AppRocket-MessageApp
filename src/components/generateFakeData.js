const faker = require('faker')

class User {
    constructor() {
        this.id = faker.random.uuid()
        this.name = faker.name.findName()
        this.avatar = faker.internet.avatar()
    }
}

// const allUsers = async() => {
    
//     const token = localStorage.getItem("token");
//     await fetch("http://localhost:8000/api/userdata", {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'x-access-token': token,
//             "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//             username: username
//         }),

//     }).then((response) => response.json()).then((data) => {
//         console.log(data);
//     })

// }
export class Message {
    constructor(isMainUser, msg, date) {
        this.id = faker.random.uuid()
        this.msg = msg || faker.lorem.words(faker.helpers.randomize([...Array(20).keys()]))
        this.isMainUser = isMainUser
        this.date = date || faker.date.recent()
    }
}

export const mainUser = new User()

// export const mainuser = async () => {

//     const token = localStorage.getItem("token");
//     await fetch("http://localhost:8000/api/userdata", {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'x-access-token': token,
//             "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//             username: username
//         }),

//     }).then((response) => response.json()).then((data) => {
//         console.log(data);
//     })
// }

export const contacts = [...Array(15).keys()].map(() => new User())

export const contactsMessages = contacts.map((contact) => {
    return {
        contact,
        messages: [...Array(50).keys()]
            .map((_, i) => {
                return (i + 1) % 2 === 0 ? new Message(true) : new Message(false)
            })
            .filter((m) => m.msg),
    }
})
