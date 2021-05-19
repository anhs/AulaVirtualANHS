from rest_framework import serializers
from api.models import Ciclo_escolar

class Ciclo_escolarRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciclo_escolar
        fields = (
            'anio',
        )


class Ciclo_escolarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciclo_escolar
        fields = (
            'id',
            'anio',
        )