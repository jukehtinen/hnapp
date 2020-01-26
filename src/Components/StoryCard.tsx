import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActions, Link } from "@material-ui/core";
import { Story } from "../Model/Model";

interface Props {
    story: Story;
}

class StoryCard extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Card className="storyCard" style={{ width: 100 + "%" }}>
                <CardContent>
                    <Typography variant="h6">
                        <Link href={this.props.story.content ? this.props.story.content.url : "#"}>
                            {this.props.story.content ? this.props.story.content.title : "..."}
                        </Link>
                    </Typography>
                    <Typography variant="subtitle1">
                        {this.props.story.content ? this.formatTime(this.props.story.content.time) : "..."}
                    </Typography>
                    <Typography variant="subtitle2">
                        {this.props.story.content ? this.props.story.content.by : "..."}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link href={"#/story/" + (this.props.story.content ? this.props.story.content.id : "#")} >
                        Comments ({this.props.story.content ? this.props.story.content.descendants : "..."} )
                    </Link>
                </CardActions>
            </Card>
        );
    }

    formatTime(time: number) {
        let date = new Date(time * 1000).toLocaleString();
        return date.toLocaleString();
    }
}

export default StoryCard;
