from rest_framework import serializers
from .models import Project, Note
from users.models import User
from users.serializers import UserModelInNoteAppSerializer

class ProjectModelSerializer(serializers.ModelSerializer):
    users = UserModelInNoteAppSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = '__all__'

class NoteModelSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Note
        fields = ['project', 'text', 'author']

class NoteModelSerializerList(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    project = ProjectModelSerializer()
    class Meta:
        model = Note
        fields = '__all__'

class NoteModelWithUserSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username', read_only=True)
    project = ProjectModelSerializer()
    class Meta:
        model = Note
        fields = '__all__'