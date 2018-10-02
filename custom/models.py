from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

import boto3
import uuid


class RiskType(models.Model):
    name = models.CharField(max_length=120)
    table_name = models.UUIDField(default=uuid.uuid4, unique=True)

    class Meta:
        ordering = ('-id', )
        verbose_name = 'Risk Type'
        verbose_name_plural = 'Risk Types'

    def __str__(self):
        return self.name

    def get_dynamodb_table(self):
        dynamodb = boto3.resource(
            'dynamodb',
            endpoint_url=settings.DYNAMODB_ENDPOINT,
            region_name=settings.DYNAMODB_REGION,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )
        return dynamodb.Table(str(self.table_name))


class RiskField(models.Model):
    TYPE_CHOICES = (
        ('text', 'Text'),
        ('select', 'Select'),
        ('date', 'Date'),
        ('number', 'Number'),
        ('currency', 'Currency'),
        ('option', 'Option'),
        ('color', 'Color'),
        ('bool', 'Boolean'),
    )

    name = models.CharField(max_length=120)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES,
                            default='text')
    options = ArrayField(models.CharField(max_length=50), default=list)
    risk_type = models.ForeignKey(RiskType, related_name='risk_fields',
                                  on_delete=models.CASCADE)

    class Meta:
        ordering = ('id', )
        verbose_name = 'Risk Field'
        verbose_name_plural = 'Risk Fields'

    def __str__(self):
        return f"{self.name} {self.type}"


@receiver(post_save, sender=RiskType)
def create_dynamodb_table(instance, **kwargs):
    if kwargs.get('created', False):
        dynamodb = boto3.resource(
            'dynamodb',
            endpoint_url=settings.DYNAMODB_ENDPOINT,
            region_name=settings.DYNAMODB_REGION,
        )
        dynamodb.create_table(
            TableName=str(instance.table_name),
            KeySchema=[
                {
                    'AttributeName': 'uuid',
                    'KeyType': 'HASH',
                },
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'uuid',
                    'AttributeType': 'S'
                },
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 10,
                'WriteCapacityUnits': 10,
            }
        )
