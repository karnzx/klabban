from flask_wtf import FlaskForm
from wtforms import PasswordField, validators, StringField, SelectField, SelectMultipleField


class LoginForm(FlaskForm):
    username = StringField(
        "Username",
        validators=[validators.InputRequired(
        ), validators.Length(min=3, max=64)]
    )
    password = PasswordField(
        "Password", validators=[validators.InputRequired(), validators.Length(min=6)]
    )


class CreateAccountForm(FlaskForm):
    first_name = StringField(
        "ชื่อจริง",
        [validators.InputRequired()],
        description="ชื่อจริง",
    )
    last_name = StringField(
        "นามสกุล",
        [validators.InputRequired()],
        description="นามสกุล",
    )
    email = StringField(
        "อีเมล",
        [validators.InputRequired(), validators.Email()],
        description="ที่อยู่อีเมล",
    )
    phone_number = StringField(
        "เบอร์โทร",
        [validators.Optional(), validators.Length(max=20)],
        description="หมายเลขโทรศัพท์",
    )
    password = PasswordField(
        "รหัสผ่าน",
        [validators.InputRequired(), validators.Length(min=6)],
        description="ระบุรหัสผ่าน",
        render_kw={"autocomplete": "new-password"},
    )
    confirm_password = PasswordField(
        "ยืนยันรหัสผ่าน",
        [validators.InputRequired(), validators.EqualTo(
            'password', message='รหัสผ่านไม่ตรงกัน')],
        description="ยืนยันรหัสผ่าน",
        render_kw={"autocomplete": "new-password"},
    )


class SetupPasswordForm(FlaskForm):
    password = PasswordField("รหัสผ่านใหม่", validators=[
                             validators.InputRequired()])
    confirm_password = PasswordField(
        "ยืนยันรหัสผ่านใหม่",
        validators=[
            validators.InputRequired(),
            validators.Length(min=6),
            validators.EqualTo("password", message="รหัสผ่านไม่ตรงกัน"),
        ],
    )
