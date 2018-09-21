from django.db import models
from django.contrib.postgres.fields import ArrayField


class RiskType(models.Model):
    name = models.CharField(max_length=120)

    class Meta:
        ordering = ('-id', )
        verbose_name = 'Risk Type'
        verbose_name_plural = 'Risk Types'

    def __str__(self):
        return self.name


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

    class Meta:
        ordering = ('id', )
        verbose_name = 'Risk Field'
        verbose_name_plural = 'Risk Fields'

    def __str__(self):
        return f"{self.name} {self.type}"
