from flask_mail import Message
from api.mail.mail_config import mail
from flask import jsonify
import os


def send_email(address, token):
    try:
        msg = Message("Reset your password",  # Asunto del correo
                      recipients=[address])  # Correo del destinatario

        # Definir cuerpo del correo, utilizamos la variable de entorno para PROD os.getenv("BACKEND_URL"), en DEV ponemos la del FRONT si estas usando codespace.
        msg.html = f'''
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset the password for your account. If you made this request, you can set a new password by clicking the button below:</p>
    <p>
      <a href="{os.getenv("FRONTEND_URL")}/reset?token={token}" 
         style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
         Reset Password
      </a>
    </p>
    <p>If you did not request a password reset, you can safely ignore this email. Your current password will remain unchanged.</p>
    <p>Thank you,<br>The PlayerLink Support Team</p>
  </div>
'''
        # Enviar el correo
        mail.send(msg)
        return {'success': True, 'msg': 'correo enviado exitosamente'}
    except Exception as e:
        return {'success': False, 'msg': 'error al enviar correo: ' + str(e)}
