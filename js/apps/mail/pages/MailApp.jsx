import { mailService } from '../services/mail.service.js';

import { MailList } from '../cmps/MailList.jsx';
import { MailSearch } from '../cmps/MailSearch.jsx';
import { MailNav } from '../cmps/MailNav.jsx';
import { MailCompose } from '../cmps/MailCompose.jsx';

const { NavLink, Link, Route } = ReactRouterDOM

export class MailApp extends React.Component {

    state = {
        mails: null,
        filterBy: null,
        selectedMail: null,
        isfiltered: false
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        const { filterBy } = this.state
        mailService.query(filterBy)
            .then(mails => {
                this.setState(this.state.mails = mails)
            })
    }

    onSetFilter = (filterBy) => {
        console.log(filterBy);
        this.setState({ filterBy }, this.loadMails)
        this.componentDidMount()
    }

    onSetCompose = () => {
        console.log('New Message');
        <MailCompose />
    }

    mailSearchFor = (val) => { console.log('searching', val) }


    getSelectedMailMsg = (mailId) => {
        var currSelectedMail = this.getSelectedMailById(mailId)
        this.updateSelectedMail(currSelectedMail)
    }

    getSelectedMailById = (mailId) => {
        this.loadMails()
        const mails = this.state.mails
        let currMail;
        mails.forEach(mail => {
            if (mail.id === mailId) currMail = mail;
        });
        return currMail;
    }

    updateSelectedMail = (placeSelectedMail) => {
        this.setState({ selectedMail: placeSelectedMail })
    }

    toggleSelectedMail= ()=>{this.state.selectedMail=null}

    render() {
        const { mails } = this.state;
        if (!mails) return <h2>There is no mail to show</h2>
        var selectedMail;
        (this.state.selectedMail) ? selectedMail = this.state.selectedMail : selectedMail = null
        return (
            <main className="main-mail-app">
                <div className="mail-header">
                    <NavLink to="/mail"><h1>Email LOGO</h1></NavLink>
                    <MailSearch mails={mails} mailSearchFor={this.mailSearchFor} />
                </div>
                <section className="mail-preview">
                    <div className="mail-nav-container">
                        <Link className="mail-compose" to="/mail/compose">
                            <button>➕Compose</button>
                        </Link>
                        <MailNav mails={mails} onSetFilter={this.onSetFilter} filterBy={this.state.filterBy} toggleSelectedMail={this.toggleSelectedMail} />
                    </div>
                        <Route component={MailCompose} path='/mail/compose' />
                    <MailList mails={mails} selectedMail={selectedMail} getSelectedMailMsg={this.getSelectedMailMsg} />
                </section>

            </main>
        )
    }
}

