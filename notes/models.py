from django.db import models
from users.models import User

class Project(models.Model):
    name = models.CharField(max_length=128, unique=True)
    repository_url = models.URLField(blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name

class Note(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)