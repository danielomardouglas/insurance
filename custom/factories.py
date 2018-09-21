from factory import django, PostGenerationMethodCall, SubFactory
from factory.django import DjangoModelFactory

from django.contrib.auth.models import User

from . import models


class UserFactory(django.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('username', )

    first_name = 'Rexhep'
    last_name = 'Berlajolli'
    username = 'rexhepberlajolli'
    email = 'rexhepberlajolli@gmail.com'
    is_superuser = True
    is_staff = True
    password = PostGenerationMethodCall('set_password', 'TestP@ssw0rd')


class RiskTypeFactory(DjangoModelFactory):
    class Meta:
        model = models.RiskType

    name = 'Car Risk Type'


class RiskFieldFactory(DjangoModelFactory):
    class Meta:
        model = models.RiskField

    name = 'Gear'
    type = 'option'
    options = ['manual', 'automatic']
    risk_type = SubFactory(RiskTypeFactory)
