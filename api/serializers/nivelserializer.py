from rest_framework import serializers
from api.models import Nivel


class NivelRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivel
        fields = (
            'nombre',
            'descripcion'
        )


class NivelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivel
        fields = (
            'id',
            'nombre',
            'descripcion'
        )