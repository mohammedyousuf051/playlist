# Generated by Django 3.2.12 on 2022-02-09 20:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_playlist_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='playlist',
            name='description',
        ),
    ]
