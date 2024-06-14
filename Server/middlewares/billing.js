const fs = require('fs');
const Agenda = require('agenda');
const nodemailer = require('nodemailer');
const easyinvoice = require('easyinvoice');

require('dotenv').config();

const agenda = new Agenda({db: {address: process.env.MONGODB_URI}});

agenda.define('createBilling', (job) => {
    try {

        const { username, userEmail, userId, membershipPlan, membershipFees } = job.attrs.data; 

        var data = {
            "client": {
                "company": `Name: ${username}`,
                "address": `Email: ${userEmail}`,
                "zip": `Gym-Id: ${userId}`,
            },
        
            "sender": {
                "company": "Gym-Management-System",
                "address": "Street 123",
                "zip-code": "1234 AB",
                "city": "SampleTown",
                "country": "SampleCountry"
            },
        
            "images": {
                logo: "https://res.cloudinary.com/dhlsmeyw1/image/upload/v1718309035/ka7gpbbgzvg20t0gzptp.png"
            },
        
            "information": {
        
            },
        
            "products": [
                {
                    "description": `${membershipPlan} Membership Plan`,
                    "tax-rate": 6,
                    "price": `${membershipFees}`,
                },
            ],
            "bottomNotice": "Kindly renew your membership if you wish to continue",
        
        };

        easyinvoice.createInvoice(data, (result) => {
            fs.writeFileSync('Server/middlewares/invoices/invoice.pdf', result.pdf, 'base64');
        })
        .then(() => {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL,
                    pass: process.env.GMAIL_PASSWORD
                }
            });

            transporter.sendMail({
                from: process.env.GMAIL,
                to: userEmail,
                subject: 'GYM-Membership',
                text: `Hey ${username}.

                        This is a reminder that your membership is about to expire soon!

                        We have loved having you as part of our gym community, and we hope that our gym/club has lived up to your expectations.

                        If you renew your membership today, we'll give you 20% off on your membership package! Consider it a gift for being a valued member of our community.

                        You can also reach out to us about upgrading your membership package. Become an elite member and get the first month of your membership free!

                        Are you free for a quick chat on the phone or at the club today?

                        Best,

                        Gym-Owner

                        Gym-Management-System`,
                attachments: [
                    {
                        filename: 'invoice.pdf',
                        content: fs.createReadStream('Server/middlewares/invoices/invoice.pdf')
                    }
                ]
            })
            .then(() => {

                fs.unlink('Server/middlewares/invoices/invoice.pdf', (err) => {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log('File is deleted.');
                    }
                });
                console.log("invoice successfully sent");
            }) 
        })

    } catch (error) {
        console.log(error);      
    }
})

const scheduleBilling = async(userInfo) => {
    try {
        fetch(`http://localhost:3000/get-membership/${userInfo.membership}`, {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(response => response.json())
        .then(async(data) => {
            await agenda.start();
            await agenda.schedule(`in 30 seconds`, 'createBilling', {
                username: userInfo.name,
                userEmail: userInfo.email,
                userId: userInfo.gymId,
                membershipPlan: data.name,
                membershipFees: data.fees,
            })
            console.log("Invoice Successfully");
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    scheduleBilling
}