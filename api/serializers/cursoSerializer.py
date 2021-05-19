from rest_framework import serializers
from api.models import Curso


class CursoRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = (
            'nombre',
            'descripcion'
        )


class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = (
            'id',
            'nombre',
            'descripcion'
        )