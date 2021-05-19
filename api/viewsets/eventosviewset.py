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

from api.models import Ciclo_escolar, Eventos
from api.serializers import EventosSerializer, EventosRegisterSerializer


class EventosViewset(viewsets.ModelViewSet):
    queryset = Eventos.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nivel","nombre")
    search_fields = ("nivel","nombre")
    ordering_fields = ("nivel","nombre")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EventosSerializer
        else:
            return EventosRegisterSerializer

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
            serializer = EventosRegisterSerializer(data = data)
            with transaction.atomic():
                if serializer.is_valid():

                    ciclo_escolar = Ciclo_escolar.objects.get(pk=data.get("ciclo_escolar"))
                    Grado.objects.create(
                        ciclo_escolar = ciclo_escolar,
                        titulo = data.get("titulo"),
                        descripcion = data.get("descripcion"),
                        fecha = data.get("fecha"),
                        hora = data.get("hora")
                        
                    )               

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            data = request.data
            serializer = EventosRegisterSerializer(data = data)
            with transaction.atomic():
                if serializer.is_valid():

                    eventos= Eventos.objects.get(pk=pk)
                    ciclo_escolar = Ciclo_escolar.objects.get(pk=data.get("ciclo_escolar"))
                    
                    eventos.ciclo_escolar = ciclo_escolar
                    eventos.titulo = data.get("titulo")
                    eventos.descripcion = data.get("descripcion")
                    eventos.fecha = data.get("fecha")
                    eventos.hora = data.get("hora")
                    eventos.save()              

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)