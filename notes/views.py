from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from .models import Project, Note
from .serializers import ProjectModelSerializer, NoteModelSerializer, NoteModelWithUserSerializer, NoteModelSerializerList
from .filters import ProjectFilterSet, NoteFilterSet

class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class NoteLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class  = ProjectFilterSet

    def perform_create(self, serializer):
        print('*****************************************************************')
        print(self.request.data.get('users'))
        print('*****************************************************************')
        serializer.save(users=self.request.data.get('users'))

class NoteModelViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteModelSerializer
    filterset_class = NoteFilterSet

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = kwargs.pop('partial', True)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        instance.state = 'C'
        instance.save()
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer_context = {
            'request': request,
        }

        serializer_class = NoteModelSerializerList
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = serializer_class(page, many=True, context=serializer_context)
            return self.get_paginated_response(serializer.data)

        serializer = serializer_class(queryset, many=True, context=serializer_context)
        return Response(serializer.data)

class TodoModelViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteModelWithUserSerializer
    permission_classes = [permissions.IsAuthenticated]