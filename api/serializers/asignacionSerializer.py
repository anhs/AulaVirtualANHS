from rest_framework import serializers
from api.models import Asignacion

class AsiganacionRegisterSerializer(serializers.Serializer):
    ciclo_escolar = serializers.IntegerField()
    grado = serializers.IntegerField()
    seccion = serializers.IntegerField()
    curso = serializers.IntegerField()
    profesor = serializers.IntegerField()
    descripcion = serializers.CharField()

class AsignacionSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Asignacion
        fields = (
            'id',
            'ciclo_escolar',                     
            'grado',
            'seccion',
            'curso',
            'profesor',
            'imagen_portada',
            'descripcion'

        )
        depth = 2

class AsignacionReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignacion
        fields=(
            'id',
            'profesor',
            'curso',
            'grado'
        )
        depth = 2