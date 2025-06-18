from flask_mail import Message
from .mail_config import mail
import os


def send_email(address, token):
    try:
        subject = "Reset your password"
        if not isinstance(subject, str):
            raise ValueError("❌ Subject no es string")

        reset_url = f"{os.getenv('FRONTEND_URL')}/reset?token={token}"
        html_content = f'''
            <p>Hola 👋,</p>
            <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
            <a href="{reset_url}">{reset_url}</a>
        '''

        msg = Message(subject="Reset your password", recipients=[address])
        msg.html = html_content
        mail.send(msg)

        return {"success": True, "msg": "correo enviado exitosamente"}

    except Exception as e:
        print(f"❌ ERROR en send_email(): {e}")
        return {"success": False, "msg": f"error al enviar correo: {e}"}
