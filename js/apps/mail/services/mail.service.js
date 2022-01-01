import { storageService } from '../../../services/storage.service.js'
// import { utilService } from '../../../services/utils.service.js'


export const mailService = {
    query
}

const KEY = 'mailsDB'

_createInboxMails()


function _createInboxMails() {
    const mails = _loadFromStorage()
    if (!mails || !mails.length) {
        const mails = [
            {
                id: "jksdghbcsd",
                sentFrom: "Muki",
                subject: "mi est eros convallis auctor arcu dapibus",
                mailContent: "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                arrivedDate: {
                    day: "Tue",
                    month: "Dec",
                    dayNum: 28,
                },
                isInbox: true,
                isStarred: true,
                isImportant: true,
                isDraft: true,
                isSent: false,
                isChecked: false,
                isRead: true,
                isTrash: false,
                readDate: [{
                    day: "Tue",
                    month: "Dec",
                    dayNum: 28,
                }]
            },
            {
                id: "kjsdvjjnsduk",
                sentFrom: "Puki",
                subject: "lorem euismod dictumst inceptos mi",
                mailContent: "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                arrivedDate: {
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                },
                isInbox: true,
                isSent: false,
                isImportant: true,
                isDraft: false,
                isStarred: false,
                isChecked: true,
                isRead: true,
                isTrash: false,
                readDate: [{
                    day: "",
                    month: "",
                    dayNum: "",
                }]
            },
            {
                id: "opiwejfnje",
                sentFrom: "Shuki",
                subject: "lorem euismod dictumst inceptos mi",
                mailContent: "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                arrivedDate: {
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                },
                isInbox: true,
                isSent: false,
                isImportant: false,
                isDraft: true,
                isStarred: true,
                isChecked: true,
                isRead: false,
                isTrash: false,
                readDate: [{
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                }]
            },
            {
                id: "ljasjnc",
                sentFrom: "Yoni",
                subject: "lorem euismod dictumst inceptos mi",
                mailContent: "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
                arrivedDate: {
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                },
                isInbox: false,
                isSent: true,
                isImportant: false,
                isDraft: false,
                isStarred: true,
                isChecked: true,
                isRead: false,
                isTrash: true,
                readDate: [{
                    day: "Mon",
                    month: "Dec",
                    dayNum: 27,
                }]
            }
        ]
        _saveToStorage(mails)
    }
}

function query(filterBy = null) {
    const mails = _loadFromStorage()
    if (!filterBy) return Promise.resolve(mails)
    const filterMails = _getFilteredMails(mails, filterBy)
    return Promise.resolve(filterMails)
}

function _getFilteredMails(mails, filterBy) {
    return mails.filter(mail=>{
        if (mail[filterBy]) return mail 
    })
    // minPrice = minPrice ? minPrice : 0;
    // maxPrice = maxPrice ? maxPrice : Infinity;
    // return books.filter(book => {
        // return book.title.includes(name) && book.listPrice.amount >= minPrice && book.listPrice.amount <= maxPrice
    // })
}

function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}