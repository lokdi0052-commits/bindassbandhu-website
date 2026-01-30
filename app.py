from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
import resend

load_dotenv()

app = Flask(__name__)

# Configure Resend
resend.api_key = os.getenv('RESEND_API_KEY')
RECEIVER_EMAIL = os.getenv('RECEIVER_EMAIL', 'moawalling75@gmail.com')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        if not resend.api_key:
            return jsonify({
                'success': False, 
                'message': 'Email service not configured.'
            }), 500
        
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        if not all([name, email, message]):
            return jsonify({'success': False, 'message': 'All fields are required'}), 400
        
        # Send email via Resend
        params = {
            "from": "BindassBandhu <onboarding@resend.dev>",  # Use this for testing
            "to": [RECEIVER_EMAIL],
            "subject": f"New Contact Form Message from {name}",
            "html": f"""
                <h2>New message from BindassBandhu Contact Form</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Message:</strong></p>
                <p>{message}</p>
            """
        }
        
        response = resend.Emails.send(params)
        
        return jsonify({'success': True, 'message': 'Message sent successfully!'})
    
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({
            'success': False, 
            'message': 'Failed to send message. Please try again later.'
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5555))
    app.run(debug=False, host='0.0.0.0', port=port)

