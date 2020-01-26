import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import StoryListView from './Components/StoryListView';
import StoryView from './Components/StoryView';
import Database from './Database';
import { Story } from './Model/Model';

interface AppState {
    stories: Story[];
}

class App extends React.Component<{}, AppState> {
    state: AppState = {
        stories: []
    }

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        const db = Database.getInstance();

        db.getTopStories()
            .then((stories: any) => {
                this.setState(Object.assign({}, this.state, { stories: stories }));
                stories.forEach((s: any) => {
                    db.getStory(s.id)
                        .then((story: any) => {
                            const stories = [...this.state.stories];
                            let index = stories.indexOf(stories.find(s => s.id === story.id));
                            stories[index] = story;
                            this.setState({ stories });
                        });
                });
            });
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6">HNApp</Typography>
                    </Toolbar>
                </AppBar>
                <Container>
                    <HashRouter>
                        <Switch>
                            <Route path="/story/:id" component={StoryView} />
                            <Route path="/">
                                <StoryListView stories={this.state.stories} />
                            </Route>
                        </Switch>
                    </HashRouter >
                </Container>
            </React.Fragment>
        );
    }
}

export default App;
