from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Profesion


class ProfesionRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesion
        fields = (
            'profesion_name',
        )


class ProfesionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesion
        fields = (
            'id',
            'profesion_name',
            'adjunto'
        )