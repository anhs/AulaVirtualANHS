from django.db.models.base import Model
from rest_framework import serializers
from api.models import Asignacion_estudiante

class Asignacion_estudianteRegisterSerializer(serializers.Serializer):
    asignacion = serializers.IntegerField()
    estudiante = serializers.IntegerField()

class Asignacion_estudianteSerializer(serializers.ModelSerializer): 

    class Meta:
        model = Asignacion_estudiante
        fields = (
            'id',
            'asignacion',
            'asignacion_id',
            'estudiante',

        )
        depth = 3

