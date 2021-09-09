import graphene
from graphene_django import DjangoObjectType
from .models import User
from notes.models import Note, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'
        
class NoteType(DjangoObjectType):
    class Meta:
        model = Note
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class Query(graphene.ObjectType):
    all_authors = graphene.List(UserType)

    def resolve_all_authors(root, info):
        return User.objects.all()

    all_notes = graphene.List(NoteType)

    def resolve_all_notes(root, info):
        return Note.objects.all()
    
    all_projects = graphene.List(ProjectType)
    
    def resolve_all_projects(root, info):
        return Project.objects.all()

schema = graphene.Schema(query=Query)