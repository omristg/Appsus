import { mailService } from '../services/mail.service.js';


// const { Route, Switch } = ReactRouterDOM
const { NavLink, Route } = ReactRouterDOM


function Inbox() {
    console.log(this.props);
    console.log(filter);
    return filter('Index');
}
function Starred(){
    return 'starred';
}
function Important(){
    console.log('ccc');
}
function Sent(){
    console.log('ddd');
}
function Drafts(){
    console.log('eee');
}
function Trash(){
    console.log('fff');
}

// function filterPreview(val){
//     switch (note.type) {
//         case 'Index':
//             return console.log('aaa');
//             // return <NoteTxt {...props} />
//         case 'Starred':
//             return console.log('bbb');
//             // return <NoteTodos {...props} />
//         case 'Important':
//             return <NoteImg  {...props} />
// }
// }

export function MailNav(props) {
    // const filter = props.onSetFilter
    // console.log(props.onSetFilter);
    return (
        < div className="mail-nav" >
            <NavLink activeClassName="mail-inbox" to="/mail/inbox">Inbox</NavLink>
            <NavLink activeClassName="mail-starred" to="/mail/starred">Starred</NavLink>
            <NavLink activeClassName="mail-important" to="/mail/important">Important</NavLink>
            <NavLink activeClassName="mail-sent" to="/mail/sent">Sent</NavLink>
            <NavLink activeClassName="mail-drafts" to="/mail/drafts">Drafts</NavLink>
            <NavLink activeClassName="mail-trash" to="/mail/trash">Trash</NavLink>
            <Route Component={Inbox} path="/mail/inbox" />
            <Route Component={Starred} path="/mail/starred" />
            <Route Component={Important} path="/mail/important" />
            <Route Component={Sent} path="/mail/sent" />
            <Route Component={Drafts} path="/mail/drafts" />
            <Route Component={Trash} path="/mail/trash" />


            {/* <Route Component={filterPreview(Inbox)} path="/mail/inbox" />
            <Route Component={filterPreview} path="/mail/inbox" />
            <Route Component={filterPreview(Starred)} path="/mail/starred" />
            <Route Component={filterPreview(Important)} path="/mail/important" /> */}
            </div >
    )
}