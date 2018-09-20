from django.db import models
from django.contrib.postgres.fields import ArrayField


class RiskType(models.Model):
    name = models.CharField(max_length=120)


class RiskField(models.Model):
    TYPE_CHOICES = (
        ('text', 'Text'),
        ('enum', 'Enum'),
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
