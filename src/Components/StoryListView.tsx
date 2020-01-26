import React from 'react';
import { List, ListItem } from '@material-ui/core';
import StoryCard from './StoryCard';
import { Story } from '../Model/Model';

interface Props {
    stories: Story[];
}

class StoryListView extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <List>
                {this.props.stories.map(story => <ListItem key={story.id}><StoryCard story={story} /></ListItem>)}
            </List>);
    }
}

export default StoryListView;
