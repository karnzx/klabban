from flask_wtf import FlaskForm
from wtforms import (
    PasswordField,
    validators,
    StringField,
    SelectField,
    FormField,
    SelectMultipleField,
    TextAreaField,
    BooleanField,
)
from flask_mongoengine.wtf import model_form
from klabban.web import models


class UserForm(FlaskForm):
    username = StringField(
        "ชื่อผู้ใช้งาน",
        [validators.InputRequired(), validators.Length(min=3, max=64)],
        description="ระบุชื่อผู้ใช้",
        render_kw={"autocomplete": "new-password"},
    )
    password = PasswordField(
        "รหัสผ่าน",
        description="ระบุรหัสผ่าน",
        render_kw={"autocomplete": "new-password"},
    )
    display_name = StringField(
        "ชื่อที่แสดง",
        [validators.InputRequired()],
        description="ชื่อใช้งานที่แสดงในระบบ",
    )

    selected_roles = StringField()

    choose_denomination = SelectMultipleField(
        "เลือกนิกาย",
        [validators.Optional()],
        choices=[],
    )
    choose_zone = SelectMultipleField(
        "เลือกเขต",
        [validators.Optional()],
        choices=[],
    )
    choose_provincial = SelectMultipleField(
        "เลือกจังหวัด",
        [validators.Optional()],
        choices=[],
    )
    choose_district = SelectMultipleField(
        "เลือกอำเภอ/เขต",
        [validators.Optional()],
        choices=[],
    )
    choose_sub_district = SelectMultipleField(
        "เลือกตำบล/แขวง",
        [validators.Optional()],
        choices=[],
    )
    choose_temple = SelectMultipleField(
        "เลือกวัด",
        [validators.Optional()],
        choices=[],
    )


class EditUserRolesForm(FlaskForm):
    selected_roles = StringField()
    choose_denomination = SelectMultipleField(
        "เลือกนิกาย", [validators.Optional()], choices=[]
    )
    search_denomination = SelectField(
        "ค้นหานิกาย", validators=[validators.Optional()], validate_choice=False
    )
    choose_zone = SelectMultipleField("เลือกเขต", [validators.Optional()], choices=[])
    search_zone = SelectField(
        "ค้นหาเขต", validators=[validators.Optional()], validate_choice=False
    )
    choose_provincial = SelectMultipleField(
        "เลือกจังหวัด", [validators.Optional()], choices=[]
    )
    search_provincial = SelectField(
        "ค้นหาจังหวัด", validators=[validators.Optional()], validate_choice=False
    )
    choose_district = SelectMultipleField(
        "เลือกอำเภอ/เขต", [validators.Optional()], choices=[]
    )
    search_district = SelectField(
        "ค้นหาอำเภอ/เขต", validators=[validators.Optional()], validate_choice=False
    )
    choose_sub_district = SelectMultipleField(
        "เลือกตำบล/แขวง", [validators.Optional()], choices=[]
    )
    search_sub_district = SelectField(
        "ค้นหาตำบล/แขวง", validators=[validators.Optional()], validate_choice=False
    )
    choose_temple = SelectMultipleField("เลือกวัด", [validators.Optional()], choices=[])


class SearchUserForm(FlaskForm):
    search = StringField(
        "ค้นหาผู้ใช้งาน",
        [validators.Optional(), validators.Length(min=0, max=64)],
        description="ค้นหาผู้ใช้งานโดยชื่อผู้ใช้งาน, ชื่อที่แสดง, บทบาท, สถานะ",
    )
    denomination = SelectField(
        "นิกาย", validators=[validators.Optional()], validate_choice=False
    )
