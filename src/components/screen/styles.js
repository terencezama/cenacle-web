const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      marginTop: 70,
    },
    toolbar: theme.mixins.toolbar,
});

export default styles;