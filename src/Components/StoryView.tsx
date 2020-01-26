import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Divider, Typography, Box } from '@material-ui/core';
import '@firebase/database'
import Database from '../Database';

interface MatchParams {
    id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface State {
    story: any;
    comments: any[];
}

class StoryView extends React.Component<Props, State> {
    state: State = {
        story: {},
        comments: []
    }

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        const db = Database.getInstance();
        db.getStory(id)
            .then((story: any) => {
                this.setState({ story: story.content });
                this.recurseKids(story.content, 0);
            });
    }

    render() {
        return <div>
            <h1>{this.state.story ? this.state.story.title : "..."}</h1>
            {this.renderThreads()}
        </div>
    }

    renderThreads() {
        return this.state.comments.map(comment => <Box m={2} key={comment.id}>
            <Typography variant="subtitle1">{comment.by}</Typography>
            <Typography variant="subtitle2">{this.formatTime(comment.time)}</Typography>
            <Typography variant="body1">{comment.text}</Typography>
            {this.renderKids(comment, 1)}
            <Divider />
        </Box>);
    }

    renderKids(parent: any, level: number) {
        return parent.children.map((comment: any) => <Box m={level + 4} key={comment.id}>
            <Typography variant="subtitle1">{comment.by}</Typography>
            <Typography variant="subtitle2">{this.formatTime(comment.time)}</Typography>
            <Typography variant="body1">{comment.text}</Typography>
            {this.renderKids(comment, level + 1)}
            <Divider />
        </Box>);
    }

    recurseKids(parent: any, level: number) {
        if ("kids" in parent) {
            parent.kids.forEach((s: any) => {
                Database.getInstance().fireDb.ref("v0/item/" + s).once("value", (s: any) => {
                    const comment = s.val();
                    comment.children = [];
                    if (level === 0) {
                        this.setState(prevState => ({ comments: [...prevState.comments, comment] }))
                        this.recurseKids(comment, level + 1);
                    } else {
                        const comments = [...this.state.comments];
                        let index = comments.indexOf(comments.find(c => c.id === parent.id));
                        comments[index].children.push(comment);
                        this.setState({ comments });
                    }
                });
            })
        }
    }

    formatTime(time: number) {
        let date = (new Date(time * 1000)).toLocaleString();
        return date.toLocaleString();
    }
}

export default StoryView;