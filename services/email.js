const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
); // Replace with your actual SendGrid API key

module.exports = {
  async sendVerificationEmail(email, otpCode, verificationToken) {
    const msg = {
      to: email,
      from: "info@panell.io",
      subject: "Email and OTP Verification",
      text: `Your OTP code is: ${otpCode}. Please also verify your email by clicking the following link: 
                   http://localhost:3000/auth/verify?token=${verificationToken}`,
      html: `<strong>Your OTP code is: ${otpCode}</strong><br>
                   Please also verify your email by clicking the link below:<br>
                   <a href="http://localhost:3000/auth/verify?token=${verificationToken}">Verify Email</a>`,
    };

    // Send email
    await sgMail
      .send(msg)
      .then(() => {
        return {
          status: true,
          type: "success",
        };
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
