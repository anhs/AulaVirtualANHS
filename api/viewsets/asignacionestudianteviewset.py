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
from django.db.models import Q

from api.models import Asignacion, Estudiante, Asignacion_estudiante, asignacion, estudiante, profile
from api.serializers import Asignacion_estudianteRegisterSerializer, Asignacion_estudianteSerializer,AsignacionSerializer


class Asignacion_estudianteViewset(viewsets.ModelViewSet):
    queryset = Asignacion_estudiante.objects.filter()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("asignacion","estudiante")
    search_fields = ("asignacion","estudiante")
    ordering_fields = ("asignacion","estudiante")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return Asignacion_estudianteSerializer
        else:
            return Asignacion_estudianteRegisterSerializer

        
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
            print("datos", data)
            serializer = Asignacion_estudianteRegisterSerializer(data=data)
            with transaction.atomic():
                if(serializer.is_valid()):
                    asignacion = Asignacion.objects.get(pk=data.get("asignacion"))
                    estudiante = Estudiante.objects.get(pk=data.get("estudiante"))
                    Asignacion_estudiante.objects.create(
                        asignacion = asignacion,
                        estudiante = estudiante
                        )
                    
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)    
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            data = request.data
            print("actualizar", data)
            serializer = Asignacion_estudianteRegisterSerializer(data=data)
            with transaction.atomic():
                if(serializer.is_valid()):
                    print("serializador valido")

                    asignacion_estudiate = Asignacion_estudiante.objects.get(pk=pk)

                    asignacion = Asignacion.objects.get(pk=data.get("asignacion"))
                    estudiante = Estudiante.objects.get(pk=data.get("estudiante"))

                    asignacion_estudiate.asignacion = asignacion
                    asignacion_estudiate.estudiante = estudiante
                    asignacion_estudiate.save()

                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def asignacionestu(self, request, *args, **kwargs):
        try:
            asignacion = request.query_params.get("asignacion")
            print(request.data)
            asigestudiante = Asignacion_estudiante.objects.filter(
                asignacion = asignacion
            )
            """print(asignacion)
            print(asigestudiante)"""
            page = self.paginate_queryset(asigestudiante) 
            if page is not None: 
                serializer = Asignacion_estudianteSerializer(page, many=True) 
                return self.get_paginated_response(serializer.data)
            serializer = Asignacion_estudianteSerializer(asigestudiante, many= True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def idestu(self, request, *args, **kwargs):
        user = request.user
        profile = user.profile_user
        estudiante = profile.estudiante_profile
        serializer = Asignacion_estudianteSerializer(estudiante)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["get"], detail=False)
    def Cursos_asignados_estudiante(self, request, *args, **kwargs):
        try:
            user = request.user
            profile = user.profile_user
            estudiante = profile.estudiante_profile
            asignaciones = estudiante.asignacionestudiante_estudiante.all()
            page = self.paginate_queryset(asignaciones) 
            if page is not None: 
                serializer = Asignacion_estudianteSerializer(page, many=True) 
                return self.get_paginated_response(serializer.data)
            serializer = Asignacion_estudianteSerializer(asignaciones, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)