from flask import Flask, request, jsonify, send_from_directory, send_file
import smtplib
from email.mime.text import MIMEText
import os

app = Flask(__name__)

# --- 静的ファイル配信 ---
@app.route('/assets/<path:filename>')
def assets(filename):
    return send_from_directory('frontend/dist/assets', filename)
    

@app.route('/image/<path:filename>')
def image(filename):
    return send_from_directory('frontend/dist/image', filename)

# --- index.html ---
@app.route('/')
def index():
    return send_file('frontend/dist/index.html')

# --- メール通知API ---
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
