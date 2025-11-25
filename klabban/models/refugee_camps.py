import datetime
import mongoengine as me


class RefugeeCamp(me.Document):
    meta = {"collection": "refugee_camps", "indexes": ["name", "status", "created_by"]}

    id = me.ObjectIdField(primary_key=True)
    name = me.StringField(required=True)
    location_url = me.URLField()
    contact_info = me.StringField()
    line_id = me.StringField()

    status = me.StringField(choices=("deactive", "active"), default="active")

    created_by = me.ReferenceField("User", )
    updated_by = me.ReferenceField("User", )
    created_date = me.DateTimeField(default=datetime.datetime.now)
    updated_date = me.DateTimeField(default=datetime.datetime.now)
