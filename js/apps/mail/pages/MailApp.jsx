import { mailService } from '../services/mail.service.js';

import { MailList } from '../cmps/MailList.jsx';
import { MailSearch } from '../cmps/MailSearch.jsx';
import { MailNav } from '../cmps/MailNav.jsx';

// export 
const { Link } = ReactRouterDOM

export class MailApp extends React.Component {

    state = {
        mails: null,
        filterBy: null,
        selectedMail: null,
        isOpenMail: false
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const { filterBy } = this.state
        mailService.query(filterBy)
            .then(mails => {
                this.setState({ mails })
            })
    }

    onSetFilter = (filterBy) => {
        console.log(filterBy);
        // this.setState({ filterBy }, this.loadMails)
    }

    openCompose = () => {
        <Link className="mail-compose" to="/mail/Compose"></Link>
        console.log('New Message');
    }

    mailSearchFor = (val) => { console.log('searching', val) }


    getMailToOpen = (mailId) => {
        var currMailToOpen = this.getMailById(mailId)
        this.openToRead(currMailToOpen)
    }

    getMailById = (mailId) => {
        this.loadMails()
        const mails = this.state.mails
        let currMail;
        mails.forEach(mail => {
            if (mail.id === mailId) currMail = mail;
        });
        return currMail
    }

    openToRead = (openMail) => {
        this.setState({ mails: openMail, isOpenMail: true })
    }

    render() {
        const { mails } = this.state
        if (!mails) return <h2>There is no mail to show</h2>
        console.log(this.state);
        return (
            <section className="mail-app-container">
                <div className="mail-header">
                    <h1>Email LOGO</h1>
                    <MailSearch mails={mails} mailSearchFor={this.mailSearchFor} />
                </div>
                <main className="main-mail-preview">
                    <div className="mail-nav-container">
                        <button onClick={this.openCompose} >➕Compose</button>
                        <MailNav onSetFilter={this.onSetFilter} />
                    </div>
                    <MailList mails={mails} isOpenMail={this.state.isOpenMail} getMailToOpen={this.getMailToOpen} />
                </main>
            </section>
        )
    }
}

