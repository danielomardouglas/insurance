from rest_framework import serializers

from . import models


class RiskFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RiskField
        fields = ('id', 'name', 'type', 'options')
        read_only_fields = ('id',)
        extra_kwargs = {'options': {'required': False}}


class RiskTypeListSerializer(serializers.ModelSerializer):
    risk_fields = RiskFieldSerializer(many=True, required=False)

    class Meta:
        model = models.RiskType
        fields = ('id', 'name', 'risk_fields')
        read_only_fields = ('id', )

    def create(self, validated_data):
        risk_fields = validated_data.pop('risk_fields', [])
        risk_type = super(RiskTypeListSerializer, self).create(validated_data)
        for field in risk_fields:
            risk_type.risk_fields.create(**field)
        return risk_type
