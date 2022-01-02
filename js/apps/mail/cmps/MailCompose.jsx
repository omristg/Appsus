import { mailService } from "../services/mail.service.js"

const { Route } = ReactRouterDOM

export class MailCompose extends React.Component {

    state = {
        sentTo: '',
        subject: '',
        txt: '',
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
        console.log(this.props);
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    onSentMail = (ev) => {
        ev.preventDefault();
        console.log('bbb');
        const { txt } = this.state
        const mailToSave = this.createMailtoSave(txt)
        console.log(mailToSave);
        mailService.saveMail(mailToSave)
            .then(this.props.loadMails())
            .then(this.clearForm())
    }

    onSaveToDrafts = (ev) => {
        console.log('aaa');
        ev.preventDefault();

    }

    clearForm = () => {
        this.setState({ sentTo: '', subject: '', txt: '' })
        this.props.onToggleIsTypeSelected()
    }

    createMailtoSave = (txt) => {
        return {
            id: null,
            type: 'note-txt',
            isPinned: false,
            info: { txt: txt }
        }
    }

    render() {
        const { sentTo } = this.state.sentTo;
        const { subject } = this.state.subject;
        const { txt } = this.state.txt;
        const { onToggleIsTypeSelected } = this.props;

        return (
            <section className="mail-compose item-center">
                <h4>Write something</h4>
                <form onSubmit={this.onSubmit}>
                    <label forhtml="email"></label>
                    <input ref={this.inputRef} type="email" name="sentTo" placeholder="Sent To" value={sentTo} onChange={this.handleChange} />
                    <input ref={this.inputRef} type="text" name="subject" placeholder="Subject" value={subject} onChange={this.handleChange} />
                    <textarea ref={this.inputRef} placeholder="Main content" name="txt" cols="60" rows="20"
                        value={txt} onChange={this.handleChange}
                    ></textarea>
                </form>
                <div className="btns-container">
                    <button onClick={this.onSentMail}>Sent</button>
                    <button onClick={this.onSaveToDrafts}>Cancel</button>
                </div>
            </section>
        )
    }

    // return <h2>bbb</h2>
}
