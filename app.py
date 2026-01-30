from flask import Flask, render_template, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import ssl

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Email configuration from environment variables
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = os.getenv('SENDER_EMAIL')
SENDER_PASSWORD = os.getenv('SENDER_PASSWORD')
RECEIVER_EMAIL = os.getenv('RECEIVER_EMAIL', SENDER_EMAIL)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        # Check if email credentials are configured
        if not SENDER_EMAIL or not SENDER_PASSWORD:
            return jsonify({
                'success': False, 
                'message': 'Email service not configured. Please contact administrator.'
            }), 500
        
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # Validate inputs
        if not all([name, email, message]):
            return jsonify({'success': False, 'message': 'All fields are required'}), 400
        
        # Create email message
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Subject'] = f'New Contact Form Message from {name}'
        
        # Email body
        body = f"""
New message from BindassBandhu Contact Form:

Name: {name}
Email: {email}

Message:
{message}

---
This message was sent from the BindassBandhu website contact form.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Create a secure SSL context
        context = ssl.create_default_context()
        
        # Send email with better error handling
        try:
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10) as server:
                server.ehlo()
                server.starttls(context=context)
                server.ehlo()
                server.login(SENDER_EMAIL, SENDER_PASSWORD)
                server.send_message(msg)
            
            return jsonify({'success': True, 'message': 'Message sent successfully!'})
        
        except smtplib.SMTPAuthenticationError:
            print("SMTP Authentication failed")
            return jsonify({
                'success': False, 
                'message': 'Email authentication failed. Please contact administrator.'
            }), 500
        except smtplib.SMTPException as smtp_error:
            print(f"SMTP error: {str(smtp_error)}")
            return jsonify({
                'success': False, 
                'message': 'Failed to send email. Please try again later.'
            }), 500
    
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({
            'success': False, 
            'message': 'An unexpected error occurred. Please try again later.'
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5555))
    app.run(debug=False, host='0.0.0.0', port=port)