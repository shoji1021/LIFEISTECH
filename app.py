from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
import os


app = Flask(__name__)
CORS(app)  # フロントからのクロスオリジン通信許可

@app.route('/notify', methods=['POST'])
def notify():
    data = request.json
    gmail = data.get('gmail')
    app_password = data.get('app_password')
    to_address = data.get('to', gmail)

    if not gmail or not app_password:
        return jsonify({'error': 'メールアドレスとアプリパスワードが必要です'}), 400

    try:
        msg = MIMEText('動作を検出しました')
        msg['Subject'] = '動作検出通知'
        msg['From'] = gmail
        msg['To'] = to_address

        with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
            smtp.starttls()
            smtp.login(gmail, app_password)
            smtp.send_message(msg)

        return jsonify({'status': 'ok'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
