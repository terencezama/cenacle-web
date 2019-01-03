import React, { Component } from 'react'
import { Paper, FormControl, InputLabel, Select, MenuItem, Input, Typography, TextField } from '@material-ui/core';
import { bibleApi } from '../../services';
import { withStyles } from '@material-ui/core';
import styles from './styles';
class BibleLink extends Component {
    state = {
        book: "",
        chapter: 0,
        verse: 0
    }
    _onBookChange = event => {
        this.setState({ book: event.target.value });
    };
    render() {
        const { match, classes } = this.props;
        const { book, chapter, verse } = this.state;
        return (
            <div>
                <Paper className={classes.paper}>
                    <Typography variant="h6" id="tableTitle" >
                        {'Bible Link Generator'}
                    </Typography>
                    <div className={classes.generator}>
                        <FormControl>
                            <InputLabel htmlFor="select-book">Book</InputLabel>
                            <Select
                                // multiple
                                value={this.state.book}
                                onChange={this._onBookChange}
                                input={<Input id="select-book" />}
                                className={classes.select}

                            >
                                {bibleApi.map(book => (
                                    <MenuItem key={book.ord} value={book}>
                                        {book.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {book ? (
                            <FormControl>
                                <InputLabel htmlFor="select-chapter">Chapter</InputLabel>
                                <Input
                                    id="select-chapter"
                                    value={chapter ==0?undefined:chapter}
                                    onChange={e => { this.setState({ chapter: parseInt(e.target.value) }) }}
                                    type="number"
                                    className={classes.textField}
                                    inputlabelprops={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>) : undefined}
                        {chapter ? (
                            <FormControl>
                                <InputLabel htmlFor="select-verse">Verse</InputLabel>
                                <Input
                                    id="select-verse"
                                    value={verse == 0? undefined:verse}
                                    onChange={e => { this.setState({ verse: parseInt(e.target.value) }) }}
                                    type="number"
                                    className={classes.textField}
                                    inputlabelprops={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        ) : undefined}
                    </div>
                    <Typography variant="caption" gutterBottom >
                        {`cdse://${book?book.value.toLowerCase():""}${chapter?':':""}${chapter || ""}${verse?':':""}${verse || ""}`}
                    </Typography>
                    <Typography variant="caption" gutterBottom >
                        {`${book.label?book.label:""}`}
                    </Typography>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(BibleLink)