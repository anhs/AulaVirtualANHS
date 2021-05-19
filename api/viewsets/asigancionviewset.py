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
from django.db.models import Q, Count

from api.models import Asignacion, Ciclo_escolar, Grado, Seccion, Curso, Profesor
from api.serializers import AsignacionSerializer, AsiganacionRegisterSerializer, AsignacionReadSerializer


class AsignacionViewset(viewsets.ModelViewSet):
    queryset = Asignacion.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("ciclo_escolar","profesor")
    search_fields = ("ciclo_escolar","profesor")
    ordering_fields = ("ciclo_escolar","profesor")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionSerializer
        else:
            return AsiganacionRegisterSerializer

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
            serializer = AsiganacionRegisterSerializer(data=data)
            with transaction.atomic():
                if(serializer.is_valid()):

                    ciclo_escolar = Ciclo_escolar.objects.get(pk=data.get("ciclo_escolar"))
                    grado = Grado.objects.get(pk=data.get("grado"))
                    seccion = Seccion.objects.get(pk=data.get("seccion"))
                    curso = Curso.objects.get(pk=data.get("curso"))
                    profesor = Profesor.objects.get(pk=data.get("profesor"))

                    Asignacion.objects.create(
                        ciclo_escolar = ciclo_escolar,
                        grado = grado,
                        seccion = seccion,
                        curso = curso,
                        profesor = profesor,
                        descripcion = data.get("descripcion")
                    )
                    
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    print("valido",serializer.erros)
                    return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)    
        except Exception as e:
            print("error",str(e))
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            data = request.data
            print("actualizar", data)
            serializer = AsiganacionRegisterSerializer(data=data)
            with transaction.atomic():
                if(serializer.is_valid()):

                    asignacion= Asignacion.objects.get(pk=pk)

                    ciclo_escolar = Ciclo_escolar.objects.get(pk=data.get("ciclo_escolar"))
                    grado = Grado.objects.get(pk=data.get("grado"))
                    seccion = Seccion.objects.get(pk=data.get("seccion"))
                    curso = Curso.objects.get(pk=data.get("curso"))
                    profesor = Profesor.objects.get(pk=data.get("profesor"))
                    asignacion.ciclo_escolar = ciclo_escolar
                    asignacion.grado = grado
                    asignacion.seccion = seccion
                    asignacion.curso = curso
                    asignacion.profesor = profesor
                    asignacion.descripcion = data.get("descripcion")
                    asignacion.save()


                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def Cursos_asignados_docentes(self, request, *args, **kwargs):
        try:
            user = request.user
            profile = user.profile_user
            profesor = profile.profesor_profile
            asignaciones = profesor.asignacion_profesor.all()
            page = self.paginate_queryset(asignaciones) 
            if page is not None: 
                serializer = AsignacionSerializer(page, many=True) 
                return self.get_paginated_response(serializer.data)
            serializer = AsignacionSerializer(asignaciones, many= True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
                    




    
    