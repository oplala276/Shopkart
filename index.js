import express from 'express';
import Connection from './database/db.js';
import DefaultData from './default.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Router from './routes/route.js';
import cors from 'cors';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Nl0Z7SH958JFqSHB3LxyHbftyYWil9d8tdatLdam00ieRrQOCPkb8RJTKlaLA5TBP9HZBZH5UnQACNynPYeskLB00bH0bwDHr', {
    apiVersion: '2023-08-16',
})

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', Router);
const PORT = 8000;


const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

DefaultData();

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: 'price_1NlDhaSH958JFqSHhutKN4vy',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://shopkart-zx4t.onrender.com/',
        cancel_url: 'https://shopkart-zx4t.onrender.com/',
    });

    res.json({ id: session.id });
});

