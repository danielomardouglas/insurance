import factory
from factory.django import DjangoModelFactory

from django.contrib.auth.models import User


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('username', )

    first_name = 'Rexhep'
    last_name = 'Berlajolli'
    username = 'rexhepberlajolli'
    email = 'rexhepberlajolli@gmail.com'
    is_superuser = True
    is_staff = True
    password = factory.PostGenerationMethodCall('set_password', 'TestP@ssw0rd')
