from flask_wtf import FlaskForm
from wtforms import PasswordField, validators, StringField, SelectField, FormField
from flask_mongoengine.wtf import model_form
from klabban.web import models

BaseLoginForm = model_form(
    models.User,
    FlaskForm,
    field_args={"username": {"label": "Username"}},
    only=["username", "password"],
)

BaseCreateUserForm = model_form(
    models.User,
    FlaskForm,
    field_args={
        "username": {"label": "ชื่อผู้ใช้งาน"},
        "password": {"label": "รหัสผ่านผู้ใช้งาน"},
        "email": {"label": "Email"},
        "first_name": {"label": "ชื่อ"},
        "last_name": {"label": "นามสกุล"},
    },
    only=[
        "username",
        "password",
        "email",
        "first_name",
        "last_name",
    ],
)


class LoginForm(BaseLoginForm):
    password = PasswordField(
        "Password", validators=[validators.InputRequired(), validators.Length(min=6)]
    )


class SetupPasswordForm(FlaskForm):
    password = PasswordField("รหัสผ่านใหม่", validators=[validators.InputRequired()])
    confirm_password = PasswordField(
        "ยืนยันรหัสผ่านใหม่",
        validators=[
            validators.InputRequired(),
            validators.Length(min=6),
            validators.EqualTo("password", message="รหัสผ่านไม่ตรงกัน"),
        ],
    )
