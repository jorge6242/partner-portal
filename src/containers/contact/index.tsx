import React from 'react';
import { Grid } from '@material-ui/core';
import ContactForm from '../../components/ContactForm';

export default function Contact() {
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>Contacto</Grid>
            <Grid item xs={6}><ContactForm /></Grid>
        </Grid>
    )
}