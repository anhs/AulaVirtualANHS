from rest_framework import serializers
from api.models import Estudiante

class EstudianteRegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=20)
    carnet = serializers.CharField(max_length=25)
    contacto = serializers.CharField(max_length=100)
    direccion_contacto = serializers.CharField(max_length=255)
    telefono_contacto = serializers.CharField(max_length=10)


class EstudianteReadSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Estudiante
        fields = (
            'id',
            'profile',
            'carnet',
            'contacto',
            'direccion_contacto',
            'telefono_contacto'                     
        )
        depth = 2