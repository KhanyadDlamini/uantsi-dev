require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to access this server

// Email sending route
app.post("/send-email", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to Unatsi Academy!",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0,0,0,0.1); text-align: start;">
                    <h2 style="color: #007bff;">Welcome to Unatsi Academy!</h2>
                    
                    <p>Dear Subscriber,</p>

                    <p>Thank you for subscribing to <strong>Unatsi Academy</strong> — we’re thrilled to have you on this journey!</p>

                    <p>Unatsi Academy is more than just a primary school. We’re a community dedicated to nurturing curious young minds, empowering learners with 21st-century skills, and building a strong foundation rooted in creativity, critical thinking, and compassion.</p>

                    <p>By joining our mailing list, you'll be the first to know about:</p>
                    <ul>
                        <li>📚 <strong>Admissions updates</strong> and open days</li>
                        <li>🧠 <strong>Innovative learning programs</strong> and tech-integrated classrooms</li>
                        <li>🏫 <strong>Campus developments</strong> and student life</li>
                        <li>🤝 <strong>Opportunities</strong> to engage with our educators and leadership team</li>
                    </ul>

                    <p>We know that choosing the right school is a big decision, and we’re here to support you every step of the way.</p>

                    <p>If you have any questions or would like to schedule a visit, feel free to <a href="mailto:info@unatsiacademy.com" style="color: #007bff; text-decoration: none;">contact us</a>.</p>

                    <p style="font-weight: bold;">Welcome to the Unatsi family — where learning is a journey of wonder!</p>

                    <p style="font-style: italic;">Warm regards,</p>
                    <p><strong>The Unatsi Academy Team</strong></p>

                    <div style="margin-top: 20px;">
                        <img 
                            src="https://i.ibb.co/wZTSvm2b/324927416-1797086837334568-8246797397037440777-n-removebg-preview.png" 
                            alt="Eswatini Coat of Arms"
                            style="width: 130px; height: auto; border-radius: 5px; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);"
                        />
                    </div>
                </div>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
