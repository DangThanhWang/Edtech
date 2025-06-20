// server/src/services/emailService.js (Simplified Working Version)
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = this.createTransporter();
  }

  createTransporter() {
    // Use simple Gmail service configuration (same as your working code)
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendVerificationEmail(user, verificationToken) {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'dangwang1407@gmail.com',
      to: user.email,
      subject: '✅ Xác thực email tài khoản StudyCards',
      html: this.getVerificationEmailTemplate(user, verificationUrl),
      text: `
Xin chào ${user.firstName}!

Cảm ơn bạn đã đăng ký tài khoản StudyCards!

Để hoàn tất quá trình đăng ký, vui lòng xác thực email bằng cách click vào link sau:
${verificationUrl}

Link này sẽ hết hạn sau 24 giờ.

Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email này.

Trân trọng,
Đội ngũ StudyCards
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Verification email sent:', info.messageId);
      
      return {
        success: true,
        messageId: info.messageId
      };
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw new Error('Không thể gửi email xác thực');
    }
  }

  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'dangwang1407@gmail.com',
      to: user.email,
      subject: '🔐 Đặt lại mật khẩu StudyCards',
      html: this.getPasswordResetEmailTemplate(user, resetUrl),
      text: `
Xin chào ${user.firstName},

Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản StudyCards.

Để đặt lại mật khẩu, vui lòng click vào link sau:
${resetUrl}

Link này sẽ hết hạn sau 1 giờ.

Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.

Trân trọng,
Đội ngũ StudyCards
      `
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Password reset email sent:', info.messageId);
      
      return {
        success: true,
        messageId: info.messageId
      };
    } catch (error) {
      console.error('❌ Password reset email failed:', error);
      throw new Error('Không thể gửi email đặt lại mật khẩu');
    }
  }

  getVerificationEmailTemplate(user, verificationUrl) {
    return `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác thực email - StudyCards</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #0118D8 0%, #1B56FD 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .button { display: inline-block; background: linear-gradient(135deg, #0118D8 0%, #1B56FD 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { background: #f8f8f8; padding: 20px; text-align: center; font-size: 14px; color: #666; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📚 StudyCards</h1>
          </div>
          
          <div class="content">
            <h2>Xin chào ${user.firstName}! 👋</h2>
            
            <p>Cảm ơn bạn đã đăng ký tài khoản StudyCards! Để hoàn tất quá trình đăng ký, vui lòng xác thực email của bạn.</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">✅ Xác thực Email</a>
            </div>
            
            <p>Hoặc copy link sau vào trình duyệt:</p>
            <p style="word-break: break-all; background: #f8f8f8; padding: 10px; border-radius: 5px;">
              <a href="${verificationUrl}">${verificationUrl}</a>
            </p>
            
            <div class="warning">
              <p><strong>⚠️ Lưu ý:</strong> Link này sẽ hết hạn sau 24 giờ. Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email.</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Email từ StudyCards - Nền tảng học tập thông minh</p>
            <p>Nếu có thắc mắc, liên hệ: support@studycards.com</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getPasswordResetEmailTemplate(user, resetUrl) {
    return `
      <!DOCTYPE html>
      <html lang="vi">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Đặt lại mật khẩu - StudyCards</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .button { display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { background: #f8f8f8; padding: 20px; text-align: center; font-size: 14px; color: #666; }
          .warning { background: #fee2e2; border: 1px solid #fecaca; border-radius: 5px; padding: 15px; margin: 20px 0; color: #dc2626; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Đặt lại mật khẩu</h1>
          </div>
          
          <div class="content">
            <h2>Xin chào ${user.firstName},</h2>
            
            <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản StudyCards. Click nút bên dưới để tạo mật khẩu mới.</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">🔑 Đặt lại mật khẩu</a>
            </div>
            
            <p>Hoặc copy link sau vào trình duyệt:</p>
            <p style="word-break: break-all; background: #f8f8f8; padding: 10px; border-radius: 5px;">
              <a href="${resetUrl}">${resetUrl}</a>
            </p>
            
            <div class="warning">
              <p><strong>🚨 Bảo mật:</strong> Link này sẽ hết hạn sau 1 giờ. Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Email từ StudyCards - Nền tảng học tập thông minh</p>
            <p>Bảo mật: support@studycards.com</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();
