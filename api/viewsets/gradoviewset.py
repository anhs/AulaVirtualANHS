import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction

from api.models import Grado, Nivel
from api.serializers import GradoSerializer, GradoRegisterSerializer


class GradoViewset(viewsets.ModelViewSet):
    queryset = Grado.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nivel","nombre")
    search_fields = ("nivel","nombre")
    ordering_fields = ("nivel","nombre")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return GradoSerializer
        else:
            return GradoRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def create(self, request):
        try:
            data = request.data
            
            serializer = GradoRegisterSerializer(data=data)
            print(data)
            with transaction.atomic():
                if serializer.is_valid():
                    print("error")
                    nivel = Nivel.objects.get(pk=data.get("nivel"))
                    Grado.objects.create(
                        nivel = nivel,
                        nombre = data.get("nombre"),
                        descripcion = data.get("descripcion")
                    )               

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            data = request.data
            serializer = GradoRegisterSerializer(data=data)
            with transaction.atomic():
                if serializer.is_valid():

                    grado= Grado.objects.get(pk=pk)

                    nivel = Nivel.objects.get(pk=data.get("nivel"))

                    grado.nivel = nivel
                    grado.nombre = data.get("nombre")
                    grado.descripcion = data.get("descripcion")

                    grado.save()              

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)