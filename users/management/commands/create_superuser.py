from users.models import User

def create_superuser(username='admin', password='admin', email='admin@admin.admin', first_name='Admin', last_name='Django'):
    user = User.objects.create_superuser(username=username,
                                         email=email,
                                         first_name=first_name,
                                         last_name=last_name,
                                         password=password)
    return user