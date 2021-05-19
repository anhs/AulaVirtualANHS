from rest_framework import serializers
from api.models import Seccion

class SeccionRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seccion
        fields = (
            'nombre',
        )


class SeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seccion
        fields = (
            'id',
            'nombre',
        )