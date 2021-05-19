# Generated by Django 2.2.13 on 2021-05-08 00:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='materiales_de_clase',
            name='archivo',
            field=models.FileField(blank=True, null=True, upload_to='Material_Didactico'),
        ),
        migrations.AlterField(
            model_name='profesor',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profesor_profile', to='api.Profile'),
        ),
    ]