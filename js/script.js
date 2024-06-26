const { createApp } = Vue
const DateTime = luxon.DateTime;

createApp({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './img/avatar_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './img/avatar_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './img/avatar_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './img/avatar_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            activeUser: 0,
            insertText: "",
            searchText: '',
            tentMessage: ''
        }
    },
    computed: {
        searchFunction: function () {
            let searchTextUpper = this.searchText.toUpperCase()
            if (this.searchText === '') {
                return this.contacts
            }
            const filteredContacts = this.contacts.filter((user, index) => {
                return user.name.toUpperCase().includes(searchTextUpper)
            })
            return filteredContacts
        }
    },
    methods: {
        formatHour: function (userIndex) {
            const messages = this.contacts[userIndex].messages
            const lastMessagesData = messages[messages.length - 1].date
            let [date, time] = lastMessagesData.split(' ')
            time = time.slice(0, -3)
            return time
        },
        lastMessage: function (userIndex) {
            const messages = this.contacts[userIndex].messages
            return messages[messages.length - 1].message
        },
        returnActiveUser: function (nameProperty) {
            return this.contacts[this.activeUser][nameProperty]
        },
        lastMessagesHour: function () {
            const messages = this.contacts[this.activeUser].messages
            const messagesReceived = messages.filter((singleMessageInfo, index) => {
                if (singleMessageInfo.status === 'received') {
                    return true
                }

                return false
            })
            const lastMessagesData = messagesReceived[messagesReceived.length - 1].date
            let [date, time] = lastMessagesData.split(' ')
            time = time.slice(0, -3)
            return time
        },
        changeActiveUser: function (index) {
            this.activeUser = index
        },
        returnHour: function (message) {
            const dateTime = message.date
            let [date, time] = dateTime.split(' ')
            time = time.slice(0, -3)
            return time
        },
        addMessage: function (newMessage) {
            const nowHour = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS);
            const nowDate = DateTime.now().toLocaleString(DateTime.DATE_SHORT);
            const now = nowDate + ' ' + nowHour
            const messageInfo = {
                'date': now,
                'message': '',
                'status': 'sent'
            }
            if (newMessage.length >= 1) {
                messageInfo.message = newMessage
                this.contacts[this.activeUser].messages.push(messageInfo)
                this.insertText = ''
                setTimeout(this.answerMessage, 1000)
            }
        },
        answerMessage: function () {
            const nowHour = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS);
            const nowDate = DateTime.now().toLocaleString(DateTime.DATE_SHORT);
            const now = nowDate + ' ' + nowHour
            const messageInfo = {
                'date': now,
                'message': 'ok!',
                'status': 'received'
            }
            this.contacts[this.activeUser].messages.push(messageInfo)
        },
        startDrag(evt, item) {
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('itemID', item.id)
        },
        onDrop(evt, list) {
            const itemID = evt.dataTransfer.getData('itemID')
            const item = this.contacts.find((item) => item.id == itemID)
            item.list = list
        },
    }
}).mount('#app')
