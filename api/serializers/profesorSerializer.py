from rest_framework import serializers
from api.models import Profesor

class ProfesorRegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=20)
    profesion = serializers.IntegerField()

class ProfesorSerializer(serializers.ModelSerializer):        
    class Meta:
        model = Profesor
        fields = (
            'id',
            'profile',                     
            'profesion'
        )
        depth = 2