from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user
import datetime
import uuid

from klabban.web import forms

module = Blueprint("users", __name__, url_prefix="/users")


@module.route("", methods=["GET"])
@login_required
def index():
    return render_template("/users/index.html")
