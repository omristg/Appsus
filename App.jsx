import { AppHome } from './js/pages/AppHome.jsx'
import { AppAbout } from './js/pages/AppAbout.jsx'

import { AppHeader } from './js/cmps/AppHeader.jsx'
import { UserMsg } from './js/cmps/UserMsg.jsx'

import { BookApp } from './js/apps/book/pages/BookApp.jsx'
import { BookDetails } from './js/apps/book/pages/BookDetails.jsx'
import { NoteApp } from './js/apps/keep/pages/NoteApp.jsx'
import { MailApp } from './js/apps/mail/pages/MailApp.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return (
        <Router>
            <section className="app">
                <div className="app-header-background">
                    <AppHeader />
                </div>
                <main className="main-layout">
                    <Switch>
                        <Route component={MailApp} path="/mail"></Route>
                        <Route component={NoteApp} path="/note"></Route>
                        <Route component={BookDetails} path="/book/:bookId"></Route>
                        <Route component={BookApp} path="/book"></Route>
                        <Route component={AppAbout} path="/about"></Route>
                        <Route component={AppHome} path="/"></Route>
                    </Switch>
                </main>
            </section>
            <UserMsg />
        </Router>
    )
}

